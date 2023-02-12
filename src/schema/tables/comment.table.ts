import { BaseTable } from '../baseTable'
import { PostTable } from './post.table'
import { tableToZod } from 'orchid-orm-schema-to-zod'

export type Comment = CommentTable['columns']['type']
export class CommentTable extends BaseTable {
    table = 'comment'
    columns = this.setColumns((t) => ({
        id: t.serial().primaryKey(),
        postId: t
            .integer()
            .foreignKey(() => PostTable, 'id')
            .index(),
        text: t.text(5, 1000),
        ...t.timestamps(),
    }))

    relations = {
        post: this.belongsTo(() => PostTable, {
            primaryKey: 'id',
            foreignKey: 'postId',
        }),
    }
}

export const commentSchema = tableToZod(CommentTable)
