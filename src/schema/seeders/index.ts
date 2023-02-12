import { db } from '../database'

export const seed = async () => {
    await db.post.findBy({ title: 'Sample post' }).orCreate({
        title: 'Post',
        text: 'This is a text for a sample post. It contains words, spaces, and punctuation.',
        comments: {
            create: [
                {
                    text: 'Nice post!',
                },
                {
                    text: `Too long, didn't read`,
                },
            ],
        },
    })

    await db.$close()
}
