import React, { useState } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container } from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFPercentage } from "react-native-responsive-fontsize";
import api from '../services/Api';

function Main({ navigation }) {
    return (
        <Container style={{ alignItems: 'center' }}>
            <StatusBar style="dark" />
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/logo-schmidt.png')}
            />
            <TouchableOpacity style={styles.loadButton} onPress={async () => {
                navigation.navigate('QrScaner')
            }} >
                <Icon name="qrcode" style={styles.icon}></Icon>
                <Text style={styles.texto}>Iniciar Coletas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loadButton} onPress={async () => {
                navigation.navigate('List')
                //const reg = await MarksService.countRows();
                //alert(`Numero de registros ${reg}`);
            }}>
                <Icon name="list-alt" style={styles.icon}></Icon>
                <Text style={styles.texto}>Listar Registros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loadButton} onPress={async () => {
                navigation.navigate('Sync')
                //const reg = await MarksService.countRows();

                //const response = await api.get('marcacoes');
                //console.log(response.data);
                /*
                api.get('marcacoes')
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
                    */

                //alert(`Numero de registros ${reg}`);
            }}>
                <Icon name="paper-plane" style={styles.icon}></Icon>
                <Text style={styles.texto}>Sincronizar</Text>
            </TouchableOpacity>
        </Container>
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
        height: "20%",
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

export default Main;