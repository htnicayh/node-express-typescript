import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils'

export const throwAsNext =
    (f: (request: Request, response: Response, next: NextFunction) => void) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            f(request, response, next)
        } catch (e) {
            logger.error(e.message)
            next(e)
        }
    }
