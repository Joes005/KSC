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
use Filament\Forms\Components\FileUpload;
use Filament\Notifications\Notification;

class ManageHomeContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.manage-home-content';
    protected static ?string $navigationGroup = 'Home Page';
    protected static ?string $navigationLabel = 'Home Content';

    public ?array $data = [];

    public function mount(): void
    {
        $hero = PageContent::where('page_slug', 'home')->where('section_key', 'hero')->first();
        $why = PageContent::where('page_slug', 'home')->where('section_key', 'why_distance')->first();

        $this->form->fill([
            'hero' => $hero ? json_decode($hero->content, true) : [],
            'why_distance' => $why ? json_decode($why->content, true) : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Home Content')->tabs([
                    Tabs\Tab::make('Hero Slider')
                        ->schema([
                            Repeater::make('hero.slides')
                                ->schema([
                                    FileUpload::make('image')->image()->directory('hero'),
                                    TextInput::make('title'),
                                    TextInput::make('highlight'),
                                    Textarea::make('description'),
                                ])
                        ]),
                    Tabs\Tab::make('Why Distance')
                        ->schema([
                            TextInput::make('why_distance.title'),
                            Textarea::make('why_distance.subtitle'),
                            Repeater::make('why_distance.features')
                                ->schema([
                                    TextInput::make('icon'),
                                    TextInput::make('title'),
                                    Textarea::make('description'),
                                ])
                        ]),
                ])
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        if (isset($data['hero'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'hero'],
                ['content' => json_encode($data['hero'])]
            );
        }

        if (isset($data['why_distance'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'why_distance'],
                ['content' => json_encode($data['why_distance'])]
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
