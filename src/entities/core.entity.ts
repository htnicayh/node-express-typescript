import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

export default class CoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number
}
