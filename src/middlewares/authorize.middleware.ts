import { NextFunction } from 'express'
import { MESSAGE } from '../constants'
import { TokenInterface } from '../interfaces'
import { RequestThrow } from '../types'

export const isAdmin = (
    request: RequestThrow<TokenInterface>,
    _: unknown,
    next: NextFunction,
): void => {
    const tokenDecode: TokenInterface = request.payload
    if (tokenDecode?.role === 'admin') {
        next()
    } else {
        next(MESSAGE.AUTHEN.UNAUTHORIZE)
    }
}
