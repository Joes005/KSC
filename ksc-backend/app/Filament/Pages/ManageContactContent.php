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
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Fieldset;
use Filament\Notifications\Notification;

class ManageContactContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-phone';
    protected static string $view = 'filament.pages.manage-contact-content';
    protected static ?string $navigationGroup = 'Contact Page';
    protected static ?string $navigationLabel = 'Contact Page Content';
    protected static ?int $navigationSort = 1;

    public ?array $data = [];

    public function mount(): void
    {
        $reachCentre = PageContent::where('page_slug', 'contact')->where('section_key', 'reach_centre')->first();
        $enquiryForm = PageContent::where('page_slug', 'contact')->where('section_key', 'enquiry_form')->first();
        $contactFields = PageContent::where('page_slug', 'contact')->where('section_key', 'contact_fields')->first();

        $this->form->fill([
            'reach_centre' => $reachCentre ? $reachCentre->content : [],
            'enquiry_form' => $enquiryForm ? $enquiryForm->content : [],
            'contact_fields' => $contactFields ? $contactFields->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Contact Content')->tabs([
                    Tabs\Tab::make('Reach The Centre')
                        ->schema([
                            Fieldset::make('Reach The Centre Details')
                                ->schema([
                                    TextInput::make('reach_centre.kicker')->label('Kicker (e.g. Get in Touch)'),
                                    TextInput::make('reach_centre.title')->label('Title'),
                                    FileUpload::make('reach_centre.image')->image()->directory('contact')->columnSpanFull(),
                                    TextInput::make('reach_centre.mapEmbedUrl')->label('Google Maps Embed URL')->columnSpanFull(),
                                    Repeater::make('reach_centre.items')
                                        ->label('Contact Info Items')
                                        ->schema([
                                            Select::make('icon')->options([
                                                'MapPin' => 'Location Pin',
                                                'Phone' => 'Phone',
                                                'MessageCircle' => 'WhatsApp / Chat',
                                                'Mail' => 'Email',
                                                'Globe' => 'Website',
                                                'Clock' => 'Clock / Hours',
                                            ])->required(),
                                            TextInput::make('title')->label('Title (e.g. Visit us)')->required(),
                                            Textarea::make('value')->label('Text / Value (Leave blank if using button)'),
                                            TextInput::make('link')->label('Link (e.g. tel:9965107404, mailto:...)'),
                                            TextInput::make('button_label')->label('Button Label (Optional, replaces Text/Value if provided)'),
                                        ])
                                        ->columns(2)
                                        ->collapsible()
                                        ->columnSpanFull(),
                                ]),
                        ]),
                    Tabs\Tab::make('Enquiry Form Settings')
                        ->schema([
                            Fieldset::make('Enquiry Form Details')
                                ->schema([
                                    TextInput::make('enquiry_form.kicker')->label('Kicker'),
                                    TextInput::make('enquiry_form.title')->label('Title'),
                                    Textarea::make('enquiry_form.subtitle')->label('Subtitle')->columnSpanFull(),
                                    TextInput::make('enquiry_form.submitLabel')->label('Submit Button Label'),
                                ]),
                            Repeater::make('contact_fields')
                                ->label('Form Fields')
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

        if (isset($data['reach_centre'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'contact', 'section_key' => 'reach_centre'],
                ['content' => $data['reach_centre']]
            );
        }

        if (isset($data['enquiry_form'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'contact', 'section_key' => 'enquiry_form'],
                ['content' => $data['enquiry_form']]
            );
        }

        if (isset($data['contact_fields'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'contact', 'section_key' => 'contact_fields'],
                ['content' => $data['contact_fields']]
            );
        }

        Notification::make()->title('Saved successfully')->success()->send();
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
