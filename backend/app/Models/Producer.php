<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'document',
        'status',
        'commission',
        'imageUrl',
        'followers_instagram',
        'is_trending',
        'category',
        'direct_sales_last_year',
        'indirect_sales_last_year',
        'direct_sales_last_month',
        'indirect_sales_last_month',
        'last_sale_value',
    ];

    protected $appends = ['relevance_score'];

    protected $casts = [
        'commission' => 'integer',
        'followers_instagram' => 'integer',
        'is_trending' => 'boolean',
        'direct_sales_last_year' => 'integer',
        'indirect_sales_last_year' => 'integer',
        'direct_sales_last_month' => 'integer',
        'indirect_sales_last_month' => 'integer',
        'last_sale_value' => 'integer',
    ];

    public function getRelevanceScoreAttribute(): float
    {
        $salesYear = ($this->direct_sales_last_year ?? 0) + ($this->indirect_sales_last_year ?? 0);
        $salesMonth = ($this->direct_sales_last_month ?? 0) + ($this->indirect_sales_last_month ?? 0);
        $followers = $this->followers_instagram ?? 0;
        $trending = $this->is_trending ? 1 : 0;

        $scoreMonth = min(100, ($salesMonth / 5_000_000) * 100);
        $scoreYear = min(100, ($salesYear / 100_000_000) * 100);
        $scoreFollowers = (log10($followers + 1) / log10(20_000_000)) * 100;
        $scoreTrending = $trending * 100;

        $score = (0.30 * $scoreMonth)
            + (0.25 * $scoreYear)
            + (0.25 * $scoreFollowers)
            + (0.20 * $scoreTrending);

        return round(max(0, min(100, $score)), 1);
    }
}
