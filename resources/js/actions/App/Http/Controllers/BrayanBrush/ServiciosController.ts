import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::index
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:12
 * @route '/servicios'
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
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
export const show = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/servicios/{service}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
show.url = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { service: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    service: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        service: typeof args.service === 'object'
                ? args.service.id
                : args.service,
                }

    return show.definition.url
            .replace('{service}', parsedArgs.service.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
show.get = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
show.head = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
    const showForm = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
        showForm.get = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ServiciosController::show
 * @see app/Http/Controllers/BrayanBrush/ServiciosController.php:19
 * @route '/servicios/{service}'
 */
        showForm.head = (args: { service: number | { id: number } } | [service: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const ServiciosController = { index, show }

export default ServiciosController