<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EnquiryResource\Pages;
use App\Models\Enquiry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EnquiryResource extends Resource
{
    protected static ?string $model = Enquiry::class;

    protected static ?string $navigationIcon = 'heroicon-o-inbox-arrow-down';
    protected static ?string $navigationGroup = 'Enquiries';
    protected static ?string $navigationLabel = 'Website Enquiries';
    protected static ?string $modelLabel = 'Enquiry';

    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('is_read', false)->count();
        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Placeholder::make('form_type')
                    ->label('Submitted From')
                    ->content(fn (?Enquiry $record) => $record ? ucfirst($record->form_type) . ' page form' : '-'),
                Forms\Components\Placeholder::make('name')
                    ->content(fn (?Enquiry $record) => $record?->name ?? '-'),
                Forms\Components\Placeholder::make('phone')
                    ->content(fn (?Enquiry $record) => $record?->phone ?? '-'),
                Forms\Components\Placeholder::make('email')
                    ->content(fn (?Enquiry $record) => $record?->email ?: '-'),
                Forms\Components\KeyValue::make('data')
                    ->label('Full Submitted Details')
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_read')
                    ->label('Marked as followed up'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\IconColumn::make('is_read')
                    ->label('')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-envelope')
                    ->trueColor('success')
                    ->falseColor('danger'),
                Tables\Columns\TextColumn::make('form_type')
                    ->label('From')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => ucfirst($state)),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('d M Y, h:i A')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('form_type')
                    ->options(['contact' => 'Contact', 'admissions' => 'Admissions']),
                Tables\Filters\TernaryFilter::make('is_read')
                    ->label('Follow-up status')
                    ->trueLabel('Followed up')
                    ->falseLabel('Needs follow-up'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('View / Update'),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageEnquiries::route('/'),
        ];
    }
}
