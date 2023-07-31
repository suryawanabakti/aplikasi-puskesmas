<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Golongan;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function PHPSTORM_META\map;

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
        $roleDokter = Role::create(['name' => 'dokter']);

        $user3 = \App\Models\User::create([
            'name' => 'dr. Dian Vera Widiawaty',
            'email' => 'dian@dokter',
            'password' => bcrypt('qwerty123'),
            'last_seen' => Carbon::now(),
        ]);

        $user3->assignRole($roleDokter);


        $user = \App\Models\User::create([
            'name' => 'Clemy Ulpa',
            'email' => 'clemy@admin',
            'password' => bcrypt('qwerty123'),
            'last_seen' => Carbon::now(),
        ]);

        $user2 = \App\Models\User::create([
            'name' => 'Irnawaty',
            'email' => 'irnawaty@pimpinan',
            'password' => bcrypt('qwerty123'),
            'last_seen' => Carbon::now(),
        ]);

        $user->assignRole($roleAdmin);
        $user2->assignRole($rolePimpinan);

        Supplier::create([
            'kode' => 'DNS',
            'nama' => 'Dinas Kesehatan',
            'alamat' => 'Jl. Ganggawa No.3, Ujung Sabbang, Kec. Ujung, Kota Parepare, Sulawesi Selatan 91114'
        ]);
    }
}
