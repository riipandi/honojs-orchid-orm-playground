import { change } from 'rake-db';

change(async (db) => {
  await db.createTable('comment', (t) => ({
    id: t.serial().primaryKey(),
    postId: t.integer().foreignKey('post', 'id').index(),
    text: t.text(),
    ...t.timestamps(),
  }));
});
