import { Column, Entity } from 'typeorm'
import CoreEntity from './core.entity'

@Entity('users', { orderBy: { id: 'ASC' } })
export default class UserEntity extends CoreEntity {
    @Column({ name: 'email', unique: true, default: null, type: 'varchar' })
    email: string

    @Column({ name: 'username', type: 'varchar' })
    username: string

    @Column({ name: 'password', type: 'varchar' })
    password: string

    @Column({ name: 'role', type: 'varchar', default: 'user' })
    role: string

    constructor(username: string, password: string) {
        super()
        this.username = username
        this.password = password
        this.role = 'user'
    }
}
