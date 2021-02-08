import { hash } from 'argon2'
import { Seeder } from '.'
import { User } from '../entities'
import { DI } from '../main'

export class UserSeeder implements Seeder {
  async seed(): Promise<void> {
    if ((await DI.userRepo.count()) === 0) {
      const username = 'test'
      const pass = await hash('test')
      await DI.userRepo.persistAndFlush(new User(username, pass))
    }
  }
}
