import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/pricing-routes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\PricingRouteController::index
 * @see app/Http/Controllers/Api/PricingRouteController.php:12
 * @route '/api/pricing-routes'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Api\PricingRouteController::store
 * @see app/Http/Controllers/Api/PricingRouteController.php:26
 * @route '/api/pricing-routes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pricing-routes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PricingRouteController::store
 * @see app/Http/Controllers/Api/PricingRouteController.php:26
 * @route '/api/pricing-routes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PricingRouteController::store
 * @see app/Http/Controllers/Api/PricingRouteController.php:26
 * @route '/api/pricing-routes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\PricingRouteController::store
 * @see app/Http/Controllers/Api/PricingRouteController.php:26
 * @route '/api/pricing-routes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PricingRouteController::store
 * @see app/Http/Controllers/Api/PricingRouteController.php:26
 * @route '/api/pricing-routes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\PricingRouteController::update
 * @see app/Http/Controllers/Api/PricingRouteController.php:51
 * @route '/api/pricing-routes/{pricingRoute}'
 */
export const update = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/pricing-routes/{pricingRoute}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\PricingRouteController::update
 * @see app/Http/Controllers/Api/PricingRouteController.php:51
 * @route '/api/pricing-routes/{pricingRoute}'
 */
update.url = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRoute: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pricingRoute: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pricingRoute: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pricingRoute: typeof args.pricingRoute === 'object'
                ? args.pricingRoute.id
                : args.pricingRoute,
                }

    return update.definition.url
            .replace('{pricingRoute}', parsedArgs.pricingRoute.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PricingRouteController::update
 * @see app/Http/Controllers/Api/PricingRouteController.php:51
 * @route '/api/pricing-routes/{pricingRoute}'
 */
update.put = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\PricingRouteController::update
 * @see app/Http/Controllers/Api/PricingRouteController.php:51
 * @route '/api/pricing-routes/{pricingRoute}'
 */
    const updateForm = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PricingRouteController::update
 * @see app/Http/Controllers/Api/PricingRouteController.php:51
 * @route '/api/pricing-routes/{pricingRoute}'
 */
        updateForm.put = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\PricingRouteController::destroy
 * @see app/Http/Controllers/Api/PricingRouteController.php:75
 * @route '/api/pricing-routes/{pricingRoute}'
 */
export const destroy = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/pricing-routes/{pricingRoute}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\PricingRouteController::destroy
 * @see app/Http/Controllers/Api/PricingRouteController.php:75
 * @route '/api/pricing-routes/{pricingRoute}'
 */
destroy.url = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pricingRoute: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pricingRoute: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pricingRoute: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pricingRoute: typeof args.pricingRoute === 'object'
                ? args.pricingRoute.id
                : args.pricingRoute,
                }

    return destroy.definition.url
            .replace('{pricingRoute}', parsedArgs.pricingRoute.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PricingRouteController::destroy
 * @see app/Http/Controllers/Api/PricingRouteController.php:75
 * @route '/api/pricing-routes/{pricingRoute}'
 */
destroy.delete = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\PricingRouteController::destroy
 * @see app/Http/Controllers/Api/PricingRouteController.php:75
 * @route '/api/pricing-routes/{pricingRoute}'
 */
    const destroyForm = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PricingRouteController::destroy
 * @see app/Http/Controllers/Api/PricingRouteController.php:75
 * @route '/api/pricing-routes/{pricingRoute}'
 */
        destroyForm.delete = (args: { pricingRoute: number | { id: number } } | [pricingRoute: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PricingRouteController = { index, store, update, destroy }

export default PricingRouteController