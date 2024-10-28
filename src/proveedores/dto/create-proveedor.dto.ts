import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nombre_proveedor: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  direccion: string;
}
