import { IsInt, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateAlertaDto {
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @IsNotEmpty()
  id_almacen: number;

  @IsEnum(['Stock Bajo', 'Stock Crítico'])
  tipo_alerta: 'Stock Bajo' | 'Stock Crítico';

  @IsEnum(['Activa', 'Resuelta'])
  estado_alerta: 'Activa' | 'Resuelta';
}
