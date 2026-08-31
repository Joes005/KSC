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
use Filament\Notifications\Notification;

class ManageExamUpdateContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static string $view = 'filament.pages.manage-exam-update-content';
    protected static ?string $navigationGroup = 'Exam Update Page';
    protected static ?string $navigationLabel = 'Exam Update Content';

    public ?array $data = [];

    public function mount(): void
    {
        $examHeader = PageContent::where('page_slug', 'exam_update')->where('section_key', 'header')->first();

        $this->form->fill([
            'header' => $examHeader ? $examHeader->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Exam Update Content')->tabs([
                    Tabs\Tab::make('Header & Info')
                        ->schema([
                            TextInput::make('header.kicker')->label('Header Kicker (e.g. Exam Update)')->default('Exam Update'),
                            TextInput::make('header.title')->label('Header Title')->default('Examinations, Hall Tickets & Timetables')->required(),
                            Textarea::make('header.description')->label('Header Description')->rows(3)->columnSpanFull(),
                            Textarea::make('header.supportNote')->label('Bottom Support Note')->rows(3)->columnSpanFull(),
                        ]),
                ])
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        if (isset($data['header'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'exam_update', 'section_key' => 'header'],
                ['content' => $data['header']]
            );
        }

        Notification::make()->title('Exam Update content saved successfully')->success()->send();
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
