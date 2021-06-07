import { Marks } from '../models/Marks';
import { DatabaseConnection } from './Database';

const table = "marcacoes"
const db = DatabaseConnection.getConnection()

export default class MarksService {

    static addData(param: Marks) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (MAR_CosMatricula, MAR_DtdDataHora) 
                values (?, ?)`,
                    [param.MAR_CosMatricula, param.MAR_DtdDataHora],
                    (_, { insertId, rows }) => {
                        console.log("id insert: " + insertId);
                        resolve(insertId)
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
            }, (txError) => {
                console.log(txError);
            }));
    }

    static deleteById(MAR_CdiMarcacao: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
                tx.executeSql(`delete from ${table} where MAR_CdiMarcacao = ?;`, [MAR_CdiMarcacao], (_, { rows }) => {
                    resolve();
                }), (sqlError) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);
            }
        ));
    }


    static updateById(param: Marks) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set MAR_CosMatricula = ? where MAR_CdiMarcacao = ?;`, [param.MAR_CosMatricula, param.MAR_CdiMarcacao], () => {
                resolve();
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findById(MAR_CdiMarcacao: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where MAR_CdiMarcacao=?`, [MAR_CdiMarcacao], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))
    }

    static countRows() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select count(*) as count from ${table}`, [], (_, { rows }) => {
                let total = rows._array[0];
                resolve(total.count)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))
    }


}