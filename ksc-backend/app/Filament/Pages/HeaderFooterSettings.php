<?php

namespace App\Filament\Pages;

use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Pages\Page;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Notifications\Notification;
use App\Models\SiteSetting;
use Illuminate\Support\Arr;
use Filament\Actions\Action;

class HeaderFooterSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $navigationGroup = 'Global Settings';
    protected static ?string $navigationLabel = 'Site Logo, Contact & Socials';
    protected static ?string $title = 'Global Settings';

    protected static string $view = 'filament.pages.header-footer-settings';

    /** Setting keys whose value is a list and must round-trip as one JSON row
     *  (not exploded into dotted index keys like "site.stats.0.value"). */
    public const LIST_KEYS = [
        'site.stats',
        'site.nav_items',
        'footer.quick_links',
        'footer.programme_links',
        'footer.support_links',
    ];

    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSetting::pluck('value', 'key')->toArray();
        foreach (self::LIST_KEYS as $listKey) {
            if (isset($settings[$listKey])) {
                $decoded = json_decode($settings[$listKey], true);
                $settings[$listKey] = json_last_error() === JSON_ERROR_NONE ? $decoded : [];
            }
        }
        // Un-dot the array so the form can read nested keys (e.g., site.name -> site['name'])
        $undotted = [];
        foreach ($settings as $key => $value) {
            Arr::set($undotted, $key, $value);
        }

        $this->form->fill($undotted);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Branding')
                    ->description('Upload the site logo shown in the header and footer. If left empty, a default emblem is used.')
                    ->schema([
                        FileUpload::make('site.branding.logo_source')
                            ->label('Site Logo')
                            ->image()
                            ->directory('branding')
                            ->imagePreviewHeight('120'),
                    ]),
                Section::make('Homepage Stats Counters')
                    ->description('The animated counters shown on the homepage (e.g. "50,000+ Graduates").')
                    ->schema([
                        Repeater::make('site.stats')
                            ->label('Stats')
                            ->schema([
                                TextInput::make('value')->label('Number')->numeric()->required(),
                                TextInput::make('suffix')->label('Suffix (e.g. +, %)')->default('+'),
                                TextInput::make('label')->label('Label (e.g. Graduates)')->required(),
                            ])
                            ->columns(3)
                            ->columnSpanFull()
                            ->reorderable()
                            ->addActionLabel('Add stat'),
                    ]),
                Section::make('Header Navigation Menu')
                    ->description('The links shown in the top navigation bar, in order.')
                    ->schema([
                        Repeater::make('site.nav_items')
                            ->label('Menu Items')
                            ->schema([
                                TextInput::make('label')->label('Menu Text')->required(),
                                TextInput::make('path')->label('Page Link (e.g. /about)')->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull()
                            ->reorderable()
                            ->addActionLabel('Add menu item'),
                    ]),
                Section::make('Footer Link Columns')
                    ->description('The three link lists shown in the site footer.')
                    ->schema([
                        Repeater::make('footer.quick_links')
                            ->label('Quick Links column')
                            ->schema([
                                TextInput::make('label')->label('Link Text')->required(),
                                TextInput::make('to')->label('Page Link')->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull()
                            ->reorderable()
                            ->addActionLabel('Add link'),
                        Repeater::make('footer.programme_links')
                            ->label('Programmes column')
                            ->schema([
                                TextInput::make('label')->label('Link Text')->required(),
                                TextInput::make('to')->label('Page Link')->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull()
                            ->reorderable()
                            ->addActionLabel('Add link'),
                        Repeater::make('footer.support_links')
                            ->label('Support column')
                            ->schema([
                                TextInput::make('label')->label('Link Text')->required(),
                                TextInput::make('to')->label('Page Link')->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull()
                            ->reorderable()
                            ->addActionLabel('Add link'),
                    ]),
                Section::make('Global Settings')
                    ->schema([
                        TextInput::make('site.name')->label('Site Name')->required(),
                        TextInput::make('site.short_name')->label('Short Name'),
                        TextInput::make('site.tagline')->label('Tagline'),
                        Textarea::make('site.description')->label('Description')->columnSpanFull(),
                        TextInput::make('site.admission_year')->label('Admission Year'),
                        TextInput::make('site.admission_open')->label('Admission Open Text'),
                        TextInput::make('site.last_date')->label('Last Date'),
                    ])->columns(2),
                Section::make('Contact & Socials')
                    ->schema([
                        TextInput::make('contact.phone')->label('Phone'),
                        TextInput::make('contact.landline')->label('Landline'),
                        TextInput::make('contact.whatsapp')->label('WhatsApp'),
                        TextInput::make('contact.email')->label('Email')->email(),
                        Textarea::make('contact.address')->label('Address')->columnSpanFull(),
                        TextInput::make('socials.facebook')->label('Facebook URL')->url(),
                        TextInput::make('socials.instagram')->label('Instagram URL')->url(),
                        TextInput::make('socials.youtube')->label('YouTube URL')->url(),
                        TextInput::make('socials.twitterX')->label('X (Twitter) URL')->url(),
                        TextInput::make('socials.website')->label('Website URL')->url(),
                    ])->columns(2)
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        foreach (self::LIST_KEYS as $listKey) {
            $list = Arr::pull($data, $listKey, []);
            SiteSetting::updateOrCreate(['key' => $listKey], ['value' => json_encode(array_values($list))]);
        }

        // Arr::dot() leaves an empty-array leaf (e.g. "footer" => []) for any
        // group whose only fields were the list keys just pulled out above —
        // filter those out so we never try to save an array into a text column.
        $dotted = array_filter(Arr::dot($data), fn ($value) => ! is_array($value));

        foreach ($dotted as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        Notification::make()
            ->title('Settings saved successfully.')
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
