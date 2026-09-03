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
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
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
        $sectionHeadings = PageContent::where('page_slug', 'admissions')->where('section_key', 'section_headings')->first();
        $applicationFields = PageContent::where('page_slug', 'admissions')->where('section_key', 'application_fields')->first();

        $this->form->fill([
            'header' => $header ? $header->content : [],
            'eligibility_summary' => $eligibility ? $eligibility->content : [],
            'section_headings' => $sectionHeadings ? $sectionHeadings->content : [],
            'application_fields' => $applicationFields ? $applicationFields->content : [],
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
                    Tabs\Tab::make('Other Section Headings')
                        ->schema([
                            Section::make('Admission Steps Section')
                                ->schema([
                                    TextInput::make('section_headings.steps.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.steps.title')->label('Title'),
                                ])->columns(2)->collapsible(),
                            Section::make('Prospectus Downloads Section')
                                ->schema([
                                    TextInput::make('section_headings.downloads.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.downloads.title')->label('Title'),
                                    Textarea::make('section_headings.downloads.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Eligibility Section')
                                ->schema([
                                    TextInput::make('section_headings.eligibility.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.eligibility.title')->label('Title'),
                                ])->columns(2)->collapsible(),
                            Section::make('Application Form Section')
                                ->schema([
                                    TextInput::make('section_headings.apply_form.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.apply_form.title')->label('Title'),
                                    Textarea::make('section_headings.apply_form.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Universities Sidebar Section')
                                ->schema([
                                    TextInput::make('section_headings.universities_sidebar.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.universities_sidebar.title')->label('Title'),
                                ])->columns(2)->collapsible(),
                        ]),
                    Tabs\Tab::make('Application Form Fields')
                        ->schema([
                            Repeater::make('application_fields')
                                ->label('Form Fields')
                                ->helperText('The fields shown in the "Start your application" form on this page.')
                                ->schema([
                                    TextInput::make('name')->required(),
                                    TextInput::make('label')->required(),
                                    Select::make('type')
                                        ->options([
                                            'text' => 'Text',
                                            'tel' => 'Telephone',
                                            'email' => 'Email',
                                            'textarea' => 'Textarea',
                                            'select' => 'Select Dropdown',
                                        ])->required(),
                                    TextInput::make('placeholder'),
                                    Toggle::make('required')->inline(false),
                                    TagsInput::make('options')
                                        ->label('Dropdown Options (if type is select)')
                                        ->columnSpanFull(),
                                ])
                                ->columns(2)
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

        if (isset($data['section_headings'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'admissions', 'section_key' => 'section_headings'],
                ['content' => $data['section_headings']]
            );
        }

        if (isset($data['application_fields'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'admissions', 'section_key' => 'application_fields'],
                ['content' => array_values($data['application_fields'])]
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
