import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get('role', context.getHandler())
    if (!role) {
      return true
    }
    const request = context.switchToHttp().getRequest()

    const user = await new Promise<any>((resolve, reject) => {
      request.sessionStore.get(request.sessionID, (error, sessionData) => {
        if (error) {
          new UnauthorizedException()
        } else if (sessionData) {
          resolve(sessionData.user)
        } else {
          reject(new UnauthorizedException())
        }
      })
    })

    if (user) {
      if (user.role == role) {
        return true
      } else {
        throw new UnauthorizedException()
      }
    }
  }
}
