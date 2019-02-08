'use strict'

const User = use('App/Models/User')

class UserController {
  async delete({ request, response }) {
    const user = await User.findOrFail(request.input('user'))

    await user.delete()

    return response.ok({ message: 'user deleted.' })
  }
}

module.exports = UserController
