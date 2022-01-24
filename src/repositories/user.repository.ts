import { getRepository } from 'typeorm'
import UserEntity from '../entities/user.entity'

export const UserRepository = getRepository(UserEntity)
