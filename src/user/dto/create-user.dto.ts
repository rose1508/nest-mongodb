/* eslint-disable prettier/prettier */
import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';
const PasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$*!%&?])[a-zA-Zd@!$%*&?]{8,20}$/;
export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 cahracters.' })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 caharcters.' })
    @IsAlphanumeric(null, { message: 'Username does not allow other than alpha numeric chars.', })
    username: string;
    @IsNotEmpty()
    @IsEmail(null, { message: 'please provide valid Email.' })
    email: string;

    @IsInt()
    age: number;

    @IsString()
    @IsEnum(['f', 'm', 't'])
    gender: string;

    @IsNotEmpty()
    @Matches(PasswordRegEx, { message: 'password must contain minimum 8 and maximum 9 characters,at least one uppercase letter,one lowercase letter,one number and one special character', })
    password: string;
}
