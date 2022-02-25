module.exports = {
    type: 'mysql',
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.ACCOUNT,
    password: process.env.PASSWORD,
    database: process.env.NAME,
    charset: 'utf8',
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