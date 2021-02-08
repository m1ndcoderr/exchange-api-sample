import { PrimaryKey, Property } from '@mikro-orm/core'

export abstract class Base {
  @PrimaryKey()
  id!: number

  @Property({ columnType: 'timestamp', hidden: true })
  createdAt = new Date()

  @Property({ columnType: 'timestamp', hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date()
}
