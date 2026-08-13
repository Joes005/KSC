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
use Filament\Notifications\Notification;

class ManageAboutContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    protected static string $view = 'filament.pages.manage-about-content';
    protected static ?string $navigationGroup = 'About Page';
    protected static ?string $navigationLabel = 'About Content';

    public ?array $data = [];

    public function mount(): void
    {
        $founder = PageContent::where('page_slug', 'founder')->where('section_key', 'message')->first();
        $chairman = PageContent::where('page_slug', 'chairman')->where('section_key', 'message')->first();

        $this->form->fill([
            'founder' => $founder ? json_decode($founder->content, true) : [],
            'chairman' => $chairman ? json_decode($chairman->content, true) : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('About Content')->tabs([
                    Tabs\Tab::make('Founder Message')
                        ->schema([
                            TextInput::make('founder.title'),
                            TextInput::make('founder.subtitle'),
                            FileUpload::make('founder.image')->image()->directory('about'),
                            Textarea::make('founder.content')->columnSpanFull()->rows(5),
                            TextInput::make('founder.name'),
                            TextInput::make('founder.designation'),
                        ]),
                    Tabs\Tab::make('Chairman Message')
                        ->schema([
                            TextInput::make('chairman.title'),
                            TextInput::make('chairman.subtitle'),
                            FileUpload::make('chairman.image')->image()->directory('about'),
                            Textarea::make('chairman.content')->columnSpanFull()->rows(5),
                            TextInput::make('chairman.name'),
                            TextInput::make('chairman.designation'),
                        ]),
                ])
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        if (isset($data['founder'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'founder', 'section_key' => 'message'],
                ['content' => json_encode($data['founder'])]
            );
        }

        if (isset($data['chairman'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'chairman', 'section_key' => 'message'],
                ['content' => json_encode($data['chairman'])]
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
