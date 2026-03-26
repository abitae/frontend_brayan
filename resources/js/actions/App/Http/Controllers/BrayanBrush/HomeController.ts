import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
const HomeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HomeController.url(options),
    method: 'get',
})

HomeController.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
HomeController.url = (options?: RouteQueryOptions) => {
    return HomeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
HomeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: HomeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
HomeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: HomeController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
    const HomeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: HomeController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
        HomeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: HomeController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\HomeController::__invoke
 * @see app/Http/Controllers/BrayanBrush/HomeController.php:13
 * @route '/'
 */
        HomeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: HomeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    HomeController.form = HomeControllerForm
export default HomeController