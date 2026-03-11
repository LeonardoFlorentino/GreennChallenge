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
                "name"                      => "Carol Mansur",
                "email"                     => "carol-mansur@produtora.com",
                "document"                  => "123.456.789-00",
                "status"                    => "active",
                "commission"                => 30,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/DGwmfmaFiaGsH8hNyaLmCM2LzhZbANKxI3VhskGf.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-01-10",
                "followers_instagram"       => 1235,
                "is_trending"               => true,
                "category"                  => "Emagrecimento e Saúde",
                "direct_sales_last_year"    => 24800000,   // Ano anterior (2025)
                "indirect_sales_last_year"  => 17500000,
                "direct_sales_last_month"   => 1420000,
                "indirect_sales_last_month" => 980000,
                "last_sale_value"           => 285000,     // proporcional
            ],
            [
                "name"                      => "Matheus Sanfer",
                "email"                     => "matheus-sanfer@produtor.com",
                "document"                  => "987.654.321-00",
                "status"                    => "inactive",
                "commission"                => 40,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/fUnUqfQFbyW4nLg14ejaGU6A4afxV0a9N8Z4pTUv.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-01-15",
                "followers_instagram"       => 62600,
                "is_trending"               => false,
                "category"                  => "Finanças e Investimentos",
                "direct_sales_last_year"    => 18700000,
                "indirect_sales_last_year"  => 24500000,
                "direct_sales_last_month"   => 650000,
                "indirect_sales_last_month" => 1870000,
                "last_sale_value"           => 195000,     // proporcional
            ],
            [
                "name"                      => "Gabriel Rockenbach",
                "email"                     => "gabriel-rockenbach@produtor.com",
                "document"                  => "111.222.333-44",
                "status"                    => "active",
                "commission"                => 35,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/9N7KZOmzZ77NssEJsdQ109KcKHXQDXMcxPuR7g87.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-02-01",
                "followers_instagram"       => 78100,
                "is_trending"               => false,
                "category"                  => "Desenvolvimento Pessoal",
                "direct_sales_last_year"    => 35600000,
                "indirect_sales_last_year"  => 21900000,
                "direct_sales_last_month"   => 980000,
                "indirect_sales_last_month" => 1240000,
                "last_sale_value"           => 320000,     // proporcional
            ],
            [
                "name"                      => "Pablo Marçal",
                "email"                     => "pablo-marçal@produtor.com",
                "document"                  => "555.666.777-88",
                "status"                    => "active",
                "commission"                => 25,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/WHNLo6jMqBOZoHO0iFFwi3bhAz28DlrRGANESbD0.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-02-10",
                "followers_instagram"       => 13100000,
                "is_trending"               => true,
                "category"                  => "Mentoria e Negócios",
                "direct_sales_last_year"    => 95200000,   // Ano anterior (2025)
                "indirect_sales_last_year"  => 67800000,
                "direct_sales_last_month"   => 3850000,
                "indirect_sales_last_month" => 2140000,
                "last_sale_value"           => 24800000,   // 🔥 EXTRAORDINÁRIO (bem acima do esperado)
            ],
            [
                "name"                      => "Bel Guerra",
                "email"                     => "bel-guerra@produtor.com",
                "document"                  => "999.888.777-66",
                "status"                    => "inactive",
                "commission"                => 50,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/X3FLCEjBHF2BYtbfdo3wnlQ1ickJhAEJeM92neoI.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-02-18",
                "followers_instagram"       => 149000,
                "is_trending"               => false,
                "category"                  => "Emagrecimento Feminino",
                "direct_sales_last_year"    => 14200000,
                "indirect_sales_last_year"  => 19800000,
                "direct_sales_last_month"   => 1240000,
                "indirect_sales_last_month" => 890000,
                "last_sale_value"           => 265000,     // proporcional
            ],
            [
                "name"                      => "Henrique Marinho",
                "email"                     => "henrique-marinho@produtora.com",
                "document"                  => "321.654.987-00",
                "status"                    => "active",
                "commission"                => 20,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/8ji7jQXfUCrnHN1SnwThMljrWpsicPRS7X6oMEwa.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-02-22",
                "followers_instagram"       => 101000,
                "is_trending"               => true,
                "category"                  => "Marketing Digital",
                "direct_sales_last_year"    => 68400000,
                "indirect_sales_last_year"  => 42100000,
                "direct_sales_last_month"   => 2890000,
                "indirect_sales_last_month" => 1540000,
                "last_sale_value"           => 16800000,   // 🔥 EXTRAORDINÁRIO (boom gigante)
            ],
            [
                "name"                      => "Kau Miranda",
                "email"                     => "kau-miranda@produtor.com",
                "document"                  => "741.852.963-11",
                "status"                    => "active",
                "commission"                => 45,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/wt6BVxtH5o9w4JocjcjKIvYolphaaC3nd50kQa8T.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-02-25",
                "followers_instagram"       => 268000,
                "is_trending"               => false,
                "category"                  => "Relacionamento e Sedução",
                "direct_sales_last_year"    => 42100000,
                "indirect_sales_last_year"  => 28900000,
                "direct_sales_last_month"   => 1680000,
                "indirect_sales_last_month" => 980000,
                "last_sale_value"           => 420000,     // proporcional
            ],
            [
                "name"                      => "Christian Barbosa",
                "email"                     => "christian-barbosa@produtora.com",
                "document"                  => "852.963.741-22",
                "status"                    => "inactive",
                "commission"                => 30,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/OPZCv2bCJWZSpIeDtHyBlpZ1rWH7baFYwOtxcs5C.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-03-01",
                "followers_instagram"       => 569000,
                "is_trending"               => true,
                "category"                  => "Produtividade e Gestão",
                "direct_sales_last_year"    => 51800000,
                "indirect_sales_last_year"  => 34700000,
                "direct_sales_last_month"   => 1980000,
                "indirect_sales_last_month" => 1320000,
                "last_sale_value"           => 12400000,   // 🔥 EXTRAORDINÁRIO (venda fora da curva)
            ],
            [
                "name"                      => "Rhuan Cavalcante",
                "email"                     => "rhuan-cavalcante@produtor.com",
                "document"                  => "159.357.258-33",
                "status"                    => "active",
                "commission"                => 60,
                "imageUrl"                  => "https://s3.gdigital.com.br/gdigital/24/QfbHbZayoB79OTbCXVaXpRjcBwcHro1Fo9u5CYxi.webp",
                "image_url_has_name"        => true,
                "created_at"                => "2025-03-03",
                "followers_instagram"       => 73900,
                "is_trending"               => false,
                "category"                  => "Física e Performance",
                "direct_sales_last_year"    => 19500000,
                "indirect_sales_last_year"  => 13400000,
                "direct_sales_last_month"   => 720000,
                "indirect_sales_last_month" => 450000,
                "last_sale_value"           => 185000,     // proporcional
            ],
        ];

        foreach ($producers as $producer) {
            Producer::firstOrCreate(
                ['email' => $producer['email']], // evita duplicação
                $producer
            );
        }
    }
}

