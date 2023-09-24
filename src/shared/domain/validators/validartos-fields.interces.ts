export type FieldsErrors = {
  [field: string]: string[]
}

export interface ValidartosFieldsInterces<PropsValidated> {
  errors: FieldsErrors
  validateData: PropsValidated
  validate(data: any): boolean
}
