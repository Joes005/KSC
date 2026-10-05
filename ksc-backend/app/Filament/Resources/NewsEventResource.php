<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsEventResource\Pages;
use App\Filament\Resources\NewsEventResource\RelationManagers;
use App\Models\NewsEvent;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsEventResource extends Resource
{
    protected static ?string $model = NewsEvent::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Home Page';
    protected static ?string $navigationLabel = 'News & Events Ticker';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Notice Text')
                    ->helperText('The announcement shown in the home page ticker (and on the Exam Update page for exam notices).')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('type')
                    ->label('Notice Type')
                    ->helperText('Choose "Exam" for exam results, hall tickets and time-tables — only Exam notices are listed on the Exam Update page.')
                    ->options(NewsEvent::TYPES)
                    ->default('event')
                    ->required()
                    ->native(false),
                Forms\Components\TextInput::make('badge')
                    ->label('Tag Text (optional)')
                    ->helperText('Short label shown above the notice in the home page ticker, e.g. "BDU Exam Result" or "13 Oct 2026". Leave empty for no tag.')
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\TextInput::make('link')
                    ->label('Click Here Link (URL)')
                    ->helperText('If set, a "Click here" button appears on this notice, linking to this page (e.g. the exam results site). Use a full address like https://bdu.ac.in/... or a page on this site like /admissions. Leave empty if you are uploading a PDF below instead.')
                    ->rule('regex:/^(https?:\/\/\S+|\/(?!\/)\S*)$/i')
                    ->validationMessages(['regex' => 'Enter a full web address starting with https:// or a site page starting with / (e.g. /admissions).'])
                    ->maxLength(255)
                    ->default(null),
                Forms\Components\FileUpload::make('pdf_path')
                    ->label('Notice PDF')
                    ->helperText('Optional. Upload a PDF instead of a link — the "Click here" button will download this PDF. If both a link and a PDF are set, the link is used.')
                    ->acceptedFileTypes(['application/pdf'])
                    ->directory('news-events')
                    ->disk('public')
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_active')
                    ->label('Show on Website')
                    ->helperText('Turn off to hide this notice without deleting it.')
                    ->default(true)
                    ->required(),
                Forms\Components\TextInput::make('sort_order')
                    ->label('Display Order')
                    ->helperText('Lower numbers show first. You can also drag rows to reorder them on the list page.')
                    ->numeric()
                    ->required()
                    ->default(fn () => (NewsEvent::max('sort_order') ?? -1) + 1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Notice Text')
                    ->limit(60)
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Notice Type')
                    ->badge()
                    ->formatStateUsing(fn (?string $state): string => NewsEvent::TYPES[$state] ?? (string) $state),
                Tables\Columns\TextColumn::make('badge')
                    ->label('Tag Text')
                    ->searchable(),
                Tables\Columns\TextColumn::make('link')
                    ->label('Link')
                    ->limit(40)
                    ->searchable(),
                Tables\Columns\IconColumn::make('pdf_path')
                    ->label('PDF')
                    ->boolean()
                    ->getStateUsing(fn (NewsEvent $record): bool => filled($record->pdf_path)),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('On Website')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Display Order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNewsEvents::route('/'),
            'create' => Pages\CreateNewsEvent::route('/create'),
            'edit' => Pages\EditNewsEvent::route('/{record}/edit'),
        ];
    }
}
