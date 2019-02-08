'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {
  /**
   * Show a list of all messages sent to auth user.
   * GET messages
   */
  async index ({ auth, response }) {
    const user = await auth.getUser()
    const messages = await Message.query().where('recipient_id', user.id).with('sender').fetch()

    return response.ok(messages)
  }

  /**
   * Show a list of all messages sent by auth user.
   * GET sent-messages
   */
  async sentByMe({ auth, response }) {
    const user = await auth.getUser()
    const messages = await Message.query().where('sender_id', user.id).with('recipient').fetch()

    return response.ok(messages)
  }

  /**
   * Create/save a new message.
   * POST messages
   */
  async store ({ auth, request, response }) {
    const sender = await auth.getUser()

    const recipient = await User.findOrFail(request.input('recipient'))

    const message = await Message.create({
      sender_id: sender.id,
      recipient_id: recipient.id,
      message: request.input('message')
    })

    return response.created(message)
  }

  /**
   * Update message to read.
   * PUT or PATCH messages/:id
   */
  async markAsRead ({ request, response }) {
    const message = await Message.findOrFail(request.input('message'))

    message.read_at = new Date()

    await message.save()

    return response.ok(message)
  }

  /**
   * Delete a message with id.
   * DELETE messages/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MessageController
