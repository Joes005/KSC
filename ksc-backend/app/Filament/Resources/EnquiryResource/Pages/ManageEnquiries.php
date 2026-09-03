<?php

namespace App\Filament\Resources\EnquiryResource\Pages;

use App\Filament\Resources\EnquiryResource;
use Filament\Resources\Pages\ManageRecords;

class ManageEnquiries extends ManageRecords
{
    protected static string $resource = EnquiryResource::class;

    protected function getHeaderActions(): array
    {
        // No CreateAction — enquiries only ever come in from the public website forms.
        return [];
    }
}
