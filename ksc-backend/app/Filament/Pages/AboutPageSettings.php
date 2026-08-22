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

class AboutPageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    protected static ?string $navigationGroup = 'About Page';
    protected static ?string $title = 'About Content & Messages';

    protected static string $view = 'filament.pages.about-page-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $about = PageContent::where('page_slug', 'about')->where('section_key', 'about_page')->first();
        $founder = PageContent::where('page_slug', 'founder')->where('section_key', 'message')->first();
        $chairman = PageContent::where('page_slug', 'chairman')->where('section_key', 'message')->first();

        $formData = [
            'about_page' => $about ? $about->content : [],
            'founder_message' => $founder ? $founder->content : [],
            'chairman_message' => $chairman ? $chairman->content : [],
        ];
        $this->form->fill($formData);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('About Content')
                    ->schema([
                        TextInput::make('about_page.establishedYear')->label('Established Year'),
                        Textarea::make('about_page.intro')->label('Introduction')->columnSpanFull(),
                        Repeater::make('about_page.body')->label('Detailed Body (Paragraphs)')
                            ->simple(Textarea::make('body')->required())->columnSpanFull(),
                        TagsInput::make('about_page.membership')->label('Memberships')->columnSpanFull(),
                    ])->columns(2),

                Section::make('Founder Message')
                    ->schema([
                        TextInput::make('founder_message.name')->label('Name')->required(),
                        TextInput::make('founder_message.role')->label('Role')->required(),
                        TextInput::make('founder_message.image')->label('Image Path'),
                        Textarea::make('founder_message.message')->label('Message')->columnSpanFull()->required(),
                    ])->columns(2),

                Section::make('Chairman Message')
                    ->schema([
                        TextInput::make('chairman_message.name')->label('Name')->required(),
                        TextInput::make('chairman_message.role')->label('Role')->required(),
                        TextInput::make('chairman_message.image')->label('Image Path'),
                        Textarea::make('chairman_message.message')->label('Message')->columnSpanFull()->required(),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        if (isset($data['about_page'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'about', 'section_key' => 'about_page'],
                ['content' => $data['about_page']]
            );
        }

        if (isset($data['founder_message'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'founder', 'section_key' => 'message'],
                ['content' => $data['founder_message']]
            );
        }

        if (isset($data['chairman_message'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'chairman', 'section_key' => 'message'],
                ['content' => $data['chairman_message']]
            );
        }

        Notification::make()
            ->title('About page settings saved successfully.')
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
