<?php

namespace Database\Seeders;

use App\Models\ProhibitedCategory;
use App\Models\ProhibitedItem;
use App\Models\Service;
use Illuminate\Database\Seeder;

class BrayanBrushSeeder extends Seeder
{
    public function run(): void
    {
        if (Service::count() > 0) {
            return;
        }

        Service::insert([
            ['title' => 'Courier Nacional', 'description' => 'Envíos rápidos de sobres y paquetería menor a 10kg.', 'icon_type' => 'Box', 'sort_order' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Mudanza Corporativa', 'description' => 'Traslados integrales con embalaje profesional.', 'icon_type' => 'Home', 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Carga Pesada', 'description' => 'Logística B2B para envíos de gran tonelaje.', 'icon_type' => 'Package', 'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $cat1 = ProhibitedCategory::create(['title' => 'Materiales Peligrosos', 'sort_order' => 0]);
        foreach (['Explosivos y materiales inflamables', 'Sustancias tóxicas o corrosivas', 'Gases comprimidos'] as $i => $label) {
            $cat1->items()->create(['label' => $label, 'sort_order' => $i]);
        }

        $cat2 = ProhibitedCategory::create(['title' => 'Artículos Ilegales', 'sort_order' => 1]);
        foreach (['Drogas y estupefacientes', 'Armas y municiones', 'Mercancía de contrabando'] as $i => $label) {
            $cat2->items()->create(['label' => $label, 'sort_order' => $i]);
        }

        $cat3 = ProhibitedCategory::create(['title' => 'Restricciones Especiales', 'sort_order' => 2]);
        foreach (['Dinero en efectivo', 'Joyas y valores', 'Documentos confidenciales'] as $i => $label) {
            $cat3->items()->create(['label' => $label, 'sort_order' => $i]);
        }
    }
}
