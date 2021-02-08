import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import classValidatorConfig from '../config/class-validator.config'

export default async function (cls: ClassConstructor<object>, plain: any): Promise<string[]> {
  const dto = plainToClass(cls, plain)
  const errors = await validate(dto, classValidatorConfig)
  if (errors.length !== 0) {
    const errorMessages: string[] = [].concat.apply(
      [],
      errors.map(e => Object.values(e.constraints!))
    )
    return errorMessages
  }
  return []
}
