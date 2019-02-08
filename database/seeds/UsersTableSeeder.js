'use strict'

/*
|--------------------------------------------------------------------------
| UsersTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class UsersTableSeeder {
  async run () {
    await Factory.model('App/Models/User').createMany(5)
  }
}

module.exports = UsersTableSeeder
