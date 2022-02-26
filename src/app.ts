import express, { Application } from 'express'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import { catchAsError, corsMiddleware } from './middlewares'
import { routers } from './routes'
import { logger, sessionApp } from './utils'

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
    app.use(sessionApp)
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
    app.use(morgan('dev'))

    for (const router of routers) {
        app.use(router.path, router.router)
    }

    app.use(catchAsError)

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
