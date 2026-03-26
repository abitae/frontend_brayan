import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/tracking',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\TrackingController::show
 * @see app/Http/Controllers/Api/TrackingController.php:72
 * @route '/api/tracking'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\TrackingController::store
 * @see app/Http/Controllers/Api/TrackingController.php:23
 * @route '/api/tracking'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/tracking',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\TrackingController::store
 * @see app/Http/Controllers/Api/TrackingController.php:23
 * @route '/api/tracking'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TrackingController::store
 * @see app/Http/Controllers/Api/TrackingController.php:23
 * @route '/api/tracking'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\TrackingController::store
 * @see app/Http/Controllers/Api/TrackingController.php:23
 * @route '/api/tracking'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\TrackingController::store
 * @see app/Http/Controllers/Api/TrackingController.php:23
 * @route '/api/tracking'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const TrackingController = { show, store }

export default TrackingController