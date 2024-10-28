import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { InventarioModule } from './inventario/inventario.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { AlertasModule } from './alertas/alertas.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE === 'prod'
          ? { rejectUnauthorized: false }
          : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AlmacenesModule,
    ProveedoresModule,
    ProductosModule,
    InventarioModule,
    CommonModule,
    OrdenesModule,
    AlertasModule,
    TransaccionesModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
