import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::store
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:13
 * @route '/api/prohibited-items'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/prohibited-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::store
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:13
 * @route '/api/prohibited-items'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::store
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:13
 * @route '/api/prohibited-items'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedItemController::store
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:13
 * @route '/api/prohibited-items'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedItemController::store
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:13
 * @route '/api/prohibited-items'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::update
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:32
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
export const update = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/prohibited-items/{prohibitedItem}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::update
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:32
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
update.url = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prohibitedItem: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { prohibitedItem: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    prohibitedItem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        prohibitedItem: typeof args.prohibitedItem === 'object'
                ? args.prohibitedItem.id
                : args.prohibitedItem,
                }

    return update.definition.url
            .replace('{prohibitedItem}', parsedArgs.prohibitedItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::update
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:32
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
update.put = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedItemController::update
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:32
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
    const updateForm = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedItemController::update
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:32
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
        updateForm.put = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ProhibitedItemController::destroy
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:46
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
export const destroy = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/prohibited-items/{prohibitedItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::destroy
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:46
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
destroy.url = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prohibitedItem: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { prohibitedItem: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    prohibitedItem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        prohibitedItem: typeof args.prohibitedItem === 'object'
                ? args.prohibitedItem.id
                : args.prohibitedItem,
                }

    return destroy.definition.url
            .replace('{prohibitedItem}', parsedArgs.prohibitedItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedItemController::destroy
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:46
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
destroy.delete = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedItemController::destroy
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:46
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
    const destroyForm = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedItemController::destroy
 * @see app/Http/Controllers/Api/ProhibitedItemController.php:46
 * @route '/api/prohibited-items/{prohibitedItem}'
 */
        destroyForm.delete = (args: { prohibitedItem: number | { id: number } } | [prohibitedItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProhibitedItemController = { store, update, destroy }

export default ProhibitedItemController