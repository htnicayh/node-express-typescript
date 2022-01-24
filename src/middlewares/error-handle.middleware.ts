import { NextFunction, Request } from 'express'
import { logger } from '../utils'

export const throwAsNext = (
    func: (request: Request, response: Response, next: NextFunction) => void,
) => {
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            func(request, response, next)
        } catch (e) {
            logger.error(e.message)
            next(e)
        }
    }
}
