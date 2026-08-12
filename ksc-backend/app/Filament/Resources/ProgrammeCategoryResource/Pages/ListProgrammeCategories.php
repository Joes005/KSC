<?php

namespace App\Filament\Resources\ProgrammeCategoryResource\Pages;

use App\Filament\Resources\ProgrammeCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProgrammeCategories extends ListRecords
{
    protected static string $resource = ProgrammeCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
