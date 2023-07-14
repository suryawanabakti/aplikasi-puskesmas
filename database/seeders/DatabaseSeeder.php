<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Golongan;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {



        $roleSuper = Role::create(['name' => 'super-admin']);
        $roleAdmin = Role::create(['name' => 'admin']);
        $rolePetugas = Role::create(['name' => 'apoteker']);
        $rolePimpinan = Role::create(['name' => 'pimpinan']);

        $user = \App\Models\User::create([
            'name' => 'Clemy Ulpa',
            'email' => 'clemy@admin',
            'password' => bcrypt('qwerty123'),
            'last_seen' => Carbon::now(),
        ]);

        $user2 = \App\Models\User::create([
            'name' => 'Clemy Ulpa',
            'email' => 'clemy@apoteker',
            'password' => bcrypt('qwerty123'),
            'last_seen' => Carbon::now(),
        ]);


        $user->assignRole($roleAdmin);
        $user2->assignRole($rolePetugas);

        Golongan::create([
            'kode' => 'CR',
            'nama' => 'Cair'
        ]);
    }
}
