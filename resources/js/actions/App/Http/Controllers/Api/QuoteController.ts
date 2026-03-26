import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\QuoteController::store
 * @see app/Http/Controllers/Api/QuoteController.php:35
 * @route '/api/quotes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/quotes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\QuoteController::store
 * @see app/Http/Controllers/Api/QuoteController.php:35
 * @route '/api/quotes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QuoteController::store
 * @see app/Http/Controllers/Api/QuoteController.php:35
 * @route '/api/quotes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\QuoteController::store
 * @see app/Http/Controllers/Api/QuoteController.php:35
 * @route '/api/quotes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QuoteController::store
 * @see app/Http/Controllers/Api/QuoteController.php:35
 * @route '/api/quotes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/quotes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\QuoteController::index
 * @see app/Http/Controllers/Api/QuoteController.php:15
 * @route '/api/quotes'
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
* @see \App\Http\Controllers\Api\QuoteController::update
 * @see app/Http/Controllers/Api/QuoteController.php:57
 * @route '/api/quotes/{quote}'
 */
export const update = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/quotes/{quote}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\QuoteController::update
 * @see app/Http/Controllers/Api/QuoteController.php:57
 * @route '/api/quotes/{quote}'
 */
update.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quote: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { quote: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    quote: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        quote: typeof args.quote === 'object'
                ? args.quote.id
                : args.quote,
                }

    return update.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QuoteController::update
 * @see app/Http/Controllers/Api/QuoteController.php:57
 * @route '/api/quotes/{quote}'
 */
update.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\QuoteController::update
 * @see app/Http/Controllers/Api/QuoteController.php:57
 * @route '/api/quotes/{quote}'
 */
    const updateForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QuoteController::update
 * @see app/Http/Controllers/Api/QuoteController.php:57
 * @route '/api/quotes/{quote}'
 */
        updateForm.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\QuoteController::destroy
 * @see app/Http/Controllers/Api/QuoteController.php:84
 * @route '/api/quotes/{quote}'
 */
export const destroy = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/quotes/{quote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\QuoteController::destroy
 * @see app/Http/Controllers/Api/QuoteController.php:84
 * @route '/api/quotes/{quote}'
 */
destroy.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quote: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { quote: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    quote: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        quote: typeof args.quote === 'object'
                ? args.quote.id
                : args.quote,
                }

    return destroy.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QuoteController::destroy
 * @see app/Http/Controllers/Api/QuoteController.php:84
 * @route '/api/quotes/{quote}'
 */
destroy.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\QuoteController::destroy
 * @see app/Http/Controllers/Api/QuoteController.php:84
 * @route '/api/quotes/{quote}'
 */
    const destroyForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QuoteController::destroy
 * @see app/Http/Controllers/Api/QuoteController.php:84
 * @route '/api/quotes/{quote}'
 */
        destroyForm.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const QuoteController = { store, index, update, destroy }

export default QuoteController