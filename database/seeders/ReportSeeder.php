<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['Proses', 'Verifikasi', 'Selesai', 'Gagal'];
        $startDate = Carbon::now()->subYears(3)->startOfDay();
        $endDate = Carbon::now()->startOfDay();

        $faker = \Faker\Factory::create('id_ID');

        echo "Mulai generate data dari " . $startDate->toDateString() . " sampai " . $endDate->toDateString() . PHP_EOL;

        while ($startDate <= $endDate) {
            $dailyCount = rand(1, 100);
            $batch = [];

            for ($i = 0; $i < $dailyCount; $i++) {
                $randomMinutes = rand(0, 1439);
                $randomDateTime = $startDate->copy()->addMinutes($randomMinutes);

                $batch[] = [
                    'name' => $faker->name(),
                    'instansi' => $faker->randomElement([
                        'LP3 : Lembaga Pengembangan Pendidikan dan Pembelajaran',
                        'LSP : Lembaga Sertifikasi Profesi',
                        'LB : Lembaga Bahasa',
                        'LPPM : Lembaga Penelitian dan Pengabdian Kepada Masyarakat',
                        'LPM : Lembaga Penjaminan Mutu',
                        'LPSDM : Lembaga Pengembangan Sumber Daya Manusia',
                        'LKA : Lembaga Kemahasiswaan dan Alumni',
                        'LAMKERMA : Lembaga Kemitraan dan Kerjasama',
                        'LAK : Lembaga Administrasi Keuangan',
                        'LKK : Lembaga Kajian Keagamaan',
                        'LLD : Lembaga Layanan Disabilitas',
                        'LPPMB : Lembaga Pemasaran dan Penerimaan Mahasiswa Baru',
                        'LPAUD : Lembaga Pengelolaan Aset dan Urusan Dalam',
                        'LPTI : Lembaga Pengembangan Teknologi Informasi',
                        'SPPK : Satgas Pencegahan dan Penanganan Kekerasan',
                        'UPPS : Unit Pengelola Program Studi',
                    ]),
                    'location' => $faker->randomElement([
                        'Kampus 1 : Pusat',
                        'Kampus 2 : Viktor',
                        'Kampus 3 : Witana Harja',
                        'Kampus 4 : Serang',
                    ]),
                    'ruang' => $faker->randomElement(['', '101', '202', '305', '613', '404', '507']),
                    'message' => $faker->sentence(),
                    'status' => $statuses[array_rand($statuses)],
                    'kode_laporan' => strtoupper(Str::random(10)),
                    'created_at' => $randomDateTime,
                    'updated_at' => $randomDateTime,
                ];
            }

            DB::table('reports')->insert($batch);

            $startDate->addDay();
        }

        echo "Selesai generate data." . PHP_EOL;
    }
}
