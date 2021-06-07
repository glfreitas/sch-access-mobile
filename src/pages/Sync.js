import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, NativeModules } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, GREEN, Styles, YELLOWLIGHT } from './Styles';
import { RFPercentage } from "react-native-responsive-fontsize";
import Constants from 'expo-constants';

import MarksService from '../services/MarksServices';

import ContratadosService from '../services/ContratadosServices';
import { Contratados } from '../models/Contratados';

import api from '../services/Api';

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

function Sync({ navigation }) {

    const [totalMarks, setTotalMarks] = useState(0);
    const [atualMarks, setAtualMarks] = useState(0);

    const [totalContratados, setTotalContratados] = useState(0);
    const [atualContratados, setAtualContratados] = useState(0);

    const [marcacoes, setMarcacoes] = useState([]);
    const [deviceID, setDeviceID] = useState(
        Constants.deviceId.replace(/-/g, '').substr(0, 10).toUpperCase()
    );
    const [sync, setSync] = useState(false);

    /** Função Sincronizar Marcações */
    async function handleSyncMarcacoes() {
        const marcacoes = await MarksService.findAll();

        setTotalMarks(marcacoes.length);
        setMarcacoes(marcacoes._array);

        setAtualMarks(0);

        if (marcacoes.length === 0) {
            //alert('Nenhum registro a sincronizar!');
            return false;
        }

        console.log('oi')

        for (const mark of marcacoes) {
            setAtualMarks((prevState) => prevState + 1);

            mark.MAR_CosFilial = '0102';
            mark.MAR_CosDispositivo = deviceID;

            await api.post('marcacoes', mark)
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });
            
            await MarksService.deleteById(mark.MAR_CdiMarcacao);
        }

    };

    /** Função Sincronizar Marcações */
    async function handleSyncContratados() {
        const response = await api.get('contratados');

        if (response.status != 200) {
            alert('Falha na sincronização: \n' + response.statusText);
            return false;
        }

        setTotalContratados(response.data.length);
        setAtualContratados(0);

        await ContratadosService.deleteAll();

        for (const contratado of response.data) {
            setAtualContratados((prevState) => prevState + 1);

            let cont: Contratados = new Contratados();

            cont.CON_CosMatricula = contratado.CON_CosMatricula;
            cont.CON_CosFilial = contratado.CON_CosFilial;
            cont.CON_DssNome = contratado.CON_DssNome;
            cont.CON_DssSituacao = contratado.CON_DssSituacao;

            const insertId = await ContratadosService.addData(cont);
            /*
            if (insertId == null || insertId == undefined) {
                alert("Não foi possivel inserir o registro do contratado")
            } else {
                console.log("Inserido: ${contratado.CON_CosMatricula}");
            }
            */
        }
    };

    /** Função Sincronizar */
    async function handleSync() {

        setSync(true);

        const syncMarcacoes = await handleSyncMarcacoes();

        const syncContratados = await handleSyncContratados();

        alert('Processo concluido!');
        setSync(false);

    };

    return (
        <Container style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <View style={styles.containerTitle}>
                <Text style={Styles.questionText}>SINCRONIZAR REGISTROS</Text>
            </View>

            <View style={styles.containerTitle}>
                <Text style={Styles.questionText}>MARCAÇÕES</Text>
                <Text style={Styles.disabledText}>Enviando {atualMarks} de {totalMarks}</Text>
            </View>

            <View style={styles.containerTitle}>
                <Text style={Styles.questionText}>FUNCIONÁRIOS</Text>
                <Text style={Styles.disabledText}>Sincronizando {atualContratados} de {totalContratados}</Text>
            </View>

            <View style={{ alignItems: 'center', margin: 10 }}>
                <TouchableOpacity
                    disabled={sync}
                    style={{
                        backgroundColor: GREEN,
                        height: '40%',
                        borderRadius: 10,
                        width: '80%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    activeOpacity={sync}
                    onPress={() => handleSync()} >
                    <Icon name="spinner" style={styles.icon}></Icon>
                    <Text style={styles.texto}>Sincronizar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ top: 20, margin: 5 }}>



            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 60,
                backgroundColor: 'transparent',
                //height: '10%',
                zIndex: 100,
                //alignSelf: 'stretch'
            }}>
                <TouchableOpacity
                    style={{ position: 'absolute', left: 10, top: 10, height: 50, width: 50, backgroundColor: 'transparent' }}
                    onPress={async () => { navigation.navigate('Main') }} >
                    <Icon name="sign-out" style={styles.icon}></Icon>
                </TouchableOpacity>
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerview: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width: "100%",
    },

    containerTitle: {
        borderColor: GREEN,
        borderWidth: 2,
        borderRadius: 10,
        //height: 50,
        //justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        //width: '100%',
        //top: 20,
        //backgroundColor: GREEN,
    },

    loadButton: {
        width: '90%',
        height: "30%",
        backgroundColor: '#0d4d35',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        textShadowColor: '#ffea9c',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    texto: {
        fontSize: RFPercentage(5),
        color: '#ffea9c',
    },

    icon: {
        fontSize: RFPercentage(5),
        color: '#ffea9c',
    },

    tinyLogo: {
        height: "20%",
        width: "90%",
        resizeMode: 'contain',
        marginBottom: 10,
    },
    item: {
        backgroundColor: GREEN,
        padding: 10,
        marginVertical: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    title: {
        fontSize: 12,
        color: YELLOWLIGHT,
    },

});

export default Sync;