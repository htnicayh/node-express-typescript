import express, { Application } from 'express'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import { corsMiddleware } from './middlewares'
import { routers } from './routes'
import { logger } from './utils'

async function bootstrap() {
    const app: Application = express()
    await createConnection()

    logger.info('Database Connected ...')

    app.use(express.json())
    app.use(
        express.urlencoded({
            extended: true,
        }),
    )
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

    for (const router of routers) {
        app.use(router.path, router.router)
    }

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
