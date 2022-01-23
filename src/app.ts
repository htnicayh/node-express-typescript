import express, { Application } from 'express'
import morgan from 'morgan'
import logger from './utils/logger'
import { corsMiddleware } from './middlewares/cors.middleware'

async function bootstrap() {
    const app: Application = express()

    logger.info('Connected')

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(corsMiddleware)

    app.use(
        morgan('combined', {
            stream: {
                write: (message: string) => {
                    logger.info(message)
                },
            },
        }),
    )

    app.listen(3000, () => {
        console.log('Server is running at http://localhost:3000')
    })
}

(async () => {
    try {
        await bootstrap()
    } catch (e) {
        console.log(e.message)
    }
})()
