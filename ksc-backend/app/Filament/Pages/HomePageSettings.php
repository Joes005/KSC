<?php

namespace App\Filament\Pages;

use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Pages\Page;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Notifications\Notification;
use App\Models\PageContent;
use Filament\Actions\Action;

class HomePageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationGroup = 'Home Page';
    protected static ?string $title = 'Home Page Sections';

    protected static string $view = 'filament.pages.home-page-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $sections = PageContent::where('page_slug', 'home')->get();
        $formData = [];
        foreach ($sections as $section) {
            $formData[$section->section_key] = $section->content;
        }
        $this->form->fill($formData);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Hero Section')
                    ->schema([
                        TextInput::make('hero.headline')->label('Headline')->required(),
                        TextInput::make('hero.subHeadline')->label('Sub-Headline')->required(),
                        Textarea::make('hero.description')->label('Description')->columnSpanFull(),
                        Repeater::make('hero.ctas')->label('Call to Action Buttons')
                            ->schema([
                                TextInput::make('label')->required(),
                                TextInput::make('to')->label('URL / Path')->required(),
                                \Filament\Forms\Components\Toggle::make('primary')->label('Is Primary Button?'),
                            ])->columns(3)->columnSpanFull(),
                    ])->columns(2),

                Section::make('Why Distance Education')
                    ->schema([
                        Repeater::make('why_distance')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('description')->required(),
                            ])->columns(2)
                    ]),

                Section::make('About Snapshot')
                    ->schema([
                        Repeater::make('about_snapshot.text')->label('Short Descriptions (Paragraphs)')
                            ->simple(Textarea::make('text')->required())->columnSpanFull(),
                        TextInput::make('about_snapshot.readMoreLink')->label('Read More Link'),
                        TextInput::make('about_snapshot.establishedYear')->label('Established Year'),
                        Repeater::make('about_snapshot.body')->label('Detailed Body (Paragraphs)')
                            ->simple(Textarea::make('body')->required())->columnSpanFull(),
                        TagsInput::make('about_snapshot.membership')->label('Memberships')->columnSpanFull(),
                    ])->columns(2),

                Section::make('Vision, Mission & Values')
                    ->schema([
                        Textarea::make('vision_mission.vision')->label('Vision Statement')->columnSpanFull(),
                        Repeater::make('vision_mission.mission')->label('Mission Statements')
                            ->simple(TextInput::make('mission')->required())->columnSpanFull(),
                        Repeater::make('vision_mission.values')->label('Core Values')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('description')->required(),
                            ])->columns(2)->columnSpanFull()
                    ]),

                Section::make('Admission Steps')
                    ->schema([
                        Repeater::make('admission_steps')
                            ->schema([
                                TextInput::make('step')->label('Step Number (e.g., 01)')->required(),
                                TextInput::make('title')->required(),
                                Textarea::make('description')->required()->columnSpanFull(),
                            ])->columns(2)
                    ])
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        foreach ($data as $sectionKey => $content) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => $sectionKey],
                ['content' => $content]
            );
        }

        Notification::make()
            ->title('Home page settings saved successfully.')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label(__('filament-panels::resources/pages/edit-record.form.actions.save.label'))
                ->submit('submit'),
        ];
    }
}
