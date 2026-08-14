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
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;
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
        $whyDistance = PageContent::where('page_slug', 'home')->where('section_key', 'why_distance')->first();
        $aboutSnapshot = PageContent::where('page_slug', 'home')->where('section_key', 'about_snapshot')->first();
        $admissionSteps = PageContent::where('page_slug', 'home')->where('section_key', 'admission_steps')->first();

        $aboutSnapshotContent = $aboutSnapshot ? $aboutSnapshot->content : [];
        if (isset($aboutSnapshotContent['text']) && is_array($aboutSnapshotContent['text'])) {
            $formattedText = [];
            foreach ($aboutSnapshotContent['text'] as $p) {
                $formattedText[] = is_string($p) ? ['text' => $p] : $p;
            }
            $aboutSnapshotContent['text'] = $formattedText;
        }

        $this->form->fill([
            'hero' => $hero ? $hero->content : [],
            'why_distance' => $whyDistance ? $whyDistance->content : [],
            'about_snapshot' => $aboutSnapshotContent,
            'admission_steps' => $admissionSteps ? $admissionSteps->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Home Content')->tabs([
                    Tabs\Tab::make('Hero Section')
                        ->schema([
                            TextInput::make('hero.headline')->label('Headline')->required(),
                            TextInput::make('hero.subHeadline')->label('Sub-headline')->required(),
                            Textarea::make('hero.description')->label('Description')->rows(4)->required()->columnSpanFull(),
                            Repeater::make('hero.ctas')
                                ->label('Call-to-Action Buttons')
                                ->schema([
                                    TextInput::make('label')->required(),
                                    TextInput::make('to')->label('Link (URL or path)')->required(),
                                    Toggle::make('primary')->label('Is Primary Button?')->inline(false),
                                ])
                                ->columns(3)
                                ->columnSpanFull(),
                        ]),
                    Tabs\Tab::make('Why Distance Education')
                        ->schema([
                            Repeater::make('why_distance')
                                ->label('Reasons')
                                ->schema([
                                    TextInput::make('title')->required(),
                                    Textarea::make('description')->required(),
                                ])
                                ->columns(2)
                                ->columnSpanFull(),
                        ]),
                    Tabs\Tab::make('About Snapshot')
                        ->schema([
                            TextInput::make('about_snapshot.readMoreLink')->label('Read More Link'),
                            Repeater::make('about_snapshot.text')
                                ->label('Summary Paragraphs')
                                ->schema([
                                    Textarea::make('text')->label('Paragraph')->required()->rows(3),
                                ])
                                ->columnSpanFull(),
                        ]),
                    Tabs\Tab::make('Admission Steps')
                        ->schema([
                            Repeater::make('admission_steps')
                                ->label('Steps')
                                ->schema([
                                    TextInput::make('step')->label('Step Number (e.g. 01)')->required(),
                                    TextInput::make('title')->label('Step Title')->required(),
                                    Textarea::make('description')->label('Description')->required()->columnSpanFull(),
                                ])
                                ->columns(2)
                                ->columnSpanFull(),
                        ]),
                ])
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        if (isset($data['hero'])) {
            // Ensure CTAs are saved as a clean list of arrays
            if (isset($data['hero']['ctas'])) {
                $data['hero']['ctas'] = array_values($data['hero']['ctas']);
            }
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'hero'],
                ['content' => $data['hero']]
            );
        }

        if (isset($data['why_distance'])) {
            $content = array_values($data['why_distance']);
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'why_distance'],
                ['content' => $content]
            );
        }

        if (isset($data['about_snapshot'])) {
            $text = [];
            if (isset($data['about_snapshot']['text']) && is_array($data['about_snapshot']['text'])) {
                foreach ($data['about_snapshot']['text'] as $p) {
                    if (isset($p['text'])) $text[] = $p['text'];
                    else $text[] = $p;
                }
            }
            $data['about_snapshot']['text'] = $text;

            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'about_snapshot'],
                ['content' => $data['about_snapshot']]
            );
        }

        if (isset($data['admission_steps'])) {
            $content = array_values($data['admission_steps']);
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'admission_steps'],
                ['content' => $content]
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
