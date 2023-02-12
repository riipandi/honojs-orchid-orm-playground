import { Hono } from 'hono'
import { db } from '../schema/database'

export const r = new Hono()

r.get('/', async (c) => {
    const posts = await db.post.selectAll()
    return c.json(posts)
})

r.get('/:id', (c) => {
    const id = c.req.param('id')
    return c.text('Get post: ' + id)
})

r.post('/', (c) => c.text('Create post'))
