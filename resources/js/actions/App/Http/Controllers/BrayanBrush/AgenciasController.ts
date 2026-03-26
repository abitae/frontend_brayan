import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
const AgenciasController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AgenciasController.url(options),
    method: 'get',
})

AgenciasController.definition = {
    methods: ["get","head"],
    url: '/agencias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
AgenciasController.url = (options?: RouteQueryOptions) => {
    return AgenciasController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
AgenciasController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AgenciasController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
AgenciasController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AgenciasController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
    const AgenciasControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AgenciasController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
        AgenciasControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AgenciasController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\AgenciasController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AgenciasController.php:11
 * @route '/agencias'
 */
        AgenciasControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AgenciasController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AgenciasController.form = AgenciasControllerForm
export default AgenciasController