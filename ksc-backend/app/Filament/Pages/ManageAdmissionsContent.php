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

class ManageAdmissionsContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static string $view = 'filament.pages.manage-admissions-content';
    protected static ?string $navigationGroup = 'Admissions Page';
    protected static ?string $navigationLabel = 'Admissions Content';

    public ?array $data = [];

    public function mount(): void
    {
        $header = PageContent::where('page_slug', 'admissions')->where('section_key', 'header')->first();
        $eligibility = PageContent::where('page_slug', 'admissions')->where('section_key', 'eligibility_summary')->first();

        $this->form->fill([
            'header' => $header ? $header->content : [],
            'eligibility_summary' => $eligibility ? $eligibility->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Admissions Content')->tabs([
                    Tabs\Tab::make('Header Section')
                        ->schema([
                            TextInput::make('header.kicker')->label('Header Kicker')->default('Admissions'),
                            TextInput::make('header.title')->label('Header Title')->required(),
                            Textarea::make('header.description')->label('Header Description')->rows(3)->columnSpanFull(),
                        ]),
                    Tabs\Tab::make('Eligibility Summary Cards')
                        ->schema([
                            Repeater::make('eligibility_summary')
                                ->label('Eligibility Items')
                                ->schema([
                                    TextInput::make('level')->label('Level (e.g. UG Programmes)')->required(),
                                    Textarea::make('detail')->label('Eligibility Detail')->required()->rows(3)->columnSpanFull(),
                                ])
                                ->collapsible()
                                ->columnSpanFull(),
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
                ['page_slug' => 'admissions', 'section_key' => 'header'],
                ['content' => $data['header']]
            );
        }

        if (isset($data['eligibility_summary'])) {
            $data['eligibility_summary'] = array_values($data['eligibility_summary']);
            PageContent::updateOrCreate(
                ['page_slug' => 'admissions', 'section_key' => 'eligibility_summary'],
                ['content' => $data['eligibility_summary']]
            );
        }

        Notification::make()->title('Admissions content saved successfully')->success()->send();
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
