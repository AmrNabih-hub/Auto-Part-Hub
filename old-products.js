const partsData = {
    "Wiper Blades": [
        {
            id: 1,
            name: 'Bosch ICON Wiper Blades (Set of 2)',
            dealer: 'AutoParts Pro',
            description: 'Experience superior wiping performance with Bosch ICON Wiper Blades. Featuring an exclusive FX dual rubber technology, these blades provide 40% longer life than other premium blades, ensuring excellent visibility in all weather conditions. Their bracketless design and patented tension spring create uniform pressure along the entire blade length for consistent, streak-free wipes.',
            compatibility: 'Universal fit for most modern vehicles (check specific sizes for exact fit).',
            price: 42.99,
            images: [
                'https://picsum.photos/400/300?random=1',
                'https://picsum.photos/400/300?random=2',
                'https://picsum.photos/400/300?random=3'
            ],
            variants: []
        }
    ],
    "Brakes": [
        {
            id: 2,
            name: 'Akebono Ceramic Brake Pads (Front Set)',
            dealer: 'Braking Solutions Inc.',
            description: 'Akebono Ceramic Brake Pads offer ultra-quiet braking performance and significantly reduced brake dust, keeping your wheels cleaner. Engineered for superior stopping power and long pad life, these ceramic formulations provide consistent braking across a wide range of temperatures. Ideal for daily driving and city commutes.',
            compatibility: 'Toyota Camry (2018-2024), Honda Accord (2018-2024), Nissan Altima (2019-2024).',
            price: 75.50,
            images: [
                'https://picsum.photos/400/300?random=4',
                'https://picsum.photos/400/300?random=5',
                'https://picsum.photos/400/300?random=6'
            ],
            variants: []
        }
    ],
    "Engine & Performance": [
        {
            id: 3,
            name: 'K&N High-Flow Air Filter',
            dealer: 'Performance Auto Group',
            description: 'Boost your engine\'s performance and efficiency with the K&N High-Flow Air Filter. Designed to increase horsepower and acceleration, this washable and reusable filter uses a pleated cotton gauze material to provide excellent filtration while allowing for maximum airflow. It\'s a simple, drop-in replacement for your stock filter.',
            compatibility: 'Ford F-150 (2015-2020), Chevrolet Silverado 1500 (2014-2018), Ram 1500 (2013-2018).',
            price: 54.95,
            images: [
                'https://picsum.photos/400/300?random=7',
                'https://picsum.photos/400/300?random=8',
                'https://picsum.photos/400/300?random=9'
            ],
            variants: []
        },
        {
            id: 6,
            name: 'NGK Iridium Spark Plugs (Set of 4)',
            dealer: 'Ignition Specialists',
            description: 'NGK Iridium Spark Plugs are engineered for superior ignitability, long service life, and optimal performance. The fine iridium tip ensures consistent and stable spark, improving fuel efficiency and reducing emissions. A premium upgrade for enhanced engine response.',
            compatibility: 'Subaru Impreza (2012-2016), Mazda 3 (2014-2018), Hyundai Elantra (2011-2016).',
            price: 39.99,
            images: [
                'https://picsum.photos/400/300?random=10',
                'https://picsum.photos/400/300?random=11',
                'https://picsum.photos/400/300?random=12'
            ],
            variants: []
        },
        {
            id: 17,
            name: 'Wix Spin-On Oil Filter',
            dealer: 'Filtration Supply',
            description: 'Ensure clean engine oil and optimal engine life with the Wix Spin-On Oil Filter. Engineered with advanced filtration media, it effectively captures contaminants like dirt and metal particles, protecting critical engine components. Easy spin-on installation for routine maintenance.',
            compatibility: 'Universal fit for many vehicles (check specific part number for your vehicle).',
            price: 12.75,
            images: [
                'https://picsum.photos/400/300?random=13',
                'https://picsum.photos/400/300?random=14',
                'https://picsum.photos/400/300?random=15'
            ],
            variants: []
        }
    ],
    "Suspension & Steering": [
        {
            id: 4,
            name: 'Monroe Quick-Strut Complete Strut Assembly (Rear Left)',
            dealer: 'Suspension World',
            description: 'Restore your vehicle\'s ride height, handling, and comfort with the Monroe Quick-Strut. This complete assembly includes the strut, coil spring, strut mount, boot, bumper, and isolator, making installation quicker and easier as it comes pre-assembled. Designed for a direct fit, it eliminates the need for a spring compressor.',
            compatibility: 'Honda Civic (2012-2015), Toyota Corolla (2014-2018).',
            price: 189.99,
            images: [
                'https://picsum.photos/400/300?random=16',
                'https://picsum.photos/400/300?random=17',
                'https://picsum.photos/400/300?random=18'
            ],
            variants: []
        },
        {
            id: 10,
            name: 'Mevotech Supreme Ball Joint (Front Lower)',
            dealer: 'Steering & Suspension Pros',
            description: 'The Mevotech Supreme Ball Joint provides durable and reliable steering and suspension performance. Engineered with improved design features for enhanced strength and longevity, it ensures precise handling and a smoother ride. Comes with all necessary hardware for installation.',
            compatibility: 'Chevrolet Impala (2000-2005), Pontiac Grand Prix (1997-2003).',
            price: 45.20,
            images: [
                'https://picsum.photos/400/300?random=19',
                'https://picsum.photos/400/300?random=20',
                'https://picsum.photos/400/300?random=21'
            ],
            variants: []
        },
        {
            id: 16,
            name: 'KYB Excel-G Gas Strut (Front Right)',
            dealer: 'Ride Control Solutions',
            description: 'Restore your vehicle\'s original ride comfort and control with the KYB Excel-G Gas Strut. Designed to restore OE performance characteristics, this twin-tube, gas-pressurized strut provides excellent handling and stability without harshness. Ideal for replacing worn-out OEM struts.',
            compatibility: 'Toyota Corolla (2003-2008), Honda Civic (2001-2005).',
            price: 95.00,
            images: [
                'https://picsum.photos/400/300?random=22',
                'https://picsum.photos/400/300?random=23',
                'https://picsum.photos/400/300?random=24'
            ],
            variants: []
        }
    ],
    "Electrical & Lighting": [
        {
            id: 5,
            name: 'ACDelco Professional AGM Battery (Group 48)',
            dealer: 'PowerUp Auto',
            description: 'The ACDelco Professional AGM (Absorbed Glass Mat) Battery delivers reliable starting power and extended cycle life. Its fully sealed, maintenance-free design provides exceptional resistance to vibration and leaks. Ideal for vehicles with high electrical demands and start-stop technology.',
            compatibility: 'BMW 3 Series (2006-2013), Mercedes-Benz C-Class (2008-2014), Audi A4 (2009-2016).',
            price: 210.99,
            images: [
                'https://picsum.photos/400/300?random=25',
                'https://picsum.photos/400/300?random=26',
                'https://picsum.photos/400/300?random=27'
            ],
            variants: []
        },
        {
            id: 11,
            name: 'TYC Headlight Assembly (Passenger Side)',
            dealer: 'Lighting & Body Parts',
            description: 'Replace your damaged or cloudy headlight with a TYC Headlight Assembly. Designed as a direct OEM replacement, it ensures a perfect fit and restored illumination performance for safer night driving. Includes housing, lens, and internal components (bulbs sold separately).',
            compatibility: 'Honda Civic (2006-2011), Toyota Corolla (2009-2013).',
            price: 125.00,
            images: [
                'https://picsum.photos/400/300?random=28',
                'https://picsum.photos/400/300?random=29',
                'https://picsum.photos/400/300?random=30'
            ],
            variants: []
        }
    ],
    "Tires & Wheels": [
        {
            id: 7,
            name: 'Michelin Defender LTX M/S All-Season Tire (265/70R17)',
            dealer: 'Tire Hub',
            description: 'The Michelin Defender LTX M/S is a premium all-season tire designed for light trucks, SUVs, and crossovers. It offers excellent longevity, superb wet and dry grip, and comfortable ride quality. Maximize your vehicle\'s performance with a tire built for durability and year-round traction.',
            compatibility: 'Ford F-150, Chevrolet Silverado 1500, Toyota Tacoma, Jeep Wrangler (specific trims).',
            price: 220.00,
            images: [
                'https://picsum.photos/400/300?random=31',
                'https://picsum.photos/400/300?random=32',
                'https://picsum.photos/400/300?random=33'
            ],
            variants: []
        },
        {
            id: 12,
            name: 'Moog Wheel Bearing and Hub Assembly (Front)',
            dealer: 'Drivetrain Direct',
            description: 'The Moog Wheel Bearing and Hub Assembly ensures smooth wheel rotation and eliminates noise caused by worn bearings. Engineered for durability and easy installation, this pre-assembled unit helps maintain proper wheel alignment and reliable braking performance.',
            compatibility: 'Ford Focus (2000-2011), Mazda 3 (2004-2013).',
            price: 88.49,
            images: [
                'https://picsum.photos/400/300?random=34',
                'https://picsum.photos/400/300?random=35',
                'https://picsum.photos/400/300?random=36'
            ],
            variants: []
        }
    ],
    "Exhaust & Emission": [
        {
            id: 8,
            name: 'Denso First Time Fit Oxygen Sensor',
            dealer: 'Emission Controls Direct',
            description: 'Restore proper engine performance and fuel economy with a Denso First Time Fit Oxygen Sensor. Manufactured to meet or exceed OEM specifications, this sensor provides accurate readings to the engine\'s computer, ensuring optimal air/fuel mixture and reduced emissions. Easy installation with direct-fit connectors.',
            compatibility: 'Honda Civic (2006-2011), Toyota Corolla (2003-2008), Ford Focus (2005-2011).',
            price: 62.30,
            images: [
                'https://picsum.photos/400/300?random=37',
                'https://picsum.photos/400/300?random=38',
                'https://picsum.photos/400/300?random=39'
            ],
            variants: []
        },
        {
            id: 15,
            name: 'MagnaFlow Catalytic Converter (Universal)',
            dealer: 'Exhaust Systems Co.',
            description: 'The MagnaFlow Catalytic Converter provides efficient emission reduction and unrestricted exhaust flow. This universal-fit converter requires welding for installation but offers a durable stainless steel construction for long-lasting performance and compliance with emissions regulations.',
            compatibility: 'Universal fit (requires fabrication and specific sizing for vehicle compatibility).',
            price: 175.00,
            images: [
                'https://picsum.photos/400/300?random=40',
                'https://picsum.photos/400/300?random=41',
                'https://picsum.photos/400/300?random=42'
            ],
            variants: []
        }
    ],
    "Drivetrain": [
        {
            id: 9,
            name: 'Gates Serpentine Belt',
            dealer: 'DriveTrain Solutions',
            description: 'The Gates Serpentine Belt delivers reliable power transmission to your engine\'s accessories. Constructed from advanced materials, it offers high resistance to cracking, slipping, and stretching, ensuring long-lasting performance and quiet operation. Essential for maintaining optimal function of your alternator, power steering, and A/C.',
            compatibility: 'Toyota RAV4 (2006-2012), Nissan Rogue (2008-2013), Hyundai Santa Fe (2007-2012).',
            price: 28.99,
            images: [
                'https://picsum.photos/400/300?random=43',
                'https://picsum.photos/400/300?random=44',
                'https://picsum.photos/400/300?random=45'
            ],
            variants: []
        }
    ],
    "Fuel System": [
        {
            id: 13,
            name: 'Spectra Premium Fuel Pump Module Assembly',
            dealer: 'Fuel System Experts',
            description: 'Restore proper fuel delivery to your engine with the Spectra Premium Fuel Pump Module Assembly. This complete unit includes the fuel pump, sending unit, float, and filter, providing a direct-fit replacement for reliable and efficient fuel supply. Tested for optimal performance.',
            compatibility: 'Chevrolet Silverado 1500 (1999-2004), GMC Sierra 1500 (1999-2004).',
            price: 135.80,
            images: [
                'https://picsum.photos/400/300?random=46',
                'https://picsum.photos/400/300?random=47',
                'https://picsum.photos/400/300?random=48'
            ],
            variants: []
        }
    ],
    "Engine Components": [
        {
            id: 14,
            name: 'Dorman OE Solutions Engine Oil Pan',
            dealer: 'Engine Components Store',
            description: 'Replace a corroded or damaged engine oil pan with the Dorman OE Solutions part. Designed to match the fit and function of the original equipment part, it ensures proper oil containment and protection for your engine. Includes drain plug and gasket (where applicable).',
            compatibility: 'Honda Accord (2003-2007), Acura TSX (2004-2008).',
            price: 85.40,
            images: [
                'https://picsum.photos/400/300?random=49',
                'https://picsum.photos/400/300?random=50',
                'https://picsum.photos/400/300?random=51'
            ],
            variants: []
        },
        {
            id: 18,
            name: 'Fel-Pro PermaDryPlus Valve Cover Gasket Set',
            dealer: 'Gasket Specialists',
            description: 'Prevent oil leaks and maintain engine integrity with the Fel-Pro PermaDryPlus Valve Cover Gasket Set. Featuring advanced rubber materials and molded designs, these gaskets provide a superior seal and long-term durability, even under extreme engine conditions. Includes all necessary gaskets and seals for a complete job.',
            compatibility: 'Ford F-150 (2004-2008), Expedition (2003-2006) with 5.4L engine.',
            price: 48.99,
            images: [
                'https://picsum.photos/400/300?random=52',
                'https://picsum.photos/400/300?random=53',
                'https://picsum.photos/400/300?random=54'
            ],
            variants: []
        }
    ],
    "Cooling System": [
        {
            id: 19,
            name: 'Gates Water Pump',
            dealer: 'Cooling System Supply',
            description: 'The Gates Water Pump ensures proper coolant circulation to prevent engine overheating. Manufactured to OEM specifications, it provides efficient and reliable performance. Essential for maintaining the optimal operating temperature of your engine.',
            compatibility: 'Chevrolet Cruze (2011-2015), Sonic (2012-2015) with 1.8L engine.',
            price: 78.25,
            images: [
                'https://picsum.photos/400/300?random=55',
                'https://picsum.photos/400/300?random=56',
                'https://picsum.photos/400/300?random=57'
            ],
            variants: []
        }
    ],
    "Interior Accessories": [
        {
            id: 20,
            name: 'WeatherTech FloorLiner DigitalFit (Front & Rear Set)',
            dealer: 'Interior Accents',
            description: 'Protect your vehicle\'s interior with WeatherTech FloorLiners. Laser-measured for a perfect fit, these liners feature a high-lip design to contain spills and debris, preventing damage to your carpet. Made from a durable, high-density tri-extruded material that provides rigidity and surface friction to the carpet.',
            compatibility: 'Toyota RAV4 (2019-2024), Honda CR-V (2017-2022).',
            price: 199.95,
            images: [
                'https://picsum.photos/400/300?random=58',
                'https://picsum.photos/400/300?random=59',
                'https://picsum.photos/400/300?random=60'
            ],
            variants: []
        }
    ],
    "Filters": [
        {
            id: 21,
            name: 'Mann-Filter HU 816 X Oil Filter',
            dealer: 'Filter World',
            description: 'The Mann-Filter HU 816 X is a high-quality oil filter designed for optimal engine protection and long service intervals. Its advanced filter media ensures efficient removal of contaminants, extending engine life.',
            compatibility: 'BMW 3 Series (E90/E91/E92/E93, 2006-2013) with N52/N54 engines.',
            price: 13.99,
            images: [
                'https://picsum.photos/400/300?random=61',
                'https://picsum.photos/400/300?random=62'
            ],
            variants: []
        },
        {
            id: 22,
            name: 'FRAM Extra Guard Air Filter CA4309',
            dealer: 'AirFlow Parts',
            description: 'FRAM Extra Guard Air Filters are engineered for optimal dirt-trapping efficiency and protection for your engine. Easy to install and designed for a precise fit.',
            compatibility: 'Toyota Camry (2002-2006), Lexus ES330 (2004-2006).',
            price: 17.49,
            images: [
                'https://picsum.photos/400/300?random=63',
                'https://picsum.photos/400/300?random=64'
            ],
            variants: []
        }
    ],
    "Sensors": [
        {
            id: 23,
            name: 'Bosch Oxygen Sensor 15175',
            dealer: 'Sensor Specialists',
            description: 'Bosch Oxygen Sensors are known for their accuracy and long service life. This direct-fit sensor ensures optimal engine performance and emissions control.',
            compatibility: 'Honda Accord (2003-2007), CR-V (2002-2006).',
            price: 49.99,
            images: [
                'https://picsum.photos/400/300?random=65',
                'https://picsum.photos/400/300?random=66'
            ],
            variants: []
        },
        {
            id: 24,
            name: 'Denso Mass Air Flow Sensor 197-6030',
            dealer: 'MAF Pros',
            description: 'Denso Mass Air Flow Sensors provide accurate air intake readings for optimal fuel delivery and engine performance. Built to meet or exceed OE standards.',
            compatibility: 'Toyota Corolla (2009-2013), Matrix (2009-2013).',
            price: 89.95,
            images: [
                'https://picsum.photos/400/300?random=67',
                'https://picsum.photos/400/300?random=68'
            ],
            variants: []
        }
    ],
    "Exterior Accessories": [
        {
            id: 25,
            name: 'AVS In-Channel Ventvisor Window Deflector',
            dealer: 'AutoStyle',
            description: 'The AVS In-Channel Ventvisor allows fresh air in while keeping rain out. Custom fit for your vehicle, it reduces wind noise and helps keep your interior cool.',
            compatibility: 'Ford F-150 (2015-2020), Chevrolet Silverado 1500 (2014-2018).',
            price: 64.99,
            images: [
                'https://picsum.photos/400/300?random=69',
                'https://picsum.photos/400/300?random=70'
            ],
            variants: []
        },
        {
            id: 26,
            name: 'WeatherTech License Plate Frame',
            dealer: 'Plate Pros',
            description: 'WeatherTech License Plate Frames are made from durable ABS plastic and feature a sleek, low-profile design. Easy to install and built to last.',
            compatibility: 'Universal fit for all standard US license plates.',
            price: 19.95,
            images: [
                'https://picsum.photos/400/300?random=71',
                'https://picsum.photos/400/300?random=72'
            ],
            variants: []
        }
    ],
    "Transmission": [
        {
            id: 27,
            name: 'Aisin Automatic Transmission Filter Kit',
            dealer: 'Transmission Tech',
            description: 'Aisin Transmission Filter Kits provide OE-quality filtration and fit. Includes filter, gasket, and seals for a complete service.',
            compatibility: 'Toyota Camry (2007-2011), Avalon (2005-2012).',
            price: 32.99,
            images: [
                'https://picsum.photos/400/300?random=73',
                'https://picsum.photos/400/300?random=74'
            ],
            variants: []
        },
        {
            id: 28,
            name: 'Valvoline MaxLife ATF Full Synthetic',
            dealer: 'Lube Express',
            description: 'Valvoline MaxLife ATF is a full synthetic automatic transmission fluid designed for high-mileage vehicles. Provides smooth shifting and long fluid life.',
            compatibility: 'Universal for most automatic transmissions (check owner’s manual).',
            price: 24.99,
            images: [
                'https://picsum.photos/400/300?random=75',
                'https://picsum.photos/400/300?random=76'
            ],
            variants: []
        }
    ],
    "Heating & Air Conditioning": [
        {
            id: 29,
            name: 'Denso A/C Compressor 471-1630',
            dealer: 'Climate Control Pros',
            description: 'Denso A/C Compressors are built to meet or exceed OE standards for performance and durability. Ensures reliable cooling and quiet operation.',
            compatibility: 'Honda Accord (2003-2007), CR-V (2002-2006).',
            price: 249.99,
            images: [
                'https://picsum.photos/400/300?random=77',
                'https://picsum.photos/400/300?random=78'
            ],
            variants: []
        },
        {
            id: 30,
            name: 'Four Seasons HVAC Blower Motor 75743',
            dealer: 'HVAC Direct',
            description: 'Four Seasons Blower Motors provide reliable airflow for your vehicle’s heating and cooling system. Designed for quiet operation and long service life.',
            compatibility: 'Toyota Camry (2002-2006), Lexus ES330 (2004-2006).',
            price: 59.99,
            images: [
                'https://picsum.photos/400/300?random=79',
                'https://picsum.photos/400/300?random=80'
            ],
            variants: []
        }
    ],
    "Body & Trim": [
        {
            id: 31,
            name: 'Dorman Door Handle 79545',
            dealer: 'Body Parts Express',
            description: 'Dorman exterior door handles are direct replacements for factory parts, ensuring a perfect fit and finish. Durable construction for long-lasting use.',
            compatibility: 'Chevrolet Silverado 1500 (1999-2006), GMC Sierra 1500 (1999-2006).',
            price: 24.99,
            images: [
                'https://picsum.photos/400/300?random=81',
                'https://picsum.photos/400/300?random=82'
            ],
            variants: []
        },
        {
            id: 32,
            name: 'ReplaceXL Fender REPT220123',
            dealer: 'Fender Warehouse',
            description: 'ReplaceXL Fenders are designed to match OE fit and finish, providing a cost-effective solution for damaged body panels.',
            compatibility: 'Toyota Corolla (2009-2013).',
            price: 89.99,
            images: [
                'https://picsum.photos/400/300?random=83',
                'https://picsum.photos/400/300?random=84'
            ],
            variants: []
        }
    ],
    "Belts & Hoses": [
        {
            id: 33,
            name: 'Continental Elite Serpentine Belt 4060882',
            dealer: 'Belt Experts',
            description: 'Continental Elite Serpentine Belts are engineered for superior performance and durability. Designed to resist cracking and stretching.',
            compatibility: 'Honda Accord (2003-2007), CR-V (2002-2006).',
            price: 21.99,
            images: [
                'https://picsum.photos/400/300?random=85',
                'https://picsum.photos/400/300?random=86'
            ],
            variants: []
        },
        {
            id: 34,
            name: 'Gates Radiator Hose 22436',
            dealer: 'Cooling System Supply',
            description: 'Gates Radiator Hoses are made from high-quality EPDM rubber for maximum durability and resistance to heat and chemicals.',
            compatibility: 'Toyota Camry (2002-2006), Lexus ES330 (2004-2006).',
            price: 18.99,
            images: [
                'https://picsum.photos/400/300?random=87',
                'https://picsum.photos/400/300?random=88'
            ],
            variants: []
        }
    ],
    "Ignition": [
        {
            id: 35,
            name: 'Bosch Ignition Coil 0221504470',
            dealer: 'Ignition Pros',
            description: 'Bosch Ignition Coils deliver reliable spark and improved engine performance. Built to OE specifications for a direct fit.',
            compatibility: 'BMW 3 Series (2006-2013) with N52/N54 engines.',
            price: 39.99,
            images: [
                'https://picsum.photos/400/300?random=89',
                'https://picsum.photos/400/300?random=90'
            ],
            variants: []
        },
        {
            id: 36,
            name: 'NGK Laser Iridium Spark Plug 95770',
            dealer: 'Spark Plug Depot',
            description: 'NGK Laser Iridium Spark Plugs offer superior ignitability, fuel efficiency, and long service life. Trusted by professionals worldwide.',
            compatibility: 'Toyota Corolla (2009-2013), Matrix (2009-2013).',
            price: 12.99,
            images: [
                'https://picsum.photos/400/300?random=91',
                'https://picsum.photos/400/300?random=92'
            ],
            variants: []
        }
    ],
    "Tools & Equipment": [
        {
            id: 37,
            name: 'OEMTOOLS 3-Ton Jack Stands',
            dealer: 'Garage Essentials',
            description: 'OEMTOOLS Jack Stands provide safe and stable support for your vehicle during maintenance. Heavy-duty steel construction and easy height adjustment.',
            compatibility: 'Universal for all passenger vehicles and light trucks.',
            price: 44.99,
            images: [
                'https://picsum.photos/400/300?random=93',
                'https://picsum.photos/400/300?random=94'
            ],
            variants: []
        },
        {
            id: 38,
            name: 'Powerbuilt Digital Tire Inflator',
            dealer: 'Tire Tools',
            description: 'Powerbuilt Digital Tire Inflator features an easy-to-read display and automatic shutoff for precise inflation. Compatible with all standard tire valves.',
            compatibility: 'Universal for cars, trucks, and SUVs.',
            price: 29.99,
            images: [
                'https://picsum.photos/400/300?random=95',
                'https://picsum.photos/400/300?random=96'
            ],
            variants: []
        }
    ],
    "Batteries": [
        {
            id: 39,
            name: 'Optima RedTop Battery 34/78',
            dealer: 'Battery World',
            description: 'Optima RedTop Batteries deliver high starting power and exceptional vibration resistance. Maintenance-free and spill-proof design.',
            compatibility: 'Universal fit for most vehicles (check size and terminal orientation).',
            price: 229.99,
            images: [
                'https://picsum.photos/400/300?random=97',
                'https://picsum.photos/400/300?random=98'
            ],
            variants: []
        },
        {
            id: 40,
            name: 'DieHard Platinum AGM Battery 35-AGM',
            dealer: 'PowerUp Auto',
            description: 'DieHard Platinum AGM Batteries offer reliable starting power, deep cycle capability, and long service life. Designed for modern vehicles with high electrical demands.',
            compatibility: 'Honda Accord (2003-2007), Toyota Camry (2002-2006), and more.',
            price: 214.99,
            images: [
                'https://picsum.photos/400/300?random=99',
                'https://picsum.photos/400/300?random=100'
            ],
            variants: []
        }
    ]
};