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

    public function test_it_detects_direct_skyrocketing_sales(): void
    {
        // Direct yearly: 19,500,000
        // Average monthly direct: 1,625,000
        // Current direct monthly: 720,000 (44.3% of average) -> NOT skyrocketing
        $producer = new Producer([
            'direct_sales_last_year' => 19500000,
            'indirect_sales_last_year' => 13400000,
            'direct_sales_last_month' => 720000,
            'indirect_sales_last_month' => 450000,
        ]);

        $this->assertFalse($producer->direct_skyrocketing_sales);
    }

    public function test_it_detects_direct_skyrocketing_sales_when_monthly_exceeds_threshold(): void
    {
        // Direct yearly: 15,000,000
        // Average monthly direct: 1,250,000
        // Current direct monthly: 2,500,000 (200% of average) -> SKYROCKETING
        $producer = new Producer([
            'direct_sales_last_year' => 15000000,
            'indirect_sales_last_year' => 9000000,
            'direct_sales_last_month' => 2500000,
            'indirect_sales_last_month' => 500000,
        ]);

        $this->assertTrue($producer->direct_skyrocketing_sales);
    }

    public function test_it_detects_indirect_skyrocketing_sales(): void
    {
        // Indirect yearly: 13,400,000
        // Average monthly indirect: 1,116,666.67
        // Current indirect monthly: 450,000 (40.3% of average) -> NOT skyrocketing
        $producer = new Producer([
            'direct_sales_last_year' => 19500000,
            'indirect_sales_last_year' => 13400000,
            'direct_sales_last_month' => 720000,
            'indirect_sales_last_month' => 450000,
        ]);

        $this->assertFalse($producer->indirect_skyrocketing_sales);
    }

    public function test_it_detects_indirect_skyrocketing_sales_when_monthly_exceeds_threshold(): void
    {
        // Indirect yearly: 9,000,000
        // Average monthly indirect: 750,000
        // Current indirect monthly: 2,000,000 (266% of average) -> SKYROCKETING
        $producer = new Producer([
            'direct_sales_last_year' => 15000000,
            'indirect_sales_last_year' => 9000000,
            'direct_sales_last_month' => 500000,
            'indirect_sales_last_month' => 2000000,
        ]);

        $this->assertTrue($producer->indirect_skyrocketing_sales);
    }

    public function test_it_returns_false_when_no_yearly_data(): void
    {
        $producer = new Producer([
            'direct_sales_last_year' => 0,
            'indirect_sales_last_year' => 0,
            'direct_sales_last_month' => 1000000,
            'indirect_sales_last_month' => 500000,
        ]);

        $this->assertFalse($producer->direct_skyrocketing_sales);
        $this->assertFalse($producer->indirect_skyrocketing_sales);
    }
}
