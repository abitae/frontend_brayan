<?php

namespace App\Http\Controllers\BrayanBrush\Concerns;

trait DefaultContent
{
    /**
     * Servicios por defecto (fase 1: no persistidos).
     */
    protected static function defaultServices(): array
    {
        return [
            ['id' => 'courier', 'title' => 'Courier Nacional', 'description' => 'Envíos rápidos de sobres y paquetería menor a 10kg.', 'icon_type' => 'Box'],
            ['id' => 'mudanza', 'title' => 'Mudanza Corporativa', 'description' => 'Traslados integrales con embalaje profesional.', 'icon_type' => 'Home'],
            ['id' => 'carga', 'title' => 'Carga Pesada', 'description' => 'Logística B2B para envíos de gran tonelaje.', 'icon_type' => 'Package'],
        ];
    }

    /**
     * Artículos prohibidos por defecto (fase 1: no persistidos).
     */
    protected static function defaultProhibitedItems(): array
    {
        return [
            ['title' => 'Materiales Peligrosos', 'items' => ['Explosivos y materiales inflamables', 'Sustancias tóxicas o corrosivas', 'Gases comprimidos']],
            ['title' => 'Artículos Ilegales', 'items' => ['Drogas y estupefacientes', 'Armas y municiones', 'Mercancía de contrabando']],
            ['title' => 'Restricciones Especiales', 'items' => ['Dinero en efectivo', 'Joyas y valores', 'Documentos confidenciales']],
        ];
    }
}
