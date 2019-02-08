'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')
const { before, test, trait } = use('Test/Suite')('SMS Management')

trait('Test/ApiClient')
trait('Auth/Client')

const message = 'Hello test message.'

const senderData = {
  phone: '9039',
  username: 'sender',
  password: 'password',
  email: 'sender@mail.co.uk',
}

const recipientData = {
  phone: '9039',
  password: 'password',
  username: 'recipient',
  email: 'recipient@mail.co.uk'
}

let sender
let recipient

before(async () => {
  sender = await User.create(senderData)
  recipient = await User.create(recipientData)
})

test('a user can send an sms to another user', async ({ client }) => {
  const response = await client.post('messages').send({
    recipient: recipient.id,
    message,
  }).loginVia(sender, 'jwt').end()

  response.assertStatus(201)
  response.assertJSONSubset({
    message,
    sender_id: sender.id,
    recipient_id: recipient.id
  })
})

test('a user can get all messages sent to them', async ({ client }) => {
  const response = await client.get('messages').loginVia(recipient, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    message,
    sender: {
      username: senderData.username,
      email: senderData.email
    }
  }])
  await Message.query().where('sender_id', sender.id).where('recipient_id', recipient.id).firstOrFail()

})

test('a user can get all messages sent by them', async ({ client }) => {
  const response = await client.get('sent-messages').loginVia(sender, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    message,
    recipient: {
      email: recipientData.email,
      username: recipientData.username,
    }
  }])
})

test('a recipient can mark a message as read', async ({ assert, client }) => {
  const firstMessage = (await client.get('messages').loginVia(recipient, 'jwt').end()).body[0]

  const response = await client.put('read-message').send({
    message: firstMessage.id
  }).loginVia(recipient, 'jwt').end()

  response.assertStatus(200)

  assert.isNotNull((await Message.find(firstMessage.id)).read_at)
})

test('a user can delete their account', async ({ assert, client }) => {
  const response = await client.delete('user').send({ user: sender.id }).loginVia(sender, 'jwt').end()

  response.assertStatus(200)
  const messagesCount = ((await Message.all()).toJSON()).length
  assert.equal(0, messagesCount)
})