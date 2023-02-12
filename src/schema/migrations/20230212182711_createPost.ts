import { change } from 'rake-db'

change(async (db) => {
    await db.createTable('post', (t) => ({
        id: t.serial().primaryKey(),
        title: t.text().unique(),
        text: t.text(),
        ...t.timestamps(),
    }))
})
