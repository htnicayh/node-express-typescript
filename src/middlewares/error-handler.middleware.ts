import { NextFunction, Request, Response } from 'express'
import { logger, error } from '../utils'
import { ErrorCatch } from '../interfaces'

export const throwAsNext = (
    f: (request: Request, response: Response, next: NextFunction) => void,
) => {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            f(request, response, next)
        } catch (e) {
            logger.error(e.message)
            next(e)
        }
    }
}

export const catchAsError = (err: ErrorCatch, _: Request, response: Response): void => {
    if (typeof err === 'string') {
        response.send(error(response, null, 400, err))
    } else {
        let message = 'unknown-error'
        if (err.status >= 400 && err.status <= 500) {
            message = 'client-error'
        } else {
            message = 'server-error'
        }
        response.status(err.status || 500)

        response.send(error(response, null, err.status, message))
    }
}
