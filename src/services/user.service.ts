import UserEntity from '../entities/user.entity'
import { CreateUserInterface } from '../interfaces'
import { UserRepository } from '../repositories/user.repository'

const getUserByUserName = async (username: string): Promise<UserEntity> => {
    const user = await UserRepository.findOne({
        username,
    })
    return user
}

const getUsers = async (): Promise<UserEntity[]> => {
    const users = await UserRepository.find()
    return users
}

const getUserByID = async (id: number): Promise<UserEntity> => {
    const user = await UserRepository.findOne({
        id,
    })
    return user
}

const createUser = async (payload: CreateUserInterface): Promise<UserEntity> => {
    const { username, password } = payload
    await UserRepository.save(new UserEntity(username, password))
    const user = await getUserByUserName(username)
    return user
}

export const userService = {
    getUserByUserName,
    getUserByID,
    getUsers,
    createUser,
}
