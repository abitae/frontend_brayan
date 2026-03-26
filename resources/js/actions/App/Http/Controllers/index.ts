import Api from './Api'
import BrayanBrush from './BrayanBrush'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
BrayanBrush: Object.assign(BrayanBrush, BrayanBrush),
Settings: Object.assign(Settings, Settings),
}

export default Controllers