import { Response } from 'express'

export const success = (
    response: Response,
    data: unknown,
    status: number,
    message: string,
): void => {
    response.status(status)
    response.json({
        data,
        success: true,
        message,
    })
}

export const error = (response: Response, data: unknown, status: number, message: string): void => {
    response.status(status)
    response.json({
        data,
        error: true,
        message,
    })
}
