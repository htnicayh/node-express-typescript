import { Router } from 'express'
import { getUsersController } from '../controllers'
import { throwAsNext } from '../middlewares'

const path = '/user'
const router: Router = Router()

router.get('/all', throwAsNext(getUsersController))

export default {
    path,
    router,
}
