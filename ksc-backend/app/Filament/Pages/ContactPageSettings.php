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

class ContactPageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-phone';
    protected static ?string $navigationGroup = 'Contact Page';
    protected static ?string $title = 'Reach Centre Settings';

    protected static string $view = 'filament.pages.contact-page-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $contact = PageContent::where('page_slug', 'contact')->where('section_key', 'reach_centre')->first();
        $this->form->fill($contact ? $contact->content : []);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Reach Centre Content')
                    ->schema([
                        TextInput::make('kicker')->label('Kicker Text (e.g., Get in Touch)')->required(),
                        TextInput::make('title')->label('Main Title')->required(),
                        TextInput::make('image')->label('Image Path'),
                        Textarea::make('mapEmbedUrl')->label('Google Map Embed URL')->columnSpanFull()->required(),
                        
                        Repeater::make('items')->label('Contact Items')
                            ->schema([
                                TextInput::make('icon')->label('Lucide Icon Name')->required(),
                                TextInput::make('title')->label('Title')->required(),
                                TextInput::make('value')->label('Value Text'),
                                TextInput::make('link')->label('Link (e.g., tel:..., mailto:...)'),
                                TextInput::make('button_label')->label('Button Label'),
                            ])->columns(2)->columnSpanFull()
                    ])->columns(2)
            ])
            ->statePath('data');
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        PageContent::updateOrCreate(
            ['page_slug' => 'contact', 'section_key' => 'reach_centre'],
            ['content' => $data]
        );

        Notification::make()
            ->title('Contact page settings saved successfully.')
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
