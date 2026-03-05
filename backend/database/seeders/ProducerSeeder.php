<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producer;

class ProducerSeeder extends Seeder
{
    public function run(): void
    {
        $producers = [
            [
                "name"                => "Carol Mansur",
                "email"               => "carol-mansur@produtora.com",
                "document"            => "123.456.789-00",
                "status"              => "active",
                "commission"          => 30,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/DGwmfmaFiaGsH8hNyaLmCM2LzhZbANKxI3VhskGf.webp",
                "created_at"          => "2025-01-10",
                "followers_instagram" => 1235,           // ← 1.235
                "relevance_score"     => 92.5,
                "is_trending"         => true,
            ],
            [
                "name"                => "Matheus Sanfer",
                "email"               => "matheus-sanfer@produtor.com",
                "document"            => "987.654.321-00",
                "status"              => "inactive",
                "commission"          => 40,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/fUnUqfQFbyW4nLg14ejaGU6A4afxV0a9N8Z4pTUv.webp",
                "created_at"          => "2025-01-15",
                "followers_instagram" => 62600,          // ← 62,6 mil
                "relevance_score"     => 78.3,
                "is_trending"         => false,
            ],
            [
                "name"                => "Gabriel Rockenbach",
                "email"               => "gabriel-rockenbach@produtor.com",
                "document"            => "111.222.333-44",
                "status"              => "active",
                "commission"          => 35,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/9N7KZOmzZ77NssEJsdQ109KcKHXQDXMcxPuR7g87.webp",
                "created_at"          => "2025-02-01",
                "followers_instagram" => 78100,          // ← 78,1 mil
                "relevance_score"     => 81.7,
                "is_trending"         => false,
            ],
            [
                "name"                => "Pablo Marçal",
                "email"               => "pablo-marçal@produtor.com",
                "document"            => "555.666.777-88",
                "status"              => "active",
                "commission"          => 25,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/WHNLo6jMqBOZoHO0iFFwi3bhAz28DlrRGANESbD0.webp",
                "created_at"          => "2025-02-10",
                "followers_instagram" => 13100000,       // ← 13,1 milhões
                "relevance_score"     => 88.9,
                "is_trending"         => true,
            ],
            [
                "name"                => "Bel Guerra",
                "email"               => "bel-guerra@produtor.com",
                "document"            => "999.888.777-66",
                "status"              => "inactive",
                "commission"          => 50,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/X3FLCEjBHF2BYtbfdo3wnlQ1ickJhAEJeM92neoI.webp",
                "created_at"          => "2025-02-18",
                "followers_instagram" => 149000,         // ← 149 mil
                "relevance_score"     => 70.4,
                "is_trending"         => false,
            ],
            [
                "name"                => "Henrique Marinho",
                "email"               => "henrique-marinho@produtora.com",
                "document"            => "321.654.987-00",
                "status"              => "active",
                "commission"          => 20,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/8ji7jQXfUCrnHN1SnwThMljrWpsicPRS7X6oMEwa.webp",
                "created_at"          => "2025-02-22",
                "followers_instagram" => 101000,         // ← 101 mil
                "relevance_score"     => 95.2,
                "is_trending"         => true,
            ],
            [
                "name"                => "Kau Miranda",
                "email"               => "kau-miranda@produtor.com",
                "document"            => "741.852.963-11",
                "status"              => "active",
                "commission"          => 45,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/wt6BVxtH5o9w4JocjcjKIvYolphaaC3nd50kQa8T.webp",
                "created_at"          => "2025-02-25",
                "followers_instagram" => 268000,         // ← 268 mil
                "relevance_score"     => 84.6,
                "is_trending"         => false,
            ],
            [
                "name"                => "Christian Barbosa",
                "email"               => "christian-barbosa@produtora.com",
                "document"            => "852.963.741-22",
                "status"              => "inactive",
                "commission"          => 30,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/OPZCv2bCJWZSpIeDtHyBlpZ1rWH7baFYwOtxcs5C.webp",
                "created_at"          => "2025-03-01",
                "followers_instagram" => 569000,         // ← 569 mil
                "relevance_score"     => 90.1,
                "is_trending"         => true,
            ],
            [
                "name"                => "Rhuan Cavalcante",
                "email"               => "rhuan-cavalcante@produtor.com",
                "document"            => "159.357.258-33",
                "status"              => "active",
                "commission"          => 60,
                "imageUrl"            => "https://s3.gdigital.com.br/gdigital/24/QfbHbZayoB79OTbCXVaXpRjcBwcHro1Fo9u5CYxi.webp",
                "created_at"          => "2025-03-03",
                "followers_instagram" => 73900,          // ← 73,9 mil
                "relevance_score"     => 76.8,
                "is_trending"         => false,
            ],
        ];
        foreach ($producers as $producer) {
            Producer::create($producer);
        }
    }
}
