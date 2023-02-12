import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { etag } from 'hono/etag'
import { jwt } from 'hono/jwt'

import { r as userRoutes } from './routes/user'
import { r as postRoutes } from './routes/post'

// Create new instance
const app = new Hono()

// Register global middlewares and default route
app.use('*', etag())
app.use('*', prettyJSON())
app.use('/auth/*', async (c, next) => {
    const auth = jwt({ secret: 'secr3t' })
    return await auth(c, next)
})

// Handle the error and return the customized Response.
app.onError((err, c) => c.json({ code: 500, message: err.message }, 500))
app.notFound((c) => c.json({ code: 404, message: 'Not Found' }, 404))

app.get('/', (c) => c.text('Hono meets Node.js'))
app.get('/auth/page', (c) => c.text('You are authorized'))

// Register application routes
app.route('/users', userRoutes)
app.route('/posts', postRoutes)

serve({
    fetch: app.fetch,
    port: 8000,
})
