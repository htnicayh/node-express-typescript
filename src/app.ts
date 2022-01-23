import express, { Response } from 'express';

async function bootstrap() {
    const app: express.Application = express();

    app.get('/', (_: unknown, res: Response) => {
        res.send('Hello');
    });

    app.listen(3000, () => {
        console.log('Server is running at http://localhost:3000');
    });
}

(async () => {
    try {
        await bootstrap();
    } catch (e) {
        console.log(e.message);
    }
})();
