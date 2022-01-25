import { Request } from 'express'

export interface RequestThrow<T> extends Request {
    payload?: T
}
