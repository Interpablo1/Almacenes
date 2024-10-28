import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateInventarioDto {
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @IsNotEmpty()
  id_almacen: number;

  @IsInt()
  @IsNotEmpty()
  stock_actual: number;
}
