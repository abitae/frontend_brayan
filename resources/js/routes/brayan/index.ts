import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import servicios3c6a55 from './servicios'
/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
export const cotizar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cotizar.url(options),
    method: 'get',
})

cotizar.definition = {
    methods: ["get","head"],
    url: '/cotizar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
cotizar.url = (options?: RouteQueryOptions) => {
    return cotizar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
cotizar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cotizar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
cotizar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cotizar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
    const cotizarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cotizar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
        cotizarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cotizar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
        cotizarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cotizar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cotizar.form = cotizarForm
/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
export const rastreo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rastreo.url(options),
    method: 'get',
})

rastreo.definition = {
    methods: ["get","head"],
    url: '/rastreo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
rastreo.url = (options?: RouteQueryOptions) => {
    return rastreo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
rastreo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rastreo.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
rastreo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rastreo.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
    const rastreoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rastreo.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
        rastreoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rastreo.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
        rastreoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rastreo.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rastreo.form = rastreoForm
/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
export const servicios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: servicios.url(options),
    method: 'get',
})

servicios.definition = {
    methods: ["get","head"],
    url: '/servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
servicios.url = (options?: RouteQueryOptions) => {
    return servicios.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
servicios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: servicios.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
servicios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: servicios.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
    const serviciosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: servicios.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
        serviciosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: servicios.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::servicios
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
        serviciosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: servicios.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    servicios.form = serviciosForm
/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
export const nosotros = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nosotros.url(options),
    method: 'get',
})

nosotros.definition = {
    methods: ["get","head"],
    url: '/nosotros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
nosotros.url = (options?: RouteQueryOptions) => {
    return nosotros.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
nosotros.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: nosotros.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
nosotros.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: nosotros.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
    const nosotrosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: nosotros.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
        nosotrosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: nosotros.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
        nosotrosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: nosotros.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    nosotros.form = nosotrosForm
/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
export const agencias = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: agencias.url(options),
    method: 'get',
})

agencias.definition = {
    methods: ["get","head"],
    url: '/agencias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
agencias.url = (options?: RouteQueryOptions) => {
    return agencias.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
agencias.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: agencias.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
agencias.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: agencias.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
    const agenciasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: agencias.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
        agenciasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: agencias.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
        agenciasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: agencias.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    agencias.form = agenciasForm
/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
export const contacto = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contacto.url(options),
    method: 'get',
})

contacto.definition = {
    methods: ["get","head"],
    url: '/contacto',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
contacto.url = (options?: RouteQueryOptions) => {
    return contacto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
contacto.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contacto.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
contacto.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contacto.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
    const contactoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contacto.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
        contactoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contacto.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
        contactoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contacto.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contacto.form = contactoForm
/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
export const prohibiciones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prohibiciones.url(options),
    method: 'get',
})

prohibiciones.definition = {
    methods: ["get","head"],
    url: '/prohibiciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
prohibiciones.url = (options?: RouteQueryOptions) => {
    return prohibiciones.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
prohibiciones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prohibiciones.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
prohibiciones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prohibiciones.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
    const prohibicionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: prohibiciones.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
        prohibicionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prohibiciones.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
        prohibicionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prohibiciones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    prohibiciones.form = prohibicionesForm
/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
export const reclamos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reclamos.url(options),
    method: 'get',
})

reclamos.definition = {
    methods: ["get","head"],
    url: '/reclamos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
reclamos.url = (options?: RouteQueryOptions) => {
    return reclamos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
reclamos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reclamos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
reclamos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reclamos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
    const reclamosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reclamos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
        reclamosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reclamos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
        reclamosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reclamos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reclamos.form = reclamosForm
/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
export const admin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

admin.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
admin.url = (options?: RouteQueryOptions) => {
    return admin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
admin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
admin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
    const adminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: admin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
        adminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
        adminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    admin.form = adminForm
const brayan = {
    cotizar: Object.assign(cotizar, cotizar),
rastreo: Object.assign(rastreo, rastreo),
servicios: Object.assign(servicios, servicios3c6a55),
nosotros: Object.assign(nosotros, nosotros),
agencias: Object.assign(agencias, agencias),
contacto: Object.assign(contacto, contacto),
prohibiciones: Object.assign(prohibiciones, prohibiciones),
reclamos: Object.assign(reclamos, reclamos),
admin: Object.assign(admin, admin),
}

export default brayan