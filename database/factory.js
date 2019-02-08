'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Hash = use('Hash')
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    phone: faker.phone(),
    email: faker.email(),
    username: faker.username(),
    password: await Hash.make('password'),
  }
})
