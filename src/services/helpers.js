import { DatabaseConnection } from './Database';

var db = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
        this.InitDb()
    }

    InitDb() {
        var sql = [
            //`DROP TABLE IF EXISTS marcacoes;`

            `create table if not exists marcacoes (
            MAR_CdiMarcacao integer primary key autoincrement,
            MAR_CosMatricula text,
            MAR_DtdDataHora text
            );`,

            `create table if not exists contratados (
                CON_CdiContratado integer primary key autoincrement,
                CON_CosMatricula text,
                CON_CosFilial text,
                CON_DssNome text,
                CON_DssSituacao text
            );`,

            `create table if not exists configuracoes (
                CFG_CdiConfiguracao integer primary key autoincrement,
                CFG_CosFilial text,
                CFG_CosDispositivo text
            );
            `
        ];

        console.log('iniciando DB');

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}