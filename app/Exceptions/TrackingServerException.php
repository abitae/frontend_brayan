<?php

namespace App\Exceptions;

use Exception;

class TrackingServerException extends Exception
{
    public function __construct(string $message = 'Error al consultar el seguimiento. Intenta de nuevo.')
    {
        parent::__construct($message);
    }
}
