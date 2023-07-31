<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {

        $request->validate([
            'name' => ['string', 'max:255'],
            'alamat' => ['max:255'],
            'no_telepon' => ['nullable', 'numeric'],
            'images' => ['required', 'image', 'mimes:jpg,png,jpeg'],
            'email' => ['email', 'max:255', 'unique:users,email,' . auth()->id()],
        ]);

        $image = $request->file('image')->store('image');

        User::where('id', auth()->id())->update([
            'name' => $request->name,
            'alamat' => $request->alamat,
            'no_telepon' => $request->no_telepon,
            'image' => $image ?? null,
            'email' => $request->email
        ]);

        return back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
