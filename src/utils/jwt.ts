import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenData } from '../interfaces'
import { logger } from './logger'

export const generate = (
    payload: TokenData | Buffer,
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

export const verify = (token: string, secretSignature: string): Promise<TokenData> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (error: Error, payload: TokenData) => {
            if (!error) {
                resolve(payload)
            } else {
                logger.error(error.message)
                reject(error)
            }
        })
    })
}
