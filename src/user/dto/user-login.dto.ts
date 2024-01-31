/* eslint-disable prettier/prettier */
import { IsAlphanumeric, IsNotEmpty , Matches, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
const PasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$*!%&?])[a-zA-Zd@!$%*&?]{8,20}$/;
export class LoginUserDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 caharcters.' })
    @IsAlphanumeric(null, { message: 'Username does not allow other than alpha numeric chars.', })
    username: string;

    @IsNotEmpty()
    @Matches(PasswordRegEx, { message: 'password must contain minimum 8 and maximum 9 characters,at least one uppercase letter,one lowercase letter,one number and one special character', })
    password: string;
}
