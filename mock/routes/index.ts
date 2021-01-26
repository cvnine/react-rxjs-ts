import * as Router from 'koa-router'
import home from './home'

const router = new Router()

// 用户api
router.use('/api', home.routes(), home.allowedMethods())

export default router
