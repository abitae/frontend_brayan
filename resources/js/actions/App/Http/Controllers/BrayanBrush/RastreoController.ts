import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
const RastreoController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RastreoController.url(options),
    method: 'get',
})

RastreoController.definition = {
    methods: ["get","head"],
    url: '/rastreo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
RastreoController.url = (options?: RouteQueryOptions) => {
    return RastreoController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
RastreoController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RastreoController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
RastreoController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RastreoController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
    const RastreoControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RastreoController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
        RastreoControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RastreoController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\RastreoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/RastreoController.php:11
 * @route '/rastreo'
 */
        RastreoControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RastreoController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RastreoController.form = RastreoControllerForm
export default RastreoController