import { Contratados } from '../models/Contratados';
import { DatabaseConnection } from './Database';

const table = "contratados"
const db = DatabaseConnection.getConnection()

export default class ContratadosService {


    static addData(param: Contratados) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (CON_CosMatricula, CON_CosFilial, CON_DssNome, CON_DssSituacao) 
                values (?, ?, ?, ?)`,
                    [param.CON_CosMatricula, param.CON_CosFilial, param.CON_DssNome, param.CON_OplDesativado],
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

    static deleteById(CON_CosMatricula: string) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where CON_CosMatricula = ?;`, [CON_CosMatricula], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);
            });
    }

    static deleteAll() {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table}`, [], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);
            });
    }


    static updateById(param: Contratados) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set CON_CosMatricula = ?, CON_CosFilial = ?, CON_DssNome = ?, CON_DssSituacao = ?  where CON_CosMatricula = ?;`, [param.CON_CosMatricula, param.CON_CosFilial, param.CON_DssNome, param.CON_DssSituacao, param.CON_CosMatricula], () => {
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findById(CON_CosMatricula: string) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where CON_CosMatricula=?`, [CON_CosMatricula], (_, { rows }) => {
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