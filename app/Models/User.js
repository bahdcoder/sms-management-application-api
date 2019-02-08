'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const Message = use('App/Models/Message')

class User extends Model {

  static get hidden () {
    return ['password', 'email', 'created_at', 'updated_at']
  }
  
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    /**
     * 
     * A hook to delete all user messages before deleting user account
     * 
     */
    this.addHook('beforeDelete', async (userInstance) => {
      await Message.query().where('sender_id', userInstance.id).orWhere('recipient_id', userInstance.id).delete()
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  /**
   * Get messages sent by this user
   * 
   * @return
   */
  messages () {
    return this.hasMany('App/Models/Message', 'sender_id')
  }

  /**
   * Get messages received by this user.
   * 
   * @return
   */
  receivedMessages () {
    return this.hasMany('App/Models/Message', 'recipient_id')
  }
}

module.exports = User
