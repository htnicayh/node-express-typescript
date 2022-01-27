import express, { Application } from 'express'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import { corsMiddleware } from './middlewares'
import { routers } from './routes'
import { logger } from './utils'

async function bootstrap() {
    const app: Application = express()
    const PORT = 3000
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

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}

(async () => {
    try {
        await bootstrap()
    } catch (e) {
        console.log(e.message)
    }
})()
