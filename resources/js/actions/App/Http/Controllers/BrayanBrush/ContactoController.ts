import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
const ContactoController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ContactoController.url(options),
    method: 'get',
})

ContactoController.definition = {
    methods: ["get","head"],
    url: '/contacto',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
ContactoController.url = (options?: RouteQueryOptions) => {
    return ContactoController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
ContactoController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ContactoController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
ContactoController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ContactoController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
    const ContactoControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ContactoController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
        ContactoControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ContactoController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BrayanBrush\ContactoController::__invoke
 * @see app/Http/Controllers/BrayanBrush/ContactoController.php:11
 * @route '/contacto'
 */
        ContactoControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ContactoController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ContactoController.form = ContactoControllerForm
export default ContactoController