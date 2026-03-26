import HomeController from './HomeController'
import CotizarController from './CotizarController'
import RastreoController from './RastreoController'
import ServiciosController from './ServiciosController'
import NosotrosController from './NosotrosController'
import AgenciasController from './AgenciasController'
import ContactoController from './ContactoController'
import ProhibicionesController from './ProhibicionesController'
import ReclamosController from './ReclamosController'
import AdminController from './AdminController'
const BrayanBrush = {
    HomeController: Object.assign(HomeController, HomeController),
CotizarController: Object.assign(CotizarController, CotizarController),
RastreoController: Object.assign(RastreoController, RastreoController),
ServiciosController: Object.assign(ServiciosController, ServiciosController),
NosotrosController: Object.assign(NosotrosController, NosotrosController),
AgenciasController: Object.assign(AgenciasController, AgenciasController),
ContactoController: Object.assign(ContactoController, ContactoController),
ProhibicionesController: Object.assign(ProhibicionesController, ProhibicionesController),
ReclamosController: Object.assign(ReclamosController, ReclamosController),
AdminController: Object.assign(AdminController, AdminController),
}

export default BrayanBrush