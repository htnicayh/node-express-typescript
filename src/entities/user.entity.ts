import { Column, Entity } from 'typeorm'
import CoreEntity from './core.entity'

@Entity('users', { orderBy: { id: 'ASC' } })
export default class UserEntity extends CoreEntity {
    @Column({ name: 'email', unique: true, default: null })
    email: string

    @Column({ name: 'username' })
    username: string

    @Column({ name: 'password' })
    password: string

    @Column({ name: 'role' })
    role: string

    constructor(username: string, password: string) {
        super()
        this.username = username
        this.password = password
        this.role = 'user'
    }
}
