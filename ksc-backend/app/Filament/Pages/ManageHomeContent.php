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
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\ColorPicker;
use Filament\Notifications\Notification;

class ManageHomeContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.manage-home-content';
    protected static ?string $navigationGroup = 'Home Page';
    protected static ?string $navigationLabel = 'Home Content';
    protected static ?int $navigationSort = 1;

    public ?array $data = [];

    public function mount(): void
    {
        $sectionHeadings = PageContent::where('page_slug', 'home')->where('section_key', 'section_headings')->first();
        $affiliations = PageContent::where('page_slug', 'home')->where('section_key', 'affiliations')->first();
        $hero = PageContent::where('page_slug', 'home')->where('section_key', 'hero')->first();
        $whyDistance = PageContent::where('page_slug', 'home')->where('section_key', 'why_distance')->first();
        $whyDistanceImage = PageContent::where('page_slug', 'home')->where('section_key', 'why_distance_image')->first();
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

        $heroContent = $hero ? $hero->content : [];
        if (!isset($heroContent['slides']) || !is_array($heroContent['slides']) || empty($heroContent['slides'])) {
            if (isset($heroContent['images']) && is_array($heroContent['images'])) {
                $heroContent['slides'] = array_values(array_map(function ($img, $idx) {
                    $imgPath = is_string($img) ? $img : ($img['image'] ?? '');
                    return [
                        'image' => $imgPath,
                        'title' => $idx === 0 ? 'Education that fits your life' : '',
                        'caption' => $idx === 0 ? 'Study. Grow. Move forward.' : '',
                    ];
                }, $heroContent['images'], array_keys($heroContent['images'])));
            } else {
                $heroContent['slides'] = [];
            }
        }

        $this->form->fill([
            'section_headings' => $sectionHeadings ? $sectionHeadings->content : [],
            'affiliations' => $affiliations ? $affiliations->content : [],
            'hero' => $heroContent,
            'why_distance' => $whyDistance ? $whyDistance->content : [],
            'why_distance_image' => $whyDistanceImage ? $whyDistanceImage->content : [],
            'about_snapshot' => $aboutSnapshotContent,
            'admission_steps' => $admissionSteps ? $admissionSteps->content : [],
        ]);
    }

    /**
     * Fonts the client can pick for hero slide text, grouped for the dropdown.
     * Keys must match the Google Fonts family names the frontend loads
     * (HERO_FONTS in Hero.tsx).
     */
    public static function heroFontOptions(): array
    {
        return [
            'Modern (Sans-serif)' => [
                'Manrope' => 'Manrope (Default)',
                'Poppins' => 'Poppins',
                'Montserrat' => 'Montserrat',
                'Roboto' => 'Roboto',
                'Open Sans' => 'Open Sans',
                'Lato' => 'Lato',
                'Nunito' => 'Nunito',
                'Raleway' => 'Raleway',
                'Ubuntu' => 'Ubuntu',
                'Josefin Sans' => 'Josefin Sans',
                'Comfortaa' => 'Comfortaa',
                'Quicksand' => 'Quicksand',
            ],
            'Bold / Headline' => [
                'Archivo Black' => 'Archivo Black',
                'Oswald' => 'Oswald',
                'Bebas Neue' => 'Bebas Neue',
                'Anton' => 'Anton',
                'Teko' => 'Teko',
                'Righteous' => 'Righteous',
            ],
            'Classic (Serif)' => [
                'Merriweather' => 'Merriweather',
                'Playfair Display' => 'Playfair Display',
                'Lora' => 'Lora',
                'Roboto Slab' => 'Roboto Slab',
                'Bitter' => 'Bitter',
                'Abril Fatface' => 'Abril Fatface',
                'Cinzel' => 'Cinzel',
            ],
            'Handwriting / Stylish' => [
                'Lobster' => 'Lobster',
                'Pacifico' => 'Pacifico',
                'Dancing Script' => 'Dancing Script',
                'Great Vibes' => 'Great Vibes',
                'Kaushan Script' => 'Kaushan Script',
                'Satisfy' => 'Satisfy',
                'Caveat' => 'Caveat',
            ],
            'Tamil' => [
                'Noto Sans Tamil' => 'Noto Sans Tamil',
                'Noto Serif Tamil' => 'Noto Serif Tamil',
                'Mukta Malar' => 'Mukta Malar',
                'Catamaran' => 'Catamaran',
                'Hind Madurai' => 'Hind Madurai',
                'Arima' => 'Arima',
                'Baloo Thambi 2' => 'Baloo Thambi 2',
                'Anek Tamil' => 'Anek Tamil',
                'Pavanam' => 'Pavanam',
                'Meera Inimai' => 'Meera Inimai',
                'Kavivanar' => 'Kavivanar',
                'Tiro Tamil' => 'Tiro Tamil',
            ],
        ];
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Home Content')->tabs([
                    Tabs\Tab::make('Section Headings')
                        ->schema([
                            Section::make('Education Opens More Than Doors (Photo + text section)')
                                ->schema([
                                    TextInput::make('section_headings.about_snapshot.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.about_snapshot.title')->label('Title'),
                                    Textarea::make('section_headings.about_snapshot.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Why Distance Education (accordion section)')
                                ->schema([
                                    TextInput::make('section_headings.why_distance.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.why_distance.title')->label('Title'),
                                    Textarea::make('section_headings.why_distance.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Vision · Mission · Values')
                                ->schema([
                                    TextInput::make('section_headings.vision_mission.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.vision_mission.title')->label('Title'),
                                ])->columns(2)->collapsible(),
                            Section::make('Top Universities Strip')
                                ->schema([
                                    TextInput::make('section_headings.university_strip.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.university_strip.title')->label('Title'),
                                    Textarea::make('section_headings.university_strip.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Programmes Offered (university tabs section)')
                                ->schema([
                                    TextInput::make('section_headings.university_courses.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.university_courses.title')->label('Title'),
                                    Textarea::make('section_headings.university_courses.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Facilities & Services Spotlight')
                                ->schema([
                                    TextInput::make('section_headings.facilities_spotlight.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.facilities_spotlight.title')->label('Title'),
                                    Textarea::make('section_headings.facilities_spotlight.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Admission Steps ("How It Works")')
                                ->schema([
                                    TextInput::make('section_headings.admission_steps.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.admission_steps.title')->label('Title'),
                                    Textarea::make('section_headings.admission_steps.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                            Section::make('Gallery Strip ("Take a look inside")')
                                ->schema([
                                    TextInput::make('section_headings.gallery_strip.kicker')->label('Kicker'),
                                    TextInput::make('section_headings.gallery_strip.title')->label('Title'),
                                    Textarea::make('section_headings.gallery_strip.subtitle')->label('Subtitle')->rows(2),
                                ])->columns(3)->collapsible(),
                        ]),
                    Tabs\Tab::make('Affiliation Badges')
                        ->schema([
                            Repeater::make('affiliations')
                                ->label('Badges')
                                ->helperText('The small badge row shown under the hero banner (e.g. "UGC — Approved Institute").')
                                ->schema([
                                    TextInput::make('badge')->label('Badge Text (short, e.g. UGC)')->required(),
                                    TextInput::make('line1')->label('Description Line 1')->required(),
                                    TextInput::make('line2')->label('Description Line 2'),
                                ])
                                ->columns(3)
                                ->columnSpanFull()
                                ->reorderable()
                                ->addActionLabel('Add badge'),
                        ]),
                    Tabs\Tab::make('Hero Section')
                        ->schema([
                            TextInput::make('hero.headline')->label('Headline')->required(),
                            TextInput::make('hero.subHeadline')->label('Sub-headline')->required(),
                            Textarea::make('hero.description')->label('Description')->rows(4)->required()->columnSpanFull(),
                            Repeater::make('hero.slides')
                                ->label('Rotating Banner Photos & Captions')
                                ->helperText('Add up to 4 banner photos. For each photo, you can add an individual title and caption line that appears on top of the image in the frame.')
                                ->schema([
                                    FileUpload::make('image')
                                        ->label('Photo')
                                        ->image()
                                        ->directory('hero')
                                        ->disk('public')
                                        ->required()
                                        ->columnSpanFull(),
                                    TextInput::make('title')
                                        ->label('Title / Main Line')
                                        ->placeholder('e.g. Education that fits your life'),
                                    TextInput::make('caption')
                                        ->label('Caption / Subtitle Line')
                                        ->placeholder('e.g. Study. Grow. Move forward.'),
                                    Select::make('title_font')
                                        ->label('Title Font')
                                        ->options(self::heroFontOptions())
                                        ->searchable()
                                        ->placeholder('Default (Manrope)')
                                        ->helperText('Tamil fonts change only Tamil letters — for English text pick a font from the other groups.'),
                                    Select::make('caption_font')
                                        ->label('Caption Font')
                                        ->options(self::heroFontOptions())
                                        ->searchable()
                                        ->placeholder('Default (Manrope)')
                                        ->helperText('Tamil fonts change only Tamil letters — for English text pick a font from the other groups.'),
                                    ColorPicker::make('title_color')
                                        ->label('Title Colour')
                                        ->helperText('Leave empty for the default white.'),
                                    ColorPicker::make('caption_color')
                                        ->label('Caption Colour')
                                        ->helperText('Leave empty for the default white.'),
                                ])
                                ->columns(2)
                                ->maxItems(4)
                                ->reorderable()
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => 
                                    !empty($state['title']) 
                                        ? ($state['title'] . (!empty($state['caption']) ? ' — ' . $state['caption'] : ''))
                                        : (!empty($state['caption']) ? $state['caption'] : 'Banner Photo')
                                )
                                ->addActionLabel('Add Banner Photo & Caption')
                                ->columnSpanFull(),
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
                            FileUpload::make('why_distance_image.image')
                                ->label('Side Photo')
                                ->image()
                                ->directory('home')
                                ->columnSpanFull(),
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
                            FileUpload::make('about_snapshot.image')
                                ->label('Photo')
                                ->image()
                                ->directory('home')
                                ->columnSpanFull(),
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

        if (isset($data['section_headings'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'section_headings'],
                ['content' => $data['section_headings']]
            );
        }

        if (isset($data['affiliations'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'affiliations'],
                ['content' => array_values($data['affiliations'])]
            );
        }

        if (isset($data['hero'])) {
            // Ensure CTAs are saved as a clean list of arrays
            if (isset($data['hero']['ctas'])) {
                $data['hero']['ctas'] = array_values($data['hero']['ctas']);
            }
            if (isset($data['hero']['slides'])) {
                $data['hero']['slides'] = array_values($data['hero']['slides']);
                // Keep hero.images in sync as an array of paths for backward compatibility
                $data['hero']['images'] = array_values(array_filter(array_map(function ($s) {
                    return is_array($s) ? ($s['image'] ?? null) : $s;
                }, $data['hero']['slides'])));
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

        if (isset($data['why_distance_image'])) {
            PageContent::updateOrCreate(
                ['page_slug' => 'home', 'section_key' => 'why_distance_image'],
                ['content' => $data['why_distance_image']]
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
