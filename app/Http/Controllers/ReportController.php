<?php

namespace App\Http\Controllers;

use App\Models\ReportModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $userInstansi = Auth::user()->instansi;
        $isAdmin = strtolower($userInstansi) === 'admin';

        $query = ReportModel::query();

        if (!$isAdmin) {
            $query->where('instansi', $userInstansi);
        }

        $search = strtolower($request->query('search', ''));
        $page = (int) $request->query('page', 1);
        $limit = (int) $request->query('limit', 10);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $like = "%{$search}%";
                $q->whereRaw('LOWER(kode_laporan) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(name) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(location) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(ruang) LIKE ?', [$like])
                    ->orWhereRaw('LOWER(status) LIKE ?', [$like])
                    ->orWhereRaw("TO_CHAR(created_at, 'YYYY-MM-DD') LIKE ?", [$like]);
            });
        }

        $total = $query->count();

        $reports = $query->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        $data = $reports->map(function ($item) {
            return [
                'id' => $item->id,
                'kode' => $item->kode_laporan,
                'name' => $item->name,
                'location' => $item->location,
                'ruang' => $item->ruang,
                'instansi' => $item->instansi,
                'tanggal' => $item->created_at->format('Y-m-d'),
                'status' => $item->status,
            ];
        });

        return response()->json([
            'data' => $data,
            'total' => $total,
        ]);
    }

    public function statistik()
    {
        $userInstansi = Auth::user()->instansi;
        $isAdmin = strtolower($userInstansi) === 'admin';

        try {
            $statusList = ['Verifikasi', 'Proses', 'Gagal', 'Selesai'];

            $pieRaw = ReportModel::selectRaw('status, instansi, COUNT(*) as value')
                ->when(!$isAdmin, fn($q) => $q->where('instansi', $userInstansi))
                ->groupBy('status', 'instansi')
                ->get();

            $instansiList = $pieRaw->pluck('instansi')->unique();
            $pie = [];

            foreach ($instansiList as $instansi) {
                foreach ($statusList as $status) {
                    $found = $pieRaw->first(
                        fn($item) => $item->instansi === $instansi && $item->status === $status
                    );

                    $pie[] = [
                        'name' => $status,
                        'instansi' => $instansi,
                        'value' => $found ? (int) $found->value : 0,
                    ];
                }
            }

            $harian = ReportModel::selectRaw("
                DATE(created_at) as tanggal,
                " . (!$isAdmin ? "instansi," : "") . "
                SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) as selesai,
                SUM(CASE WHEN status = 'Gagal' THEN 1 ELSE 0 END) as gagal,
                SUM(CASE WHEN status = 'Proses' THEN 1 ELSE 0 END) as proses,
                SUM(CASE WHEN status = 'Verifikasi' THEN 1 ELSE 0 END) as verifikasi
            ")
                ->when(!$isAdmin, fn($q) => $q->where('instansi', $userInstansi))
                ->groupByRaw($isAdmin ? 'DATE(created_at)' : 'DATE(created_at), instansi')
                ->orderBy('tanggal')
                ->get();

            $areaRaw = ReportModel::selectRaw("
                DATE(created_at) as tanggal,
                " . (!$isAdmin ? "instansi," : "") . "
                SUM(CASE WHEN status = 'Selesai' THEN 1 ELSE 0 END) as selesai,
                SUM(CASE WHEN status = 'Gagal' THEN 1 ELSE 0 END) as gagal,
                SUM(CASE WHEN status = 'Proses' THEN 1 ELSE 0 END) as proses,
                SUM(CASE WHEN status = 'Verifikasi' THEN 1 ELSE 0 END) as verifikasi
            ")
                ->when(!$isAdmin, fn($q) => $q->where('instansi', $userInstansi))
                ->whereDate('created_at', '>=', now()->subDays(3)->toDateString())
                ->groupByRaw($isAdmin ? 'DATE(created_at)' : 'DATE(created_at), instansi')
                ->orderBy('tanggal')
                ->get();

            $area = $areaRaw->map(function ($item) use ($isAdmin) {
                return [
                    'tanggal' => $item->tanggal,
                    'label' => Carbon::parse($item->tanggal)->format('d F Y'),
                    'selesai' => (int) $item->selesai,
                    'gagal' => (int) $item->gagal,
                    'proses' => (int) $item->proses,
                    'verifikasi' => (int) $item->verifikasi,
                    'instansi' => $isAdmin ? 'admin' : $item->instansi,
                ];
            });

            if ($isAdmin) {
                $location = ReportModel::select('location')
                    ->selectRaw('COUNT(*) as total')
                    ->groupBy('location')
                    ->get();
            } else {
                $location = ReportModel::select('location', 'instansi')
                    ->selectRaw('COUNT(*) as total')
                    ->where('instansi', $userInstansi)
                    ->groupBy('location', 'instansi')
                    ->get();
            }

            return response()->json([
                'area' => $area,
                'harian' => $harian,
                'bar' => $location,
                'pie' => $pie,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:reports,id',
            'status' => 'required|string|in:Verifikasi,Proses,Gagal,Selesai',
        ]);

        $report = ReportModel::find($request->id);

        $report->status = $request->status;
        $report->save();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:25',
            'username' => 'nullable|string|max:25',
            'instansi' => 'required|string',
            'location' => 'required|string',
            'ruang' => 'nullable|string|max:255',
            'message' => 'required|string',
            'attachments.*' => 'nullable|file|max:2048',
            'attachments' => 'nullable|array|max:3',
        ]);

        $paths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $paths[] = $file->store('attachments', 'public');
            }
        }

        ReportModel::create([
            'kode_laporan' => strtoupper(Str::random(10)),
            'name'          => $validated['name'],
            'username'      => $validated['username'] ?? null,
            'instansi'      => $validated['instansi'],
            'location'      => $validated['location'],
            'ruang'         => $validated['ruang'] ?? null,
            'message'       => $validated['message'],
            'attachment'    => $paths,
        ]);

        return back()->with('success', 'Laporan berhasil dikirim.');
    }

    public function search(Request $request)
    {
        $page = (int) $request->query('page', 1);
        $limit = (int) $request->query('limit', 3);

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

        if ($request->filled('name') && $request->filled('instansi')) {
            $name = strtolower(trim($request->name));
            $instansi = strtolower(trim($request->instansi));

            $reports = ReportModel::when($instansi !== 'all', fn($q) =>
            $q->whereRaw('LOWER(instansi) = ?', [$instansi]))
                ->whereRaw('LOWER(name) LIKE ?', ["%{$name}%"])
                ->orderByDesc('created_at')
                ->paginate($limit, ['*'], 'page', $page);

            if ($reports->isEmpty()) {
                return response()->json(['message' => 'Tidak ada laporan ditemukan'], 404);
            }

            $formattedData = $reports->getCollection()->map(function ($r) {
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
            });

            return response()->json([
                'data' => $formattedData,
                'current_page' => $reports->currentPage(),
                'last_page' => $reports->lastPage(),
                'per_page' => $reports->perPage(),
                'total' => $reports->total(),
            ]);
        }
    }

    public function show($id)
    {
        $report = ReportModel::findOrFail($id);

        return Inertia::render('report-detail', [
            'report' => [
                'id' => $report->id,
                'kode_laporan' => $report->kode_laporan,
                'nama' => $report->name,
                'username' => $report->username ?? '-',
                'instansi' => $report->instansi,
                'location' => $report->location ?? '-',
                'ruang' => $report->ruang ?? '-',
                'status' => $report->status,
                'deskripsi' => $report->message,
                'tanggal' => $report->created_at->format('d-m-Y'),
                'lampiran' => $report->attachment ?? [],
            ]
        ]);
    }
}
