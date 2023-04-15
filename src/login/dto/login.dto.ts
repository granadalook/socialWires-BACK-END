import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO userName NO DEBE ESTAR  VACIO ' })
  @ApiProperty({
    description: 'USERNAME DEL USUARIO',
    example: 'CamilitoFeliz',
  })
  readonly userName: string;

  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO password NO DEBE ESTAR  VACIO ' })
  @ApiProperty({ description: 'PASSWORD DEL USUARIO', example: 'Camilito1234' })
  readonly password: string;
}
