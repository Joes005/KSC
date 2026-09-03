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
use Filament\Notifications\Notification;

class ManageFacilitiesContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static string $view = 'filament.pages.manage-facilities-content';
    protected static ?string $navigationGroup = 'Facilities Page';
    protected static ?string $navigationLabel = 'Facilities Page Content';
    protected static ?int $navigationSort = 1;

    public ?array $data = [];

    public function mount(): void
    {
        $grid = PageContent::where('page_slug', 'facilities')->where('section_key', 'grid_heading')->first();
        $strip = PageContent::where('page_slug', 'facilities')->where('section_key', 'strip_heading')->first();

        $this->form->fill([
            'grid_heading' => $grid ? $grid->content : [],
            'strip_heading' => $strip ? $strip->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Facilities Content')->tabs([
                    Tabs\Tab::make('Facilities Grid Section')
                        ->schema([
                            TextInput::make('grid_heading.kicker')->label('Section Kicker (e.g. What We Provide)'),
                            TextInput::make('grid_heading.title')->label('Section Title'),
                            Textarea::make('grid_heading.subtitle')->label('Section Subtitle')->rows(2)->columnSpanFull(),
                        ])->columns(2),
                    Tabs\Tab::make('"Inside Our Centre" Photo Strip Section')
                        ->schema([
                            TextInput::make('strip_heading.kicker')->label('Section Kicker (e.g. Inside Our Center)'),
                            TextInput::make('strip_heading.title')->label('Section Title'),
                            Textarea::make('strip_heading.subtitle')->label('Section Subtitle')->rows(2)->columnSpanFull(),
                        ])->columns(2),
                ])
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        if (isset($data['grid_heading'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'facilities', 'section_key' => 'grid_heading'],
                ['content' => $data['grid_heading']]
            );
        }

        if (isset($data['strip_heading'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'facilities', 'section_key' => 'strip_heading'],
                ['content' => $data['strip_heading']]
            );
        }

        Notification::make()->title('Facilities content saved successfully')->success()->send();
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
