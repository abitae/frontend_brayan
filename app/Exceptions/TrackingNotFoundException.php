<?php

namespace App\Exceptions;

use Exception;

class TrackingNotFoundException extends Exception
{
    public function __construct(string $message = 'Encomienda no encontrada.')
    {
        parent::__construct($message);
    }
}
