import { UnprocessableEntityException } from '@nestjs/common'


export class ValidationException extends UnprocessableEntityException {
  constructor(public ValidationErrors: {}) {
    super()
  }
}