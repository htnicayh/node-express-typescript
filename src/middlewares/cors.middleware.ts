import cors, { CorsOptions } from 'cors'

const corsOptions: CorsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

export const corsMiddleware = cors(corsOptions)
