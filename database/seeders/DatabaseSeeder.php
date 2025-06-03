<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
            'instansi' => 'admin',
        ]);

        User::create([
            'name' => 'Admin LP3',
            'username' => 'lp3',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LP3 : Lembaga Pengembangan Pendidikan dan Pembelajaran',
        ]);

        User::create([
            'name' => 'Admin LSP',
            'username' => 'lsp',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LSP : Lembaga Sertifikasi Profesi',
        ]);

        User::create([
            'name' => 'Admin LB',
            'username' => 'lb',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LB : Lembaga Bahasa',
        ]);

        User::create([
            'name' => 'Admin LPPM',
            'username' => 'lppm',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LPPM : Lembaga Penelitian dan Pengabdian Kepada Masyarakat',
        ]);

        User::create([
            'name' => 'Admin LPM',
            'username' => 'lpm',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LPM : Lembaga Penjaminan Mutu',
        ]);

        User::create([
            'name' => 'Admin LPSDM',
            'username' => 'lpsdm',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LPSDM : Lembaga Pengembangan Sumber Daya Manusia',
        ]);

        User::create([
            'name' => 'Admin LKA',
            'username' => 'lka',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LKA : Lembaga Kemahasiswaan dan Alumni',
        ]);

        User::create([
            'name' => 'Admin LAMKERMA',
            'username' => 'lamkerma',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LAMKERMA : Lembaga Kemitraan dan Kerjasama',
        ]);

        User::create([
            'name' => 'Admin LAK',
            'username' => 'lak',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LAK : Lembaga Administrasi Keuangan',
        ]);

        User::create([
            'name' => 'Admin LKK',
            'username' => 'lkk',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LKK : Lembaga Kajian Keagamaan',
        ]);

        User::create([
            'name' => 'Admin LLD',
            'username' => 'lld',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LLD : Lembaga Layanan Disabilitas',
        ]);

        User::create([
            'name' => 'Admin LPPMB',
            'username' => 'lppmb',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LPPMB : Lembaga Pemasaran dan Penerimaan Mahasiswa Baru',
        ]);

        User::create([
            'name' => 'Admin LPAUD',
            'username' => 'lpaud',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LPAUD : Lembaga Pengelolaan Aset dan Urusan Dalam',
        ]);

        User::create([
            'name' => 'Admin LPTI',
            'username' => 'lpti',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'LPTI : Lembaga Pengembangan Teknologi Informasi',
        ]);

        User::create([
            'name' => 'Admin SPPK',
            'username' => 'sppk',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'SPPK : Satgas Pencegahan dan Penanganan Kekerasan',
        ]);

        User::create([
            'name' => 'Admin UPPS',
            'username' => 'upps',
            'password' => Hash::make('12345678'),
            'role' => 'staff',
            'instansi' => 'UPPS : Unit Pengelola Program Studi',
        ]);
    }
}
