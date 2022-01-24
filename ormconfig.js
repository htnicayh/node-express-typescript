module.exports = {
    type: 'mysql',
    host: process.env.HOST || 'localhost',
    port: process.env.POST || 3306,
    username: process.env.ACCOUNT || 'root',
    password: process.env.PASSWORD || 'Hyacinth130620',
    database: process.env.NAME || 'node',
    charset: 'UTF8',
    synchronize: process.env.NODE_ENV !== 'production',
    entities: [
        '**/**.entity.ts'
    ],
    logging: 'error',
    migrations: ['migration/*.ts'],
    cli: {
        migrationsDir: 'migration'
    },
    connectTimeout: 20000,
    acquireTimeout: 20000
}