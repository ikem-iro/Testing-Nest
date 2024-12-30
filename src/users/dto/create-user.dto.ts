import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'role must be one of INTERN, ENGINEER, ADMIN',
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
