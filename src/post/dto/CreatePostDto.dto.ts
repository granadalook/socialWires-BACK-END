import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({
    message: 'EL CAMPO title NO DEBE ESTAR  VACIO ',
  })
  @ApiProperty({ description: 'USUARIO DEL POST', example: 'mi  nuevo post' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO texto NO DEBE ESTAR  VACIO ' })
  @ApiProperty({ description: 'TEXTO DEL POST', example: 'Nuevo post' })
  readonly texto: string;

  @IsString()
  @IsNotEmpty({ message: 'EL CAMPO userId NO DEBE ESTAR  VACIO ' })
  @ApiProperty({
    description: 'ID DEL USIARIO QUE CREO EL POST',
    example: '02d43c36-47ce-4c6e-ae52-bfce1239e719',
  })
  readonly userId: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
