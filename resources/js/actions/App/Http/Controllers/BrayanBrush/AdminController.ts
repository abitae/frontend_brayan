import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
const AdminController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminController.url(options),
    method: 'get',
})

AdminController.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
AdminController.url = (options?: RouteQueryOptions) => {
    return AdminController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
AdminController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AdminController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
AdminController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AdminController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
    const AdminControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AdminController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
        AdminControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\AdminController::__invoke
 * @see app/Http/Controllers/BrayanBrush/AdminController.php:16
 * @route '/admin'
 */
        AdminControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AdminController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AdminController.form = AdminControllerForm
export default AdminController