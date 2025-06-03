# Aplikasi-Helpdesk
Pengembangan Sistem Informasi Pengaduan Universitas Pamulang

Langkah Jalankan program

1. composer install => untuk Install PHP dependencies (Laravel)
    
2. npm install => untuk Install JS dependencies (React, Inertia, dll)

3. cp .env.example .env => untuk Copy .env dari contoh

4. php artisan key:generate untuk => membuat APP_KEY di file .env, yang dipakai Laravel

5. php artisan migrate => untuk Jalankan migration (jika ada database)

jika sudah maka jalankan

1. npm run dev => untuk Build frontend (React/Inertia)

2. php artisan serve => untuk jalankan server-nya
