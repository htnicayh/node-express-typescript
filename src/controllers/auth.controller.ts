import { Request, Response } from 'express'
import { HTTP_CODE, MESSAGE } from '../constants'
import UserEntity from '../entities/user.entity'
import { TokenData } from '../interfaces'
import { getUserByUserName, registerUser } from '../services'
import { RegisterTransfer } from '../transfers'
import { compare, error, generate, hash, logger, success } from '../utils'

export const login = async (request: Request, response: Response): Promise<void> => {
    const { username, password } = request.body
    if (username && password) {
        const user: UserEntity = await getUserByUserName(username)
        if (user) {
            const userPw: string = user.password
            const compareHash: boolean = await compare(password, userPw)
            if (compareHash) {
                const { id, username, role } = user
                const payload: TokenData = {
                    id,
                    username,
                    role,
                }
                const token = await generate(payload, process.env.SECRET_TOKEN, { expiresIn: '1d' })
                if (token) {
                    logger.debug(payload)
                    success(response, token, HTTP_CODE.SUCCESS, role)
                } else {
                    error(response, null, HTTP_CODE.UNAUTHORIZE, MESSAGE.AUTHEN.MISSING_TOKEN)
                }
            } else {
                error(response, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.PASSWORD_INCORRECT)
            }
        } else {
            error(response, null, HTTP_CODE.ERROR, MESSAGE.INVALID_PARAMS)
        }
    } else {
        error(response, null, HTTP_CODE.ERROR, MESSAGE.INVALID_PARAMS)
    }
}

export const register = async (request: Request, response: Response): Promise<void> => {
    const payload: RegisterTransfer = request.body
    if (payload) {
        const { email, username, password } = payload
        const user = await getUserByUserName(username)
        if (!user) {
            const hashPw = await hash(password)
            const payload = {
                email: email,
                username: username,
            }
            await registerUser({
                ...payload,
                password: hashPw,
                rePassword: hashPw,
            })

            logger.debug(payload)
            success(response, payload, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS)
        } else {
            error(response, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.AUTHEN.UNAUTHORIZE)
        }
    } else {
        error(response, null, HTTP_CODE.ERROR, MESSAGE.INVALID_PARAMS)
    }
}
