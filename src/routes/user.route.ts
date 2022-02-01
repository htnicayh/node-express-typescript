import { Router } from 'express'
import { getUsersController } from '../controllers'
import { throwAsNext } from '../middlewares'
import { authenticate } from '../middlewares/authenticate.middleware'

const path = '/user'
const router: Router = Router()

router.get('/all', authenticate, throwAsNext(getUsersController))

export default {
    path,
    router,
}
