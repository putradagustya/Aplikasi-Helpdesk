<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReportModel;

class ReportStatusController extends Controller
{
    public function __invoke(Request $request)
    {
        // Pencarian berdasarkan kode laporan
        if ($request->filled('kode_laporan')) {
            $report = ReportModel::where('kode_laporan', $request->kode_laporan)->first();

            if (!$report) {
                return response()->json(['message' => 'Laporan tidak ditemukan'], 404);
            }

            return response()->json([
                'kode_laporan' => $report->kode_laporan,
                'nama' => $report->name,
                'username' => $report->username ?? '-',
                'instansi' => $report->instansi,
                'location' => $report->location ?? '-',
                'ruang' => $report->ruang ?? '-',
                'status' => $report->status,
                'deskripsi' => $report->message,
                'tanggal' => $report->created_at->format('d-m-Y'),
            ]);
        }

        // Pencarian berdasarkan nama dan instansi, case-insensitive
        if ($request->filled('name') && $request->filled('instansi')) {
            $name = trim($request->name);
            $instansi = strtolower(trim($request->instansi));

            $reports = ReportModel::when($instansi !== 'all', function ($query) use ($instansi) {
                $query->whereRaw('LOWER(instansi) = ?', [$instansi]);
            })
                ->where('name', 'like', "%$name%")
                ->orderBy('created_at', 'desc')
                ->get();


            if ($reports->isEmpty()) {
                return response()->json(['message' => 'Tidak ada laporan ditemukan'], 404);
            }

            return response()->json($reports->map(function ($r) {
                return [
                    'kode_laporan' => $r->kode_laporan,
                    'nama' => $r->name,
                    'username' => $r->username ?? '-',
                    'instansi' => $r->instansi,
                    'location' => $r->location ?? '-',
                    'ruang' => $r->ruang ?? '-',
                    'status' => $r->status,
                    'deskripsi' => $r->message,
                    'tanggal' => $r->created_at->format('d-m-Y'),
                ];
            }));
        }

        return response()->json(['message' => 'Data tidak valid'], 400);
    }
}
