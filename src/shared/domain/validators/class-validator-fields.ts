import { validateSync } from 'class-validator'
import {
  FieldsErrors,
  ValidartosFieldsInterces,
} from './validartos-fields.interces'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidartosFieldsInterces<PropsValidated>
{
  errors: FieldsErrors = null
  validateData: PropsValidated = null

  validate(data: any): boolean {
    const errors = validateSync(data)

    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property
        this.errors[field] = Object.values(error.constraints)
      }
    } else {
      this.validateData = data
    }
    return !errors.length
  }
}
