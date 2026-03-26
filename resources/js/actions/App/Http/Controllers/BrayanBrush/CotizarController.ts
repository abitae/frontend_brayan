import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
const CotizarController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CotizarController.url(options),
    method: 'get',
})

CotizarController.definition = {
    methods: ["get","head"],
    url: '/cotizar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
CotizarController.url = (options?: RouteQueryOptions) => {
    return CotizarController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
CotizarController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CotizarController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
CotizarController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CotizarController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
    const CotizarControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: CotizarController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
        CotizarControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CotizarController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\CotizarController::__invoke
 * @see app/Http/Controllers/BrayanBrush/CotizarController.php:12
 * @route '/cotizar'
 */
        CotizarControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: CotizarController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    CotizarController.form = CotizarControllerForm
export default CotizarController