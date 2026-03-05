<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('producers', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('document')->unique();
                $table->enum('status', ['active', 'inactive'])->default('active');
                $table->integer('commission');
                $table->string('imageUrl');
                $table->integer('followers_instagram');
                $table->float('relevance_score');
                $table->boolean('is_trending')->default(false);
                $table->string('category');
                $table->unsignedBigInteger('direct_sales_last_year');
                $table->unsignedBigInteger('indirect_sales_last_year');
                $table->unsignedBigInteger('direct_sales_last_month');
                $table->unsignedBigInteger('indirect_sales_last_month');
                $table->unsignedBigInteger('last_sale_value');
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producers');
    }
};
