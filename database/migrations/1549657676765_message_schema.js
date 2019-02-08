'use strict'

const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.text('message')
      table.integer('sender_id')
      table.integer('recipient_id')
      table.timestamp('read_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
