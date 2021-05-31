import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, GREEN, Styles, YELLOWLIGHT } from './Styles';
import { RFPercentage } from "react-native-responsive-fontsize";

import MarksService from '../services/MarksServices';

const Item = ({ MAR_CdiMarcacao, MAR_CosMatricula, MAR_DtdDataHora }) => (
    <View style={styles.item}>
        <View style={{ width: "10%" }}>
            <Text style={styles.title}>{MAR_CdiMarcacao}</Text>
        </View>
        <View style={{ width: "50%" }}>
            <Text style={styles.title}>{MAR_CosMatricula}</Text>
        </View>
        <View style={{ width: "40%" }}>
            <Text style={styles.title}>{MAR_DtdDataHora}</Text>
        </View>
    </View>
);

function List({ navigation }) {

    const [lista, setLista] = useState({});
    const [total, setTotal] = useState(0);

    async function listar() {

        let dados = await MarksService.findAll();

        setLista(dados._array);
        setTotal(dados.length);
    }

    useEffect(() => {

        listar();

    }, []);

    const renderItem = ({ item }) => (
        <Item MAR_CdiMarcacao={item.MAR_CdiMarcacao} MAR_CosMatricula={item.MAR_CosMatricula} MAR_DtdDataHora={item.MAR_DtdDataHora} />
    );

    return (
        <Container>
            <StatusBar style="dark" />
            <View style={styles.containerTitle}>
                <Text style={Styles.questionText}>Total de Registros: {total}</Text>
            </View>
            <SafeAreaView style={styles.containerview}
            >
                <FlatList //style={{ flex: 1 }}
                    data={lista}
                    renderItem={renderItem}
                    keyExtractor={item => item.MAR_CdiMarcacao.toString()}
                />
            </SafeAreaView>
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
        height: 40,
        borderRadius: 10
    },
    title: {
        fontSize: 12,
        color: YELLOWLIGHT,
    },

});

export default List;