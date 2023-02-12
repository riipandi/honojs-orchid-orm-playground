import { Hono } from 'hono'

export const r = new Hono()

r.get('/', (c) => {
    return c.text('List users')
})

r.get('/:id', (c) => {
    const id = c.req.param('id')
    return c.text('Get user: ' + id)
})

r.post('/', (c) => c.text('Create user'))
