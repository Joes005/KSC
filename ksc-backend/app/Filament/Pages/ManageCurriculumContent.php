<?php

namespace App\Filament\Pages;

use App\Models\PageContent;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Notifications\Notification;

class ManageCurriculumContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static string $view = 'filament.pages.manage-curriculum-content';
    protected static ?string $navigationGroup = 'Curriculum Page';
    protected static ?string $navigationLabel = 'Curriculum Content';

    public ?array $data = [];

    public function mount(): void
    {
        $curriculum = PageContent::where('page_slug', 'curriculum')->where('section_key', 'content')->first();
        $downloadsHeading = PageContent::where('page_slug', 'curriculum')->where('section_key', 'downloads_heading')->first();

        $this->form->fill([
            'content' => $curriculum ? $curriculum->content : [],
            'downloads_heading' => $downloadsHeading ? $downloadsHeading->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Curriculum Content')->tabs([
                    Tabs\Tab::make('Overview & Study Pattern')
                        ->schema([
                            TextInput::make('content.heading.kicker')->label('Section Kicker (e.g. Study Pattern)'),
                            TextInput::make('content.heading.title')->label('Section Title')->columnSpanFull(),
                            Textarea::make('content.intro')
                                ->label('Introductory Text')
                                ->rows(3)
                                ->columnSpanFull(),
                            Repeater::make('content.points')
                                ->label('Study Pattern Points')
                                ->schema([
                                    TextInput::make('title')->label('Point Title')->required(),
                                    Textarea::make('description')->label('Point Description')->required()->rows(2),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->columnSpanFull(),
                            Textarea::make('content.note')
                                ->label('Footer Note')
                                ->rows(2)
                                ->columnSpanFull(),
                        ]),
                    Tabs\Tab::make('Syllabus Downloads Section')
                        ->schema([
                            TextInput::make('downloads_heading.kicker')->label('Section Kicker (e.g. Official Resources)'),
                            TextInput::make('downloads_heading.title')->label('Section Title'),
                            Textarea::make('downloads_heading.subtitle')->label('Section Subtitle')->rows(2)->columnSpanFull(),
                        ])->columns(2),
                ])
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        if (isset($data['content'])) {
            if (isset($data['content']['points'])) {
                $data['content']['points'] = array_values($data['content']['points']);
            }
            PageContent::updateOrCreate(
                ['page_slug' => 'curriculum', 'section_key' => 'content'],
                ['content' => $data['content']]
            );
        }

        if (isset($data['downloads_heading'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'curriculum', 'section_key' => 'downloads_heading'],
                ['content' => $data['downloads_heading']]
            );
        }

        Notification::make()->title('Curriculum content saved successfully')->success()->send();
    }

    protected function getFormActions(): array
    {
        return [
            \Filament\Actions\Action::make('save')
                ->label('Save Changes')
                ->submit('save')
                ->color('primary'),
        ];
    }
}
