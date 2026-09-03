<?php

namespace App\Filament\Pages;

use App\Models\PageContent;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Notifications\Notification;

class ManagePageBanners extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static string $view = 'filament.pages.manage-page-banners';
    protected static ?string $navigationGroup = 'Page Banner Photos';
    protected static ?string $navigationLabel = 'All Page Banner Photos';
    protected static ?int $navigationSort = 0;
    protected static ?string $title = 'Page Banner Photos';

    /** page_slug => label shown to the admin */
    public const PAGES = [
        'about' => 'About Us',
        'academic' => 'Academics',
        'admissions' => 'Admissions',
        'contact' => 'Contact Us',
        'curriculum' => 'Curriculum',
        'facilities' => 'Facilities',
        'founder' => "Founder's Message",
        'chairman' => "Chairman's Message",
        'gallery' => 'Gallery',
        'university' => 'University Detail Pages',
    ];

    public ?array $data = [];

    public function mount(): void
    {
        $rows = PageContent::where('section_key', 'banner')
            ->whereIn('page_slug', array_keys(self::PAGES))
            ->get()
            ->keyBy('page_slug');

        $formData = [];
        foreach (self::PAGES as $slug => $label) {
            $formData[$slug] = $rows->has($slug) ? $rows->get($slug)->content : [];
        }

        $this->form->fill($formData);
    }

    public function form(Form $form): Form
    {
        $sections = [];
        foreach (self::PAGES as $slug => $label) {
            $fields = [
                FileUpload::make("{$slug}.image")
                    ->label('Banner Photo')
                    ->image()
                    ->directory('page-banners')
                    ->imagePreviewHeight('150'),
            ];

            if ($slug === 'academic') {
                $fields[] = FileUpload::make("{$slug}.secondary_image")
                    ->label('Eligibility Section Photo')
                    ->image()
                    ->directory('page-banners')
                    ->imagePreviewHeight('150');
            }

            if ($slug === 'facilities') {
                $fields[] = FileUpload::make("{$slug}.strip")
                    ->label('"Inside Our Centre" Photo Strip')
                    ->helperText('4 photos shown in the strip below the facilities grid.')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->appendFiles()
                    ->directory('page-banners');
            }

            $sections[] = Section::make($label)->schema($fields)->collapsible();
        }

        return $form
            ->schema($sections)
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach (self::PAGES as $slug => $label) {
            if (isset($data[$slug])) {
                PageContent::updateOrCreate(
                    ['page_slug' => $slug, 'section_key' => 'banner'],
                    ['content' => $data[$slug]]
                );
            }
        }

        Notification::make()->title('Banner photos saved successfully')->success()->send();
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
