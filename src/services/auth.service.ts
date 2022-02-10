import { getConnection, getRepository } from 'typeorm'
import UserEntity from '../entities/user.entity'
import { RegisterTransfer } from '../transfers/register.transfer'

export const getUserByUserName = async (username: string): Promise<UserEntity> => {
    const repository = getRepository(UserEntity)
    const user = await repository
        .createQueryBuilder('users')
        .where('users.username = :username', { username: username })
        .getOne()
    return user
}

export const registerUser = async (payload: RegisterTransfer): Promise<void> => {
    const { email, username, password } = payload
    const role = 'user'
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            email: email,
            username: username,
            password: password,
            role: role,
        })
        .execute()
}
