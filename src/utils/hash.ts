import bcrypt from 'bcrypt'
import { logger } from './logger'

export const hash = (password: string): Promise<string> => {
    const salts: string = bcrypt.genSaltSync(12)
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salts, (error: unknown, hash: string) => {
            if (!error) {
                resolve(hash)
            } else {
                logger.debug(error)
                reject(error)
            }
        })
    })
}

export const compare = (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (error: Error, results: boolean) => {
            if (!error) {
                logger.debug(results)
                resolve(results)
            } else {
                logger.debug(error.message)
                reject(error)
            }
        })
    })
}
