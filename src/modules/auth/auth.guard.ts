import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from './auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const sessionId = request.headers['x-session-id'] || request.sessionID
    
    const user = await new Promise<any>((resolve, reject) => {
      request.sessionStore.get(sessionId, (error, sessionData) => {
        if (error) {
          new UnauthorizedException()
        } else if (sessionData) {
          resolve(sessionData.user)
        } else {
          reject(new UnauthorizedException())
        }
      })
    })

    if (!user) {
      throw new UnauthorizedException()
    }
    return true
  }
}
