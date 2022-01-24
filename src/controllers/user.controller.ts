import { Request, Response } from 'express'
import { HTTP_CODE, MESSAGE } from '../constants'
import { userService } from '../services'
import { error, logger, success } from '../utils'

export const getUsersController = async (request: Request, response: Response): Promise<void> => {
    try {
        const users = await userService.getUsers()
        return success(response, users, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS)
    } catch (e) {
        logger.error(e)
        return error(response, null, HTTP_CODE.ERROR, MESSAGE.ERROR)
    }
}
