# SMS Management API

### How to run project
This project is built on the adonis framework. To make development faster, install the adonis cli using the command `npm install -g @adonisjs/cli`

 - Clone repository
 - Install npm dependencies
 - Create a file `.env` at project root, and use `.env.example` as a sample to setup your environment variables. For database, setup mysql or sqlite3. your choice.
 - Be sure to generate application key using `adonis key:generate`
 - Run migrations using command `adonis migration:run`
 - Run seeders using command `adonis seed`
 - Run application using `adonis serve --dev`
 - Run application tests using `adonis test`
 - To get a list of users with authentication tokens for them, make api request to `https://localhost:3333/`


#### API DOCUMENTATION / Available endpoints

All endpoints are authenticated except `/` which is used to retrieve users with jwt for them
To authenticate a request, add an authorization header `Authorization: Bearer <AUTH_TOKEN_HERE>`

 - `Send message POST /messages`: This endpoint takes in the `recipient` field in the body, the `message` to be sent and the sender must be authenticated.
 - `Get all received messages GET /messages`: This endpoint gets all messages received by the authenticated user.
 - `Get all sent messages GET /sent-messages`: This endpoint gets all messages sent by the authenticated user.
 - `Mark a message as read PUT /read-message`: This endpoint marks a message as read for a recipient.
 - `Delete a user account DELETE /user`: This endpoint deletes a user's account, thereby deleting all their messages. This endpoint takes in the `user` field in the body, which represents the id of the user to be deleted.

 For more details on all requests, please refer to the tests.
