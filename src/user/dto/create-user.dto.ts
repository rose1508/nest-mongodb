/* eslint-disable prettier/prettier */
import {
    // IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';
import { Connection } from 'mongoose';
const PasswordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,9}$/;
export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 cahracters.' })
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 caharcters.' })
    // @IsAlphanumeric(null, { message: 'Username does not allow other than alpha numeric chars.', })
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsInt()
    age: number;

    @IsString()
    @IsEnum(['f', 'm', 't'])
    gender: string;

    connections:Connection[];

    @IsNotEmpty()
    @Matches(PasswordRegEx, { message: 'password must contain minimum 8 and maximum 9 characters,at least one uppercase letter,one lowercase letter,one number and one special character' })
    password:string;
}
