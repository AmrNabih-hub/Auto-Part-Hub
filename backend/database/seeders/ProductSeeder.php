<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Bosch ICON Wiper Blades (Set of 2)',
                'description' => 'Experience superior wiping performance with Bosch ICON Wiper Blades. Featuring an exclusive FX dual rubber technology, these blades provide 40% longer life than other premium blades.',
                'price' => 42.99,
                'stock' => 50,
            ],
            [
                'name' => 'Akebono Ceramic Brake Pads (Front Set)',
                'description' => 'Akebono Ceramic Brake Pads offer ultra-quiet braking performance and significantly reduced brake dust, keeping your wheels cleaner.',
                'price' => 75.50,
                'stock' => 30,
            ],
            [
                'name' => 'K&N High-Flow Air Filter',
                'description' => 'Boost your engine\'s performance and efficiency with the K&N High-Flow Air Filter. Designed to increase horsepower and acceleration.',
                'price' => 54.95,
                'stock' => 25,
            ],
            [
                'name' => 'Monroe Quick-Strut Complete Strut Assembly',
                'description' => 'Restore your vehicle\'s ride height, handling, and comfort with the Monroe Quick-Strut. This complete assembly includes the strut, coil spring, strut mount, boot, bumper, and isolator.',
                'price' => 189.99,
                'stock' => 15,
            ],
            [
                'name' => 'ACDelco Professional AGM Battery (Group 48)',
                'description' => 'The ACDelco Professional AGM (Absorbed Glass Mat) Battery delivers reliable starting power and extended cycle life.',
                'price' => 210.99,
                'stock' => 20,
            ],
            [
                'name' => 'NGK Iridium Spark Plugs (Set of 4)',
                'description' => 'NGK Iridium Spark Plugs are engineered for superior ignitability, long service life, and optimal performance.',
                'price' => 39.99,
                'stock' => 100,
            ],
            [
                'name' => 'Michelin Defender LTX M/S All-Season Tire',
                'description' => 'The Michelin Defender LTX M/S is a premium all-season tire designed for light trucks, SUVs, and crossovers.',
                'price' => 220.00,
                'stock' => 40,
            ],
            [
                'name' => 'Denso First Time Fit Oxygen Sensor',
                'description' => 'Restore proper engine performance and fuel economy with a Denso First Time Fit Oxygen Sensor.',
                'price' => 62.30,
                'stock' => 35,
            ],
            [
                'name' => 'Gates Serpentine Belt',
                'description' => 'The Gates Serpentine Belt delivers reliable power transmission to your engine\'s accessories.',
                'price' => 28.99,
                'stock' => 60,
            ],
            [
                'name' => 'Mevotech Supreme Ball Joint (Front Lower)',
                'description' => 'The Mevotech Supreme Ball Joint provides durable and reliable steering and suspension performance.',
                'price' => 45.20,
                'stock' => 25,
            ],
            [
                'name' => 'TYC Headlight Assembly (Passenger Side)',
                'description' => 'Replace your damaged or cloudy headlight with a TYC Headlight Assembly. Designed as a direct OEM replacement.',
                'price' => 125.00,
                'stock' => 10,
            ],
            [
                'name' => 'Moog Wheel Bearing and Hub Assembly (Front)',
                'description' => 'The Moog Wheel Bearing and Hub Assembly ensures smooth wheel rotation and eliminates noise caused by worn bearings.',
                'price' => 88.49,
                'stock' => 18,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
