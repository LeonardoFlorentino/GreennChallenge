<?php

namespace Tests\Unit;

use App\Models\Producer;
use Tests\TestCase;

class ProducerTest extends TestCase
{
    public function test_it_calculates_relevance_score(): void
    {
        $producer = new Producer([
            'followers_instagram' => 100000,
            'is_trending' => false,
            'direct_sales_last_year' => 19500000,
            'indirect_sales_last_year' => 13400000,
            'direct_sales_last_month' => 720000,
            'indirect_sales_last_month' => 450000,
        ]);

        $this->assertEqualsWithDelta(32.4, $producer->relevance_score, 0.1);
    }

    public function test_it_limits_relevance_score_to_100(): void
    {
        $producer = new Producer([
            'followers_instagram' => 1000000000,
            'is_trending' => true,
            'direct_sales_last_year' => 999999999,
            'indirect_sales_last_year' => 999999999,
            'direct_sales_last_month' => 999999999,
            'indirect_sales_last_month' => 999999999,
        ]);

        $this->assertLessThanOrEqual(100, $producer->relevance_score);
    }
}
