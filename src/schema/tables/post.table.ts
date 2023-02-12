import { BaseTable } from '../baseTable'
import { CommentTable } from './comment.table'
import { tableToZod } from 'orchid-orm-schema-to-zod'

export type Post = PostTable['columns']['type']
export class PostTable extends BaseTable {
    table = 'post'
    columns = this.setColumns((t) => ({
        id: t.serial().primaryKey(),
        title: t.text(3, 100).unique(),
        text: t.text(20, 10000),
        ...t.timestamps(),
    }))

    relations = {
        comments: this.hasMany(() => CommentTable, {
            primaryKey: 'id',
            foreignKey: 'postId',
        }),
    }
}

export const postSchema = tableToZod(PostTable)
