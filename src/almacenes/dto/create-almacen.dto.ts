import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAlmacenDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nombre_almacen: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  direccion: string;

  @IsString()
  @Length(1, 20)
  telefono_contacto: string;
}
