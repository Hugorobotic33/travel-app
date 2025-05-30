<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Experience;
use Illuminate\Database\Seeder;
use Database\Seeders\ActivityExperienceSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $experiences = [
            [
                'title' => 'Recorrido por el Centro Histórico de Oaxaca',
                'desc' => 'Explora la arquitectura colonial, mercados tradicionales y prueba el mezcal local.',
                'available_date' => '2025-06-01',
                'expiration_date' => '2025-09-30',
                'price' => 1200,
                'rating' => 4.7,
                'status' => true,
                'place' => 'Oaxaca, Oaxaca',
                'image' => 'https://www.mexicodesconocido.com.mx/wp-content/uploads/2019/05/Centro-Oaxaca.jpg',
            ],
            [
                'title' => 'Salto en paracaídas en Chiapas',
                'desc' => 'Vive la adrenalina con un salto tándem en paisajes selváticos.',
                'available_date' => '2025-06-15',
                'expiration_date' => '2025-12-15',
                'price' => 3500,
                'rating' => 4.9,
                'status' => true,
                'place' => 'Tuxtla Gutiérrez, Chiapas',
                'image' => 'https://cdn1.yumping.com.mx/emp/fotos/301/E/019713543/640/Paracaidismo%20en%20Chiapas.jpg',
            ],
            [
                'title' => 'Tour en globo sobre Teotihuacán',
                'desc' => 'Vuela al amanecer sobre las pirámides del Sol y la Luna.',
                'available_date' => '2025-07-01',
                'expiration_date' => '2025-12-31',
                'price' => 2600,
                'rating' => 4.8,
                'status' => true,
                'place' => 'San Juan Teotihuacán, Estado de México',
                'image' => 'https://cdn-igkpn.nitrocdn.com/bcAeMJnqCXjXxNocHDQgfCXUQiqrKTqL/assets/images/optimized/rev-5e35e0c/vuelosenglobo.mx/wp-content/uploads/2020/10/viajar-en-globo-por-teotihuacan-1024x1024.jpg',
            ],
            [
                'title' => 'Caminata en el Cañón del Sumidero',
                'desc' => 'Navega o camina por este impresionante cañón natural.',
                'available_date' => '2025-05-01',
                'expiration_date' => '2025-11-30',
                'price' => 800,
                'rating' => 4.5,
                'status' => true,
                'place' => 'Chiapas',
                'image' => 'https://visitchiapas.com/v1/admin/archivos/Turismo/multimedia/86bc8b7a_31052020_2017.jpg',
            ],
            [
                'title' => 'Nado con tortugas en Akumal',
                'desc' => 'Nada con tortugas marinas en su hábitat natural.',
                'available_date' => '2025-05-25',
                'expiration_date' => '2025-10-31',
                'price' => 900,
                'rating' => 4.6,
                'status' => true,
                'place' => 'Akumal, Quintana Roo',
                'image' => 'https://tourslarivieramaya.com/wp-content/uploads/2022/11/Bucear-tortugas-akumal.jpg',
            ],
            [
                'title' => 'Ruta del Vino en Valle de Guadalupe',
                'desc' => 'Visita viñedos y degusta vinos artesanales mexicanos.',
                'available_date' => '2025-08-01',
                'expiration_date' => '2025-12-31',
                'price' => 1800,
                'rating' => 4.4,
                'status' => true,
                'place' => 'Ensenada, Baja California',
                'image' => 'https://bajaviajes.com/wp-content/uploads/2015/11/la-cetto-tour-premium-valle-guadalupe-vinedos-800x600.jpg',
            ],
            [
                'title' => 'Escalada en la Peña de Bernal',
                'desc' => 'Escala uno de los monolitos más grandes del mundo.',
                'available_date' => '2025-05-01',
                'expiration_date' => '2025-12-31',
                'price' => 700,
                'rating' => 4.2,
                'status' => true,
                'place' => 'Bernal, Querétaro',
                'image' => 'https://promoturqueretaro.com.mx/wp-content/uploads/2018/07/Salidas-a-Bernal-Pueblo-M%C3%A1gico.jpg',
            ],
            [
                'title' => 'Tour gastronómico por Puebla',
                'desc' => 'Degusta mole poblano, chiles en nogada y dulces típicos.',
                'available_date' => '2025-07-10',
                'expiration_date' => '2025-12-10',
                'price' => 950,
                'rating' => 4.7,
                'status' => true,
                'place' => 'Puebla, Puebla',
                'image' => 'https://dynamic-media.tacdn.com/media/photo-o/2f/27/0c/d6/caption.jpg?w=800&h=600&s=1',
            ],
            [
                'title' => 'Pesca deportiva en Mazatlán',
                'desc' => 'Disfruta un día en altamar buscando marlin y dorado.',
                'available_date' => '2025-05-01',
                'expiration_date' => '2025-12-31',
                'price' => 3000,
                'rating' => 4.3,
                'status' => true,
                'place' => 'Mazatlán, Sinaloa',
                'image' => 'https://elcidmarinas.com.mx/wp-content/uploads/2017/05/CIDmarina-009-X2-1024x682.jpg',
            ],
            [
                'title' => 'Ruta del café en Veracruz',
                'desc' => 'Conoce fincas cafetaleras y degusta café orgánico.',
                'available_date' => '2025-06-01',
                'expiration_date' => '2025-11-30',
                'price' => 850,
                'rating' => 4.5,
                'status' => true,
                'place' => 'Coatepec, Veracruz',
                'image' => 'https://www.eluniversal.com.mx/resizer/v2/2MQSJYWO4FDYDEM46PO4LTTBZY.jpg?auth=a6f4900adf9a46f4c5c375d7b5cb9096e734f7b15663915ca1ef7ddbf41acc76&smart=true&width=1100&height=666',
            ],
            [
                'title' => 'Visita a las Grutas de Tolantongo',
                'desc' => 'Aguas termales en un entorno natural impresionante.',
                'available_date' => '2025-05-30',
                'expiration_date' => '2025-10-30',
                'price' => 700,
                'rating' => 4.6,
                'status' => true,
                'place' => 'Hidalgo',
                'image' => 'https://www.mexicodestinos.com/blog/wp-content/uploads/2017/08/tunel-de-vapor-tolantongo.jpg',
            ],
            [
                'title' => 'Paseo en trajinera por Xochimilco',
                'desc' => 'Disfruta música, comida y cultura a bordo de una trajinera.',
                'available_date' => '2025-06-01',
                'expiration_date' => '2025-12-01',
                'price' => 600,
                'rating' => 4.1,
                'status' => true,
                'place' => 'CDMX',
                'image' => 'https://media.viajando.travel/p/589e81110ea3b64a7dca3e703458d735/adjuntos/236/imagenes/000/679/0000679323/1200x0/smart/disfruta-las-trajineras-tu-visita-xochimilco.jpg',
            ],
            [
                'title' => 'Tour arqueológico en Palenque',
                'desc' => 'Explora una de las ciudades mayas más importantes.',
                'available_date' => '2025-07-01',
                'expiration_date' => '2025-12-31',
                'price' => 1100,
                'rating' => 4.8,
                'status' => true,
                'place' => 'Palenque, Chiapas',
                'image' => 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/e7/4b/fe.jpg',
            ],
            [
                'title' => 'Paddle board en Bacalar',
                'desc' => 'Navega por la Laguna de los Siete Colores.',
                'available_date' => '2025-06-15',
                'expiration_date' => '2025-11-30',
                'price' => 950,
                'rating' => 4.5,
                'status' => true,
                'place' => 'Bacalar, Quintana Roo',
                'image' => 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0f/a6/45/a3.jpg',
            ],
            [
                'title' => 'Sandboarding en las dunas de Samalayuca',
                'desc' => 'Deslízate por dunas gigantes en el desierto de Chihuahua.',
                'available_date' => '2025-06-01',
                'expiration_date' => '2025-10-31',
                'price' => 650,
                'rating' => 4.2,
                'status' => true,
                'place' => 'Chihuahua',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/7/70/Dunas_samalayuca.jpg',
            ],
            [
                'title' => 'Ruta del Queso y Vino en Querétaro',
                'desc' => 'Una experiencia sensorial entre cavas, viñedos y queserías.',
                'available_date' => '2025-08-01',
                'expiration_date' => '2025-12-01',
                'price' => 1300,
                'rating' => 4.6,
                'status' => true,
                'place' => 'Querétaro',
                'image' => 'https://www.abasturhub.com/img/blog/Queretaro-apuesta-por-una-ruta-de-queso-vino.jpg',
            ],
            [
                'title' => 'Senderismo en la Huasteca Potosina',
                'desc' => 'Cascadas, pozas turquesa y vegetación exuberante.',
                'available_date' => '2025-06-01',
                'expiration_date' => '2025-11-30',
                'price' => 1500,
                'rating' => 4.9,
                'status' => true,
                'place' => 'San Luis Potosí',
                'image' => 'https://icdn.descubro.mx/uploads/2024/02/huasteca-potosina-cascadas-imperdibles-destino-turistico.jpg?strip=all&lossy=1&ssl=1',
            ],
            [
                'title' => 'Nado con tiburón ballena',
                'desc' => 'Aventura marina única en el mundo con el pez más grande del océano.',
                'available_date' => '2025-07-01',
                'expiration_date' => '2025-09-15',
                'price' => 4200,
                'rating' => 5.0,
                'status' => true,
                'place' => 'Isla Holbox, Quintana Roo',
                'image' => 'https://mayanmonkey.com/blog/es/wp-content/uploads/sites/2/2022/06/shutterstock_70095013-compressed-scaled.jpg',
            ],
            [
                'title' => 'Campamento astronómico en Real de Catorce',
                'desc' => 'Observa las estrellas desde uno de los cielos más despejados de México.',
                'available_date' => '2025-09-01',
                'expiration_date' => '2025-12-31',
                'price' => 1000,
                'rating' => 4.3,
                'status' => true,
                'place' => 'San Luis Potosí',
                'image' => 'https://www.dondeir.com/wp-content/uploads/2018/09/campamentos-astronomicos-2018-lunada.jpg',
            ],
            [
                'title' => 'Ruta de murales en CDMX',
                'desc' => 'Tour guiado por las principales obras de arte urbano.',
                'available_date' => '2025-06-01',
                'expiration_date' => '2025-12-31',
                'price' => 500,
                'rating' => 4.0,
                'status' => true,
                'place' => 'CDMX',
                'image' => 'https://media.timeout.com/images/103714333/750/562/image.jpg',
            ],
        ];
        foreach ($experiences as $experience) {
            Experience::create($experience);
        }

        $this->call(ActivityExperienceSeeder::class);
    }
}
