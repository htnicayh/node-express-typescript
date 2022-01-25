import jwt, { SignOptions } from 'jsonwebtoken'
import { logger } from './logger'
import { TokenInterface } from '../interfaces'

export const generate = (
    payload: TokenInterface | Buffer,
    secretSignature: string,
    options: SignOptions,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secretSignature,
            options || { noTimestamp: true },
            (error: Error, token: string) => {
                if (!error) {
                    resolve(token)
                } else {
                    logger.error(error.message)
                    reject(error)
                }
            },
        )
    })
}

export const verify = (token: string, secretSignature: string): Promise<TokenInterface> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (error: Error, payload: TokenInterface) => {
            if (!error) {
                resolve(payload)
            } else {
                logger.error(error.message)
                reject(error)
            }
        })
    })
}
