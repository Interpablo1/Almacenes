import { IsInt, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateOrdenDto {
  @IsInt()
  @IsNotEmpty()
  id_proveedor: number;

  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @IsNotEmpty()
  cantidad_ordenada: number;

  @IsEnum(['Pendiente', 'Completada', 'Cancelada'])
  estado_orden: 'Pendiente' | 'Completada' | 'Cancelada';
}
