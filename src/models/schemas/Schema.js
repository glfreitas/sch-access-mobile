import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'marks',
            columns: [
                { name: 'MAR_CdiMarcacao', type: 'number' },
                { name: 'MAR_CosMatricula', type: 'string' },
                { name: 'MAR_DtdDataHora', type: 'number' },
            ]
        }),
    ]
})

/*
export default class MarksSchema {
    static schema = {
        name: 'Marks',
        primaryKey: 'MAR_CdiMarcacao',
        properties: {
            MAR_CdiMarcacao: { type: 'int', indexed: true },
            MAR_CosMatricula: 'string',
            MAR_DtdDataHora: 'date',
        },
    };
}
*/