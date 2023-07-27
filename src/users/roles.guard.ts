import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extracting required roles (reflector reads metadata)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // if there is no decorator or there's no role in its parameters
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // extracting user from http request
    const { user } = context.switchToHttp().getRequest();

    const roleNames: string[] = [];
    for (const element of user.roles) {
      roleNames.push(element.name);
    }

    return requiredRoles.some((role) => roleNames.includes(role));
  }
}
