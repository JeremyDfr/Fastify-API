'use strict'

module.exports = async function (fastify, opts) {
    fastify.register(require('@fastify/mongodb'), {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,

        url: 'mongodb://localhost:27017/todo-api'
    })

    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    fastify.post('/task', function (request, reply) {
        const taskRequest = request.body;
        const taskCollection = this.mongo.db.collection('todo')

        taskCollection.find(taskRequest, (err, result) => {
            if (err) {
                reply.send(err)
            } else {
                reply.send(result)
            }
        })
    })
}