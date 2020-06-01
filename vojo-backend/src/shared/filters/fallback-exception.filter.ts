import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'FallbackExceptionFilter'
    )

    return response.status(500).json({
      error: {
        message: "Um erro inesperado ocorreu. Tente novamente."
      }
    })
  }
}