import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO userName NO DEBE ESTAR  VACIO ' })
  @ApiProperty({
    description: 'USERNAME DEL USUARIO',
    example: 'juanCamilito',
  })
  readonly userName: string;

  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO email NO DEBE ESTAR  VACIO ' })
  @IsEmail()
  @ApiProperty({
    description: 'EMAIL DEL USUARIO',
    example: 'juanCamilito@gmail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO password NO DEBE ESTAR  VACIO ' })
  @Length(6)
  @ApiProperty({ description: 'PASSWORD DEL USUARIO', example: 'juanCa12451' })
  readonly password: string;
  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO fullName NO DEBE ESTAR  VACIO ' })
  @ApiProperty({
    description: 'NOMBRE COMPLETO',
    example: 'juan camilo montoya moreno',
  })
  readonly fullName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
