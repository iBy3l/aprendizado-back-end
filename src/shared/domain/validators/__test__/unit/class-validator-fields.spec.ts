import * as libClassValidator from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubClassValidatorFields extends ClassValidatorFields<{
  field1: string
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('should return true if validation with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toBeNull()
    expect(sut.validateData).toBeNull()
  })

  it('should validate with errors ', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field1', constraints: { isRequired: 'Test error' } },
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validateData).toBeNull()
    expect(sut.errors).toStrictEqual({ field1: ['Test error'] })
  })

  it('should validate withount errors ', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field1: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validateData).toStrictEqual({ field1: 'value' })
    expect(sut.errors).toBeNull()
  })
})
