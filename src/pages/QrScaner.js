import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, GREEN, RED, Styles, WHITE, YELLOWLIGHT } from './Styles';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';
import moment from 'moment';

import MarksService from '../services/MarksServices';
import { Marks } from '../models/Marks';

import ContratadosService from '../services/ContratadosServices';
import { Contratados } from '../models/Contratados';


function QrScaner({ navigation }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [barcodeState, setBarcodeState] = useState({ cameraDirection: 'back' });
    const [type, setType] = useState(BarCodeScanner.Constants.Type.front);
    const [Barcodetype, setBarcodeType] = useState([BarCodeScanner.Constants.BarCodeType.qr]);
    const [mensagem, setMensagem] = useState('Aproxime seu crachá!');
    const [contratado, setContratado] = useState([])
    const [bgMensagem, setBgMensagem] = useState(GREEN);
    const [fonteMensagem, setFonteMensagem] = useState(YELLOWLIGHT);

    async function playSoundSucess() {

        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/success.wav')
        );

        await sound.playAsync();
    }

    async function playSoundFail() {

        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/fail.wav')
        );

        await sound.playAsync();

    }

    const insertMark = (item) => {
        let file: Marks = new Marks()
        file.MAR_CosMatricula = item
        file.MAR_DtdDataHora = moment(new Date()).format("DD-MM-YYYY HH:mm:ss")

        //console.log(moment(new Date()).format("DD-MM-YYYY HH:mm:ss"));

        const insertId = MarksService.addData(file);
        if (insertId == null || insertId == undefined) {
            alert("Não foi possivel inserir o registro")
        }
    }

    const validaContratado = async (MAR_CosMatricula) => {

        let Contratado = await ContratadosService.findById(MAR_CosMatricula);
        await setContratado(Contratado._array);
        //console.log(Contratado._array);
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {

        setScanned(true);
        setContratado([]);

        console.log(type);

        const mark = {
            MAR_CdiMarcacao: 1,
            MAR_CosMatricula: data
        }

        await validaContratado(data);

        if (contratado.length > 0) {
            playSoundSucess();

            await setBgMensagem(GREEN);
            await setFonteMensagem(YELLOWLIGHT);

            await setMensagem('Colaborador: ' + contratado[0].CON_DssNome + '\nMatricula: ' + contratado[0].CON_CosMatricula);
            //console.log(contratado[0].CON_DssNome);
            insertMark(data);
        } else {

            await setBgMensagem(RED);
            await setFonteMensagem(WHITE);

            await setMensagem('COLABORADOR NÃO ENCONTRADO');
            playSoundFail();
        }

        //setMensagem(`Colaborador: ${data}`);
        //alert(`Codigo escaneado ${type} dados ${data} foi escaneado!`);
        setTimeout(() => {
            setBgMensagem(GREEN);
            setFonteMensagem(YELLOWLIGHT);
            setMensagem('Aproxime seu crachá!');
            setScanned(false);
        }, 3000);
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão de câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera</Text>;
    }

    return (
        <Container>
            <StatusBar style="dark" />
            <View
                style={{
                    height: '20%',
                    backgroundColor: bgMensagem,
                    zIndex: 100,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ color: fonteMensagem, fontSize: 20 }}>{mensagem}</Text>
            </View>

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                //style={StyleSheet.absoluteFillObject}
                style={{ height: '80%', alignSelf: 'stretch' }}
                BarCodePoint={0, 0}
                BarCodeSize={'100%', '100%'}
                type={type}
                Barcodetype={Barcodetype}
            >
                < BarcodeMask edgeColor="#62B1F6" width={'90%'} height={'70%'} showAnimatedLine />
            </BarCodeScanner >
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

                <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 10, height: 50, width: 50, backgroundColor: 'transparent' }}
                    onPress={() => {
                        setType(
                            type === BarCodeScanner.Constants.Type.back
                                ? BarCodeScanner.Constants.Type.front
                                : BarCodeScanner.Constants.Type.back
                        );
                    }}>
                    <Icon name="camera" style={styles.icon}></Icon>
                </TouchableOpacity>
            </View>
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }

});

export default QrScaner;