import { Router } from 'express'
import { login, register } from '../controllers'
import { throwAsNext } from '../middlewares'

const path = '/'
const router: Router = Router()

router.post('/login', throwAsNext(login))

router.post('/register', throwAsNext(register))

export default {
    path,
    router,
}
