import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/prohibited-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::index
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:15
 * @route '/api/prohibited-categories'
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
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::store
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:29
 * @route '/api/prohibited-categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/prohibited-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::store
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:29
 * @route '/api/prohibited-categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::store
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:29
 * @route '/api/prohibited-categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::store
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:29
 * @route '/api/prohibited-categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::store
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:29
 * @route '/api/prohibited-categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::update
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:47
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
export const update = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/prohibited-categories/{prohibitedCategory}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::update
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:47
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
update.url = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prohibitedCategory: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { prohibitedCategory: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    prohibitedCategory: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        prohibitedCategory: typeof args.prohibitedCategory === 'object'
                ? args.prohibitedCategory.id
                : args.prohibitedCategory,
                }

    return update.definition.url
            .replace('{prohibitedCategory}', parsedArgs.prohibitedCategory.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::update
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:47
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
update.put = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::update
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:47
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
    const updateForm = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::update
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:47
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
        updateForm.put = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::destroy
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:62
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
export const destroy = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/prohibited-categories/{prohibitedCategory}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::destroy
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:62
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
destroy.url = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prohibitedCategory: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { prohibitedCategory: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    prohibitedCategory: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        prohibitedCategory: typeof args.prohibitedCategory === 'object'
                ? args.prohibitedCategory.id
                : args.prohibitedCategory,
                }

    return destroy.definition.url
            .replace('{prohibitedCategory}', parsedArgs.prohibitedCategory.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::destroy
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:62
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
destroy.delete = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::destroy
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:62
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
    const destroyForm = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ProhibitedCategoryController::destroy
 * @see app/Http/Controllers/Api/ProhibitedCategoryController.php:62
 * @route '/api/prohibited-categories/{prohibitedCategory}'
 */
        destroyForm.delete = (args: { prohibitedCategory: number | { id: number } } | [prohibitedCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProhibitedCategoryController = { index, store, update, destroy }

export default ProhibitedCategoryController