<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = User::with('roles')->role(['apoteker', 'pimpinan'])->orderBy('last_seen', 'desc');

        if ($request->term) {
            $data->where('name', 'LIKE', "%{$request->term}%");
        }

        if ($request->filterPosition) {
            $data->role($request->filterPosition);
        }

        $users = UserResource::collection($data->paginate($request->paginate ?? 5));

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
            'term' => $request->term ?? '',
            'filterPositions' => $request->filterPosition ?? '',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'position' => 'required|string|max:255',
            'alamat' => 'string|max:255',
            'no_telepon' => 'numeric|max:15',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'alamat' => $request->alamat ?? null,
            'no_telepon' => $request->noTelepon ?? null,
            'last_seen' => Carbon::now()
        ]);


        $user->assignRole($request->position);


        return Redirect::to('/admin/users-management');
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            "user" => $user
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            "user" => $user
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create', []);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::to('/admin/users-management');
    }
}
