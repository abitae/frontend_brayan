import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
const NosotrosController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: NosotrosController.url(options),
    method: 'get',
})

NosotrosController.definition = {
    methods: ["get","head"],
    url: '/nosotros',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
NosotrosController.url = (options?: RouteQueryOptions) => {
    return NosotrosController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
NosotrosController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: NosotrosController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
NosotrosController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: NosotrosController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
    const NosotrosControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: NosotrosController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
        NosotrosControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: NosotrosController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\NosotrosController::__invoke
 * @see app/Http/Controllers/BrayanBrush/NosotrosController.php:11
 * @route '/nosotros'
 */
        NosotrosControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: NosotrosController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    NosotrosController.form = NosotrosControllerForm
export default NosotrosController