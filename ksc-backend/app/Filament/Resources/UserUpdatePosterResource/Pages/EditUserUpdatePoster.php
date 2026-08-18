<?php

namespace App\Filament\Resources\UserUpdatePosterResource\Pages;

use App\Filament\Resources\UserUpdatePosterResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserUpdatePoster extends EditRecord
{
    protected static string $resource = UserUpdatePosterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
