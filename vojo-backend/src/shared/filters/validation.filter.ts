import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { ValidationException } from '@/shared/exceptions/validation.exception'

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'ValidationFilter'
    )
    console.log(exception)
    return response.status(422).json({
      error: {
        message: 'Um ou mais campos inválidos',
        fields: exception.ValidationErrors
      }
    })
  }
}