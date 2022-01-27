import { getRepository } from 'typeorm'
import UserEntity from '../entities/user.entity'
import { CreateUserInterface } from '../interfaces'

const getUserByUserName = async (username: string): Promise<UserEntity> => {
    const repository = getRepository(UserEntity)
    const user = await repository.findOne({
        username,
    })
    return user
}

const getUsers = async (): Promise<UserEntity[]> => {
    const repository = getRepository(UserEntity)
    const users = await repository.find()
    return users
}

const getUserByID = async (id: number): Promise<UserEntity> => {
    const repository = getRepository(UserEntity)
    const user = await repository.findOne({
        id,
    })
    return user
}

const createUser = async (payload: CreateUserInterface): Promise<UserEntity> => {
    const repository = getRepository(UserEntity)
    const { username, password } = payload
    await repository.save(new UserEntity(username, password))
    const user = await getUserByUserName(username)
    return user
}

export const userService = {
    getUserByUserName,
    getUserByID,
    getUsers,
    createUser,
}
