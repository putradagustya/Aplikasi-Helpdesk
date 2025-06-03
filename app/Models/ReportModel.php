<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportModel extends Model
{
    protected $table = 'reports';

    protected $fillable = [
        'kode_laporan',
        'name',
        'username',
        'instansi',
        'location',
        'ruang',
        'message',
        'attachment',
        'status',
    ];

    protected $casts = [
        'attachment' => 'array',
    ];
}
