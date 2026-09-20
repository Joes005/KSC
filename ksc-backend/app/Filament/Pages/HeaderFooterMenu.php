<?php

namespace App\Filament\Pages;

use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Pages\Page;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Notifications\Notification;
use App\Models\SiteSetting;
use Illuminate\Support\Arr;
use Filament\Actions\Action;

class HeaderFooterMenu extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-bars-3-bottom-left';
    protected static ?string $navigationGroup = 'Header & Footer';
    protected static ?string $navigationLabel = 'Header & Footer';
    protected static ?string $title = 'Header & Footer';

    protected static string $view = 'filament.pages.header-footer-menu';

    /** Setting keys whose value is a list and must round-trip as one JSON row
     *  (not exploded into dotted index keys like "site.nav_items.0.label"). */
    public const LIST_KEYS = [
        'site.nav_items',
        'nav.previous_question_links',
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
        // Un-dot the array so the form can read nested keys (e.g., site.nav_items -> site['nav_items'])
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
                Section::make('Previous Question Papers (Header Dropdown)')
                    ->description('Shown as a "Previous Question" dropdown after Contact in the header menu. Add each university name and the link to its previous question papers.')
                    ->schema([
                        Repeater::make('nav.previous_question_links')
                            ->label('University Links')
                            ->schema([
                                TextInput::make('label')->label('University Name')->required(),
                                TextInput::make('url')->label('Link (URL)')->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull()
                            ->reorderable()
                            ->addActionLabel('Add university link'),
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
