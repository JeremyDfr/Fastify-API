// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,

    url: 'mongodb://localhost:27017/todo-api'
})

// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({hello: 'world'})
})

fastify.post('/task', (request, reply) => {
    const taskRequest = request.body;
    const taskCollection = fastify.mongo.db.collection('todo')

    taskCollection.insertOne(taskRequest, (err, result) => {
        if (err) {
            reply.send(err)
        } else {
            reply.send(result)
        }
    })
})

fastify.get('/tasks', (request, reply) => {
    const taskCollection = fastify.mongo.db.collection('todo')

    taskCollection.find().toArray((err, result) => {
        if (err) {
            reply.send(err)
        } else {
            reply.send(result)
        }
    })
})

fastify.get('/task/:id', (request, reply) => {
    const taskCollection = fastify.mongo.db.collection('todo')

    const id = this.mongo.ObjectId(request.params.id)
    taskCollection.findOne({_id: id}, (err, result) => {
        if (err) {
            reply.send(err)
        } else {
            reply.send(result)
        }
    })
})

fastify.put('/task/:id', (request, reply) => {
    const taskCollection = fastify.mongo.db.collection('todo')

    const id = this.mongo.ObjectId(request.params.id)
    taskCollection.updateOne({_id: id}, {$set: request.body}, (err, result) => {
        if (err) {
            reply.send(err)
        } else {
            reply.send(result)
        }
    })
})

fastify.delete('/task/:id', (request, reply) => {
    const taskCollection = fastify.mongo.db.collection('todo')

    const id = this.mongo.ObjectId(request.params.id)
    taskCollection.deleteOne({_id: id}, (err, result) => {
        if (err) {
            reply.send(err)
        } else {
            reply.send(result)
        }
    })
})

// Run the server!
fastify.listen({port: 3000}, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})