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
use Filament\Forms\Components\TagsInput;
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
        $aboutPage = PageContent::where('page_slug', 'about')->where('section_key', 'about_page')->first();
        $visionMission = PageContent::where('page_slug', 'home')->where('section_key', 'vision_mission')->first();

        $aboutPageContent = $aboutPage ? $aboutPage->content : [];
        if (isset($aboutPageContent['body']) && is_array($aboutPageContent['body'])) {
            $formattedBody = [];
            foreach ($aboutPageContent['body'] as $p) {
                $formattedBody[] = is_string($p) ? ['text' => $p] : $p;
            }
            $aboutPageContent['body'] = $formattedBody;
        }

        $this->form->fill([
            'founder' => $founder ? $founder->content : [],
            'chairman' => $chairman ? $chairman->content : [],
            'about_page' => $aboutPageContent,
            'vision_mission' => $visionMission ? $visionMission->content : [],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('About Content')->tabs([
                    Tabs\Tab::make('Founder Message')
                        ->schema([
                            TextInput::make('founder.title')->label('Section Kicker (small text above heading)'),
                            TextInput::make('founder.subtitle')->label('Section Heading'),
                            FileUpload::make('founder.image')->image()->directory('about'),
                            Textarea::make('founder.content')->columnSpanFull()->rows(5),
                            TextInput::make('founder.name'),
                            TextInput::make('founder.designation'),
                        ]),
                    Tabs\Tab::make('Chairman Message')
                        ->schema([
                            TextInput::make('chairman.title')->label('Section Kicker (small text above heading)'),
                            TextInput::make('chairman.subtitle')->label('Section Heading'),
                            FileUpload::make('chairman.image')->image()->directory('about'),
                            Textarea::make('chairman.content')->columnSpanFull()->rows(5),
                            TextInput::make('chairman.name'),
                            TextInput::make('chairman.designation'),
                        ]),
                    Tabs\Tab::make('About Page Details')
                        ->schema([
                            TextInput::make('about_page.heading.kicker')->label('Section Kicker (e.g. Who We Are)'),
                            TextInput::make('about_page.heading.title')->label('Section Title'),
                            TextInput::make('about_page.establishedYear')->label('Established Year'),
                            FileUpload::make('about_page.image')->label('Main Image')->image()->directory('about'),
                            TagsInput::make('about_page.membership')->label('Membership & Recognitions')->columnSpanFull(),
                            Repeater::make('about_page.body')
                                ->label('Body Paragraphs')
                                ->schema([
                                    Textarea::make('text')->label('Paragraph Text')->required()->rows(3),
                                ])
                                ->columnSpanFull(),
                        ]),
                    Tabs\Tab::make('Vision, Mission & Values')
                        ->schema([
                            Textarea::make('vision_mission.vision')->label('Vision Statement')->columnSpanFull()->rows(3),
                            TagsInput::make('vision_mission.mission')->label('Mission Points')->columnSpanFull(),
                            Repeater::make('vision_mission.values')
                                ->label('Core Values')
                                ->schema([
                                    TextInput::make('title')->label('Value Title')->required(),
                                    Textarea::make('description')->label('Description')->required(),
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

        if (isset($data['founder'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'founder', 'section_key' => 'message'],
                ['content' => $data['founder']]
            );
        }

        if (isset($data['chairman'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'chairman', 'section_key' => 'message'],
                ['content' => $data['chairman']]
            );
        }

        if (isset($data['about_page'])) {
            // Re-format body paragraphs from Repeater associative array to flat string array
            $body = [];
            if (isset($data['about_page']['body']) && is_array($data['about_page']['body'])) {
                foreach ($data['about_page']['body'] as $p) {
                    if (isset($p['text'])) $body[] = $p['text'];
                    else $body[] = $p; // In case it was seeded as flat string array initially
                }
            }
            $data['about_page']['body'] = $body;

            PageContent::updateOrCreate(
                ['page_slug' => 'about', 'section_key' => 'about_page'],
                ['content' => $data['about_page']]
            );
        }

        if (isset($data['vision_mission'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'vision_mission'],
                ['content' => $data['vision_mission']]
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
