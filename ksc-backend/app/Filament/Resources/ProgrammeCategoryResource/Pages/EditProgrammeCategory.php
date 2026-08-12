<?php

namespace App\Filament\Resources\ProgrammeCategoryResource\Pages;

use App\Filament\Resources\ProgrammeCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProgrammeCategory extends EditRecord
{
    protected static string $resource = ProgrammeCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
