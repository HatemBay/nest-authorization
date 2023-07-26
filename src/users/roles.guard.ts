import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // extracting require roles
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler,
      context.getClass,
    ]);

    return true;
  }
}
