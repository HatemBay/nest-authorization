import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { RolesGuard } from './users/roles.guard';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
