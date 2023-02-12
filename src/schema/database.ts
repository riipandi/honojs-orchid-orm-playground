import { orchidORM } from 'orchid-orm'
import { config } from './config'
import { PostTable } from './tables/post.table'
import { CommentTable } from './tables/comment.table'

export const db = orchidORM(config.database, {
    post: PostTable,
    comment: CommentTable,
})
