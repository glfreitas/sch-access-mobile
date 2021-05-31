import styled from 'styled-components';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { RFPercentage } from "react-native-responsive-fontsize";

export const GREEN = '#0d4d35'; //Verde escuro
export const YELLOWDARK = '#fcdb00'; //Amarelo escuro
export const YELLOWLIGHT = '#ffea9c'; //Amarelo claro
export const BLACK = '#000000'; //Preto
export const WHITE = '#ffffff'; //Branco
export const RED = '#ff0000'; //Vermelho

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const buttonsHeight = (windowHeight > 700 ? 150 : 90);

export const Container = styled(LinearGradient).attrs({
    colors: ['#fff', '#fcdb00'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    //alignItems: 'center',
    //justifyContent: 'center',
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const Styles = StyleSheet.create({
    answersContainer: {
        /*
        width: '90%',
        maxHeight: '20%',
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        */
    },
    surveyContainer: {
        width: '90%',
        height: '100%',
        padding: 5,
    },
    navButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: "30%"
    },
    enabledButton: {
        flex: 1,
        flexDirection: 'row',
        color: GREEN,
        backgroundColor: GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        maxHeight: buttonsHeight,
        //height: buttonsHeight,
        marginBottom: 20,
    },
    disabledButton: {
        flex: 1,
        flexDirection: 'row',
        color: 'transparent',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: GREEN,
        borderRadius: 10,
        maxHeight: buttonsHeight,
        //height: buttonsHeight,
        marginBottom: 20,
    },
    enabledText: {
        color: YELLOWLIGHT,
        marginLeft: 5,
        marginRight: 5,
        fontSize: RFPercentage(3),
    },
    disabledText: {
        color: GREEN,
        marginLeft: 5,
        marginRight: 5,
        fontSize: RFPercentage(3),
    },
    enabledIcon: {
        color: YELLOWLIGHT,
        fontSize: RFPercentage(3),
    },
    disabledIcon: {
        color: GREEN,
        fontSize: RFPercentage(3),
    },

    selectionGroupContainer: {
        width: "100%",
        height: "70%",
        /*justifyContent: 'flex-start',
        alignContent: 'center',*/
        /*flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',*/
    },/*
  background: {
      flex: 1,
      minHeight: 800,
      maxHeight: 800,
      justifyContent: 'center',
      alignItems: 'center',
  },*/
    questionText: {
        color: GREEN,
        marginBottom: 20,
        fontSize: RFPercentage(4),
    },
    textBox: {
        width: "100%",
        height: "70%",
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,

        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10,
        fontSize: RFPercentage(3),
    },/*
  numericInput: {
      borderWidth: 1,
      borderColor: 'rgba(204,204,204,1)',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      textAlignVertical: 'top',
      marginLeft: 10,
      marginRight: 10
  },
  infoText: {
      marginBottom: 20,
      fontSize: 20,
      marginLeft: 10
  },*/
    surveyContainerCompleted: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: GREEN
    },
    surveyCompletedIcon: { fontSize: RFPercentage(10), textAlign: 'center', color: YELLOWLIGHT, marginBottom: 20 },
    surveyCompletedText: { fontSize: RFPercentage(5), textAlign: 'center', color: YELLOWLIGHT, marginBottom: 20 },

    botoesQR: { position: 'absolute', left: 10, top: 10, height: 50, width: 50, backgroundColor: '#000' },


});
