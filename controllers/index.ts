import home from './home'
import auth from './auth'

export default router => {
    home(router)
    auth(router)
}