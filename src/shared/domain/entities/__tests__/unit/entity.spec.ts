import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit test', () => {
  let entity: StubEntity

  it('Should set props and id ', () => {
    const props = {
      prop1: 'prop1',
      prop2: 2,
    }

    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Should accept a valid uuid ', () => {
    const props = {
      prop1: 'prop1',
      prop2: 2,
    }
    const id = '4f82a4b5-8d0a-4708-bac9-874ef1d3cab9'

    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Should convert a entity to a js Object ', () => {
    const props = {
      prop1: 'prop1',
      prop2: 2,
    }
    const id = '4f82a4b5-8d0a-4708-bac9-874ef1d3cab9'

    const entity = new StubEntity(props, id)

    expect(entity.toJson()).toStrictEqual({
      id,
      ...props,
    })
  })
})
