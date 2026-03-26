import ConfigController from './ConfigController'
import ServiceController from './ServiceController'
import ProhibitedCategoryController from './ProhibitedCategoryController'
import PricingRouteController from './PricingRouteController'
import TrackingController from './TrackingController'
import AssistantController from './AssistantController'
import QuoteController from './QuoteController'
import ProhibitedItemController from './ProhibitedItemController'
const Api = {
    ConfigController: Object.assign(ConfigController, ConfigController),
ServiceController: Object.assign(ServiceController, ServiceController),
ProhibitedCategoryController: Object.assign(ProhibitedCategoryController, ProhibitedCategoryController),
PricingRouteController: Object.assign(PricingRouteController, PricingRouteController),
TrackingController: Object.assign(TrackingController, TrackingController),
AssistantController: Object.assign(AssistantController, AssistantController),
QuoteController: Object.assign(QuoteController, QuoteController),
ProhibitedItemController: Object.assign(ProhibitedItemController, ProhibitedItemController),
}

export default Api