'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('', async ({ auth, response }) => {
  const User = use('App/Models/User')
  const userResponse = []
  const users = await User.all()

  for (const user of users.rows) {
    const token = await auth.generate(user)

    userResponse.push({
      ...user.toJSON(),
      token
    })
  }

  return response.ok(userResponse)
})

Route.group(() => {
  Route.resource('messages', 'MessageController')
  Route.get('sent-messages', 'MessageController.sentByMe')
  Route.delete('user', 'UserController.delete')
  Route.put('read-message', 'MessageController.markAsRead')
}).middleware('auth')
