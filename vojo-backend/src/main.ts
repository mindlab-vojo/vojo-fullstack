import 'module-alias/register'
import 'dotenv/config'

import { Logger, ValidationPipe, ValidationError } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

import { FallbackExceptionFilter, HttpExceptionFilter, ValidationFilter } from '@/shared/filters'
import { ValidationException } from '@/shared/exceptions'

const port = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    exposedHeaders: [
      'Content-Length',
      'Vojo-Authorization',
      'Vojo-Client-Origin'
    ]
  })

  app.useGlobalFilters(new FallbackExceptionFilter(), new HttpExceptionFilter(), new ValidationFilter())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      let fields = {}

      errors.map(err => {
        fields = {
          ...fields,
          [err.property]: err.value ? 'Campo inválido.' : 'Campo obrigatório.',
        }
      })

      return new ValidationException(fields)
    }
  }))

  await app.listen(port)
  Logger.log(`Server started on port ${port}`, 'Bootstrap')
}

bootstrap()
