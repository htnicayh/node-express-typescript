import { IsNotEmpty, MinLength, IsEmail, MaxLength, Matches } from 'class-validator'
import { Match } from '../decorators'

export class RegisterTransfer {
    @IsEmail({ require: true })
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password invalid',
    })
    username: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    @MinLength(6)
    @Match('password')
    rePassword: string
}
