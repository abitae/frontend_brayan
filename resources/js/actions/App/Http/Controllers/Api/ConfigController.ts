import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ConfigController::index
 * @see app/Http/Controllers/Api/ConfigController.php:16
 * @route '/api/config'
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
* @see \App\Http\Controllers\Api\ConfigController::update
 * @see app/Http/Controllers/Api/ConfigController.php:41
 * @route '/api/config'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/api/config',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ConfigController::update
 * @see app/Http/Controllers/Api/ConfigController.php:41
 * @route '/api/config'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ConfigController::update
 * @see app/Http/Controllers/Api/ConfigController.php:41
 * @route '/api/config'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ConfigController::update
 * @see app/Http/Controllers/Api/ConfigController.php:41
 * @route '/api/config'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ConfigController::update
 * @see app/Http/Controllers/Api/ConfigController.php:41
 * @route '/api/config'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\ConfigController::uploadLogo
 * @see app/Http/Controllers/Api/ConfigController.php:95
 * @route '/api/config/upload-logo'
 */
export const uploadLogo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

uploadLogo.definition = {
    methods: ["post"],
    url: '/api/config/upload-logo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ConfigController::uploadLogo
 * @see app/Http/Controllers/Api/ConfigController.php:95
 * @route '/api/config/upload-logo'
 */
uploadLogo.url = (options?: RouteQueryOptions) => {
    return uploadLogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ConfigController::uploadLogo
 * @see app/Http/Controllers/Api/ConfigController.php:95
 * @route '/api/config/upload-logo'
 */
uploadLogo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ConfigController::uploadLogo
 * @see app/Http/Controllers/Api/ConfigController.php:95
 * @route '/api/config/upload-logo'
 */
    const uploadLogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadLogo.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ConfigController::uploadLogo
 * @see app/Http/Controllers/Api/ConfigController.php:95
 * @route '/api/config/upload-logo'
 */
        uploadLogoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadLogo.url(options),
            method: 'post',
        })
    
    uploadLogo.form = uploadLogoForm
/**
* @see \App\Http\Controllers\Api\ConfigController::uploadBanner
 * @see app/Http/Controllers/Api/ConfigController.php:108
 * @route '/api/config/upload-banner'
 */
export const uploadBanner = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadBanner.url(options),
    method: 'post',
})

uploadBanner.definition = {
    methods: ["post"],
    url: '/api/config/upload-banner',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ConfigController::uploadBanner
 * @see app/Http/Controllers/Api/ConfigController.php:108
 * @route '/api/config/upload-banner'
 */
uploadBanner.url = (options?: RouteQueryOptions) => {
    return uploadBanner.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ConfigController::uploadBanner
 * @see app/Http/Controllers/Api/ConfigController.php:108
 * @route '/api/config/upload-banner'
 */
uploadBanner.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadBanner.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ConfigController::uploadBanner
 * @see app/Http/Controllers/Api/ConfigController.php:108
 * @route '/api/config/upload-banner'
 */
    const uploadBannerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadBanner.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ConfigController::uploadBanner
 * @see app/Http/Controllers/Api/ConfigController.php:108
 * @route '/api/config/upload-banner'
 */
        uploadBannerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadBanner.url(options),
            method: 'post',
        })
    
    uploadBanner.form = uploadBannerForm
/**
* @see \App\Http\Controllers\Api\ConfigController::uploadBannerBg
 * @see app/Http/Controllers/Api/ConfigController.php:121
 * @route '/api/config/upload-banner-bg'
 */
export const uploadBannerBg = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadBannerBg.url(options),
    method: 'post',
})

uploadBannerBg.definition = {
    methods: ["post"],
    url: '/api/config/upload-banner-bg',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ConfigController::uploadBannerBg
 * @see app/Http/Controllers/Api/ConfigController.php:121
 * @route '/api/config/upload-banner-bg'
 */
uploadBannerBg.url = (options?: RouteQueryOptions) => {
    return uploadBannerBg.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ConfigController::uploadBannerBg
 * @see app/Http/Controllers/Api/ConfigController.php:121
 * @route '/api/config/upload-banner-bg'
 */
uploadBannerBg.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadBannerBg.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ConfigController::uploadBannerBg
 * @see app/Http/Controllers/Api/ConfigController.php:121
 * @route '/api/config/upload-banner-bg'
 */
    const uploadBannerBgForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadBannerBg.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ConfigController::uploadBannerBg
 * @see app/Http/Controllers/Api/ConfigController.php:121
 * @route '/api/config/upload-banner-bg'
 */
        uploadBannerBgForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadBannerBg.url(options),
            method: 'post',
        })
    
    uploadBannerBg.form = uploadBannerBgForm
const ConfigController = { index, update, uploadLogo, uploadBanner, uploadBannerBg }

export default ConfigController