import { Entity, Property, Unique } from '@mikro-orm/core'
import { Base } from '.'

@Entity()
@Unique({ properties: ['username'] })
export class User extends Base {
  @Property({ columnType: 'varchar' })
  username: string

  @Property({ columnType: 'varchar' })
  pass: string

  constructor(username: string, pass: string) {
    super()
    this.username = username
    this.pass = pass
  }
}
