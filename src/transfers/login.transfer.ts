import { IsNotEmpty, MinLength, IsString, Matches } from 'class-validator'
import { REGAX } from '../constants'

export class LoginTransfer {
    @IsNotEmpty()
    @IsString()
    @Matches(REGAX, { message: 'Username invalid' })
    public username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(REGAX, { message: 'Password invalid' })
    public password: string

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
}
