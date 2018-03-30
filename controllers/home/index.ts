import * as express from 'express'
import home from './default'

export default router => {
    router.use('/', home)    
}