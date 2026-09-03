<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EnquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'form_type' => ['nullable', 'string', 'in:contact,admissions'],
        ]);

        $enquiry = Enquiry::create([
            'form_type' => $validated['form_type'] ?? 'contact',
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'data' => $request->except(['form_type']),
        ]);

        return response()->json(['success' => true, 'id' => $enquiry->id], 201);
    }
}
