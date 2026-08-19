<?php

namespace App\Filament\Resources\ProgrammeCategoryResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProgrammesRelationManager extends RelationManager
{
    protected static string $relationship = 'programmes';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required(),
                Forms\Components\TextInput::make('medium')
                    ->required(),
                Forms\Components\TextInput::make('pattern'),
                Forms\Components\TextInput::make('duration'),
                Forms\Components\Textarea::make('eligibility')
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('syllabus_path')
                    ->label('Syllabus PDF')
                    ->acceptedFileTypes(['application/pdf'])
                    ->directory('syllabuses')
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('medium')
                    ->searchable(),
                Tables\Columns\TextColumn::make('pattern')
                    ->searchable(),
                Tables\Columns\TextColumn::make('duration')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
