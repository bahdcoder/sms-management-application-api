'use strict'

const Model = use('Model')

class Message extends Model {

  /**
   * Fields to be treated as dates
   * 
   * @return
   */
  static get dates () {
    return super.dates.concat(['read_at'])
  }
  /**
   * Get the sender of a message
   * 
   * @return
   */
  sender() {
    return this.belongsTo('App/Models/User', 'sender_id')
  }

  /**
   * Get the sender of a message
   * 
   * @return
   */
  recipient() {
    return this.belongsTo('App/Models/User', 'recipient_id')
  }
}

module.exports = Message
