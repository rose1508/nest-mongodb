/* eslint-disable prettier/prettier */
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString
} from 'class-validator';
export class CreateConnectionDto {

    @IsNotEmpty()
    @IsInt()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsInt()
    connection_user_id: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['followed', 'connected', 'pending'])
    connection_status: string;

}
