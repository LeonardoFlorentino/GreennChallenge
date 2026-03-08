<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('producers', function (Blueprint $table) {
            $table->string('imageUrl', 2048)->nullable()->change();
            $table->string('category', 255)->nullable()->change();
            $table->integer('last_sale_value')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('producers', function (Blueprint $table) {
            $table->string('imageUrl', 2048)->nullable(false)->change();
            $table->string('category', 255)->nullable(false)->change();
            $table->integer('last_sale_value')->nullable(false)->change();
        });
    }
};
