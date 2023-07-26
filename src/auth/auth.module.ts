import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'aValueThatShouldBeStoredInEnvironmentVariablesHehe',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
