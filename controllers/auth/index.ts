import login from './login'
import register from './register'

export default router => {
    router.use('/', login)
    router.use('/', register)    
}