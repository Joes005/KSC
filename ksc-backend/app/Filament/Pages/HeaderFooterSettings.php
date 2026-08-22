<?php

namespace App\Filament\Pages;

use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Pages\Page;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use App\Models\SiteSetting;
use Illuminate\Support\Arr;
use Filament\Actions\Action;

class HeaderFooterSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $navigationGroup = 'Header & Footer';
    protected static ?string $title = 'Global Settings';

    protected static string $view = 'filament.pages.header-footer-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSetting::pluck('value', 'key')->toArray();
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
                        TextInput::make('socials.website')->label('Website URL')->url(),
                    ])->columns(2)
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();
        $dotted = Arr::dot($data);

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
