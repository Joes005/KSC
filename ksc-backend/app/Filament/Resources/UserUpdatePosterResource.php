<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserUpdatePosterResource\Pages;
use App\Filament\Resources\UserUpdatePosterResource\RelationManagers;
use App\Models\UserUpdatePoster;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserUpdatePosterResource extends Resource
{
    protected static ?string $model = UserUpdatePoster::class;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';
    protected static ?string $navigationGroup = 'Home Page';
    protected static ?int $navigationSort = 3;
    protected static ?string $navigationLabel = 'Homepage Popup Posters';
    protected static ?string $modelLabel = 'User Update Poster';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image_path')
                    ->image()
                    ->directory('user-update-posters')
                    ->disk('public')
                    ->formatStateUsing(fn ($state) => $state ? \Illuminate\Support\Str::after($state, 'storage/app/public/') : null)
                    ->mutateDehydratedStateUsing(fn ($state) => $state ? (\Illuminate\Support\Str::startsWith($state, 'storage/app/public/') ? $state : 'storage/app/public/' . ltrim($state, '/')) : null)
                    ->required(),
                Forms\Components\Toggle::make('is_active')
                    ->default(true)
                    ->required(),
                Forms\Components\Hidden::make('sort_order')
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->disk('public')
                    ->state(fn ($record) => $record->image_path ? \Illuminate\Support\Str::after($record->image_path, 'storage/app/public/') : null),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
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
            'index' => Pages\ListUserUpdatePosters::route('/'),
            'create' => Pages\CreateUserUpdatePoster::route('/create'),
            'edit' => Pages\EditUserUpdatePoster::route('/{record}/edit'),
        ];
    }
}
