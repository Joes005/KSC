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
use Filament\Notifications\Notification;
use App\Models\PageContent;
use Filament\Actions\Action;

class AcademicPageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationGroup = 'Academic Page';
    protected static ?string $title = 'Curriculum Overview';

    protected static string $view = 'filament.pages.academic-page-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $curriculum = PageContent::where('page_slug', 'curriculum')->where('section_key', 'content')->first();
        $this->form->fill($curriculum ? $curriculum->content : []);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Curriculum Overview')
                    ->schema([
                        Textarea::make('intro')->label('Introduction Text')->columnSpanFull()->required(),
                        Repeater::make('points')->label('Explanatory Points')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('description')->required(),
                            ])->columns(2)->columnSpanFull(),
                        Textarea::make('note')->label('Footer Note')->columnSpanFull(),
                    ])
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        PageContent::updateOrCreate(
            ['page_slug' => 'curriculum', 'section_key' => 'content'],
            ['content' => $data]
        );

        Notification::make()
            ->title('Academic page settings saved successfully.')
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
