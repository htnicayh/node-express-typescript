import { createClient } from 'redis'

export const redisClient = createClient()

redisClient.on('error', (error) => {
    console.log('Redis-Error ' + error)
})
