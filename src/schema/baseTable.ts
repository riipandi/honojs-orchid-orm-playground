import { createBaseTable } from 'orchid-orm'

export const BaseTable = createBaseTable({
    columnTypes: (t) => ({
        ...t,
        text: (min = 0, max = Infinity) => t.text(min, max),
        timestamp: <P extends number>(precision?: P) => t.timestamp<P>(precision).asDate(),
    }),
})
