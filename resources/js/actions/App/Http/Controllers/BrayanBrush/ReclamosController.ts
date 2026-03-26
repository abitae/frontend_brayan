import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
const ReclamosController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ReclamosController.url(options),
    method: 'get',
})

ReclamosController.definition = {
    methods: ["get","head"],
    url: '/reclamos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
ReclamosController.url = (options?: RouteQueryOptions) => {
    return ReclamosController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
ReclamosController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ReclamosController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
ReclamosController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ReclamosController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
    const ReclamosControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ReclamosController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
        ReclamosControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ReclamosController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ReclamosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ReclamosController.php:11
 * @route '/reclamos'
 */
        ReclamosControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ReclamosController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ReclamosController.form = ReclamosControllerForm
export default ReclamosController