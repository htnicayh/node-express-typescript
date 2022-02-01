import { NextFunction, Response } from 'express'
import { HTTP_CODE, MESSAGE } from '../constants'
import UserEntity from '../entities/user.entity'
import { TokenData } from '../interfaces'
import { getUserByUserName } from '../services'
import { RequestThrow } from '../types'
import { error, logger, verify } from '../utils'

export const authenticate = async (
    request: RequestThrow<TokenData>,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { authorization } = request.headers
    if (authorization && authorization.match(/^Bearer /g)) {
        const token: string = authorization.split(' ')[1]
        if (token) {
            try {
                const tokenDecode: TokenData = await verify(token, process.env.SECRET_TOKEN)
                const { username } = tokenDecode
                const user: UserEntity = await getUserByUserName(username)
                if (user) {
                    request.payload = tokenDecode
                    next()
                } else {
                    return error(response, null, HTTP_CODE.ERROR, MESSAGE.AUTHEN.INVALID_TOKEN)
                }
            } catch (e) {
                logger.error(e)
                return error(response, null, HTTP_CODE.ERROR, MESSAGE.AUTHEN.INVALID_TOKEN)
            }
        } else {
            return error(response, null, HTTP_CODE.ERROR, MESSAGE.AUTHEN.INVALID_TOKEN)
        }
    } else {
        return error(response, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.AUTHEN.MISSING_TOKEN)
    }
}
