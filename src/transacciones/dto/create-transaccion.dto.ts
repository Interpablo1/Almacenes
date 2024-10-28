import { IsInt, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransaccionDto {
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @IsNotEmpty()
  id_almacen: number;

  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @IsEnum(['Entrada', 'Salida'])
  tipo_transaccion: 'Entrada' | 'Salida';

  @IsString()
  @IsNotEmpty()
  usuario_responsable: string;
}
