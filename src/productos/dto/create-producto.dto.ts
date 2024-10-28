import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nombre_producto: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  codigo_barras: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  categoria: string;

  @IsNumber()
  stock_actual: number;

  @IsNumber()
  stock_minimo: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  precio_unitario: number;
}
