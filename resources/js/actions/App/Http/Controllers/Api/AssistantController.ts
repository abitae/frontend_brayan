import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AssistantController::chat
 * @see app/Http/Controllers/Api/AssistantController.php:27
 * @route '/api/assistant/chat'
 */
export const chat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chat.url(options),
    method: 'post',
})

chat.definition = {
    methods: ["post"],
    url: '/api/assistant/chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AssistantController::chat
 * @see app/Http/Controllers/Api/AssistantController.php:27
 * @route '/api/assistant/chat'
 */
chat.url = (options?: RouteQueryOptions) => {
    return chat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AssistantController::chat
 * @see app/Http/Controllers/Api/AssistantController.php:27
 * @route '/api/assistant/chat'
 */
chat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chat.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AssistantController::chat
 * @see app/Http/Controllers/Api/AssistantController.php:27
 * @route '/api/assistant/chat'
 */
    const chatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: chat.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AssistantController::chat
 * @see app/Http/Controllers/Api/AssistantController.php:27
 * @route '/api/assistant/chat'
 */
        chatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: chat.url(options),
            method: 'post',
        })
    
    chat.form = chatForm
const AssistantController = { chat }

export default AssistantController