import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
const ProhibicionesController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProhibicionesController.url(options),
    method: 'get',
})

ProhibicionesController.definition = {
    methods: ["get","head"],
    url: '/prohibiciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
ProhibicionesController.url = (options?: RouteQueryOptions) => {
    return ProhibicionesController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
ProhibicionesController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ProhibicionesController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
ProhibicionesController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ProhibicionesController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
    const ProhibicionesControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ProhibicionesController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
        ProhibicionesControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ProhibicionesController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ProhibicionesController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ProhibicionesController.php:12
 * @route '/prohibiciones'
 */
        ProhibicionesControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ProhibicionesController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ProhibicionesController.form = ProhibicionesControllerForm
export default ProhibicionesController