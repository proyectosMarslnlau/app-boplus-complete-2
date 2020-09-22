import React, {useState, useContext, useEffect} from 'react';
//Importaciones de REACT NATIVE
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
//Importamos las medidas del APP
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//Importmaos las libreria de BOTONES de REACT NATIVE ELEMENTS
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//Context Alert
import alertContext from '../context/alert/alertContext';
//Carousel de Anuncio CAMBIAR
import CarouselAnuncio from '../item/CarouselAnuncio';
import CarouselTv from '../item/CarouselTv';

//Importamos el ITEM MODAL
import ModalContact from '../item/ModalContact';
//Importamos Componente de ALERT
import AlertError from '../item/AlertError';
//Importamos libreria de INTERNET
import {useNetInfo} from '@react-native-community/netinfo';
//--------------------------------------------
//Inicio del programa
//--------------------------------------------
const Selector = ({navigation}) => {
  //Declaracion del STATE CONTEXT
  const {funcionAlertError} = useContext(alertContext);
  //---- Verificacion de INTERNET
  const netInfo = useNetInfo();
  //State LOCALES
  const [modal, guardarModal] = useState(false);

  //------------------------------
  // USE EFFECT DE INICIO
  //-----------------------------
  useEffect(() => {
    //Funcion del boton de atras BACK HARDWARE
    const backAction = () => {
      ///+++++++++++++++++++++++++++++++++++++
      //Pregunta si realmente se desea SALIR
      Alert.alert('Salir', 'Esta seguro de Salir', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    //Ejecucion de la funcion de RETROCESO
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //--------------------------------------
  //Funcion direccion PROGRAMACION DE TV
  ///-------------------------------------
  const onPressBoPlus = () => {
    //Verifica si esta CONECTADO EN INTERNET
    if (netInfo.isConnected) {
      navigation.navigate('programacion');
    } else {
      let valorError = {
        estado: true,
        mensaje: 'Sin acceso a Internet, Verifique su Conexion',
      };
      //Se inicializa la ALERTA ERROR
      funcionAlertError(valorError);
    }
  };
  //-------------------------------
  //Funcion direccion Radio
  //-------------------------------
  const onPressRadio = () => {
    //Verifica si esta CONECTADO EN INTERNET
    if (netInfo.isConnected) {
      navigation.navigate('radio');
    } else {
      let valorError = {
        estado: true,
        mensaje: 'Sin acceso a Internet, Verifique su Conexion',
      };
      //Se inicializa la ALERTA ERROR
      funcionAlertError(valorError);
    }
  };
  //-------------------------------
  //Funcion Direccion QD
  //-------------------------------
  const onPressQd = () => {
    //Verifica si esta CONECTADO EN INTERNET
    if (netInfo.isConnected) {
      navigation.navigate('qdshow');
    } else {
      let valorError = {
        estado: true,
        mensaje: 'Sin acceso a Internet, Verifique su Conexion',
      };
      //Se inicializa la ALERTA ERROR
      funcionAlertError(valorError);
    }
  };
  //-------------------------------
  //Funcion CONTACTOS
  const onPressContact = () => {
    //Se inicializa el MODAL DE CONTACTOS
    guardarModal(true);
  };
  //--------------------------------------------------------
  // Programa SELECTOR
  //----------------------------------------------------------
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../resource/img/fondoboplus.gif')}
        style={styles.image}>
        <View style={styles.seccion_0}>
          <View style={styles.seccion_0_1}>
            <Image
              style={styles.logo}
              source={require('../resource/img/logoFondoNegro.png')}
            />
          </View>
          <View style={styles.seccion_0_2}></View>
          <View style={styles.seccion_0_3}>
            <Button
              title="Contactos"
              type="outline"
              buttonStyle={{
                borderColor: '#fff',
              }}
              titleStyle={{
                color: 'white',
                fontFamily: 'PFBeauSansPro-Regular',
                fontSize: 15,
              }}
              onPress={onPressContact}
            />
          </View>
        </View>
        <View style={styles.seccion_1}>
          <Button
            icon={
              <Icon name="tv" size={20} color="#ffd618" style={styles.icono} />
            }
            title="BoPlus TV"
            type="outline"
            buttonStyle={{
              paddingHorizontal: DEVICE_WIDTH * 0.1,
              borderRadius: 10,
              borderColor: '#FFB718',
              borderWidth: 1,
            }}
            titleStyle={{
              color: '#ffd618',
              fontFamily: 'PFBeauSansPro-BlackItalic',
              fontSize: 22,
            }}
            onPress={onPressBoPlus}
          />
        </View>
        <View style={styles.seccion_2}>
          <Button
            icon={
              <Icon
                name="volume-up"
                size={20}
                color="#DC5F13"
                style={styles.icono}
              />
            }
            title="BoPlus Radio"
            type="outline"
            buttonStyle={{
              backgroundColor: 'black',
              paddingHorizontal: DEVICE_WIDTH * 0.1,
              borderRadius: 10,
              borderColor: '#B21E27',
              borderWidth: 1,
            }}
            titleStyle={{
              color: '#DC5F13',
              fontFamily: 'PFBeauSansPro-Black',
              fontSize: 22,
            }}
            onPress={onPressRadio}
          />
        </View>
        <View style={styles.seccion_3}>
          <Button
            icon={
              <Icon
                name="youtube"
                size={20}
                color="#06DEF1"
                style={styles.icono}
              />
            }
            title="QD SHOW"
            type="outline"
            buttonStyle={{
              backgroundColor: 'black',
              paddingHorizontal: DEVICE_WIDTH * 0.1,
              borderRadius: 10,
              borderColor: '#0599D1',
              borderWidth: 1,
            }}
            titleStyle={{
              color: '#06DEF1',
              fontFamily: 'Smoolthan Regular',
              fontSize: 19,
            }}
            onPress={onPressQd}
          />
        </View>
        {/* ---------------------------------------------------------- */}
        <View style={styles.seccion_4}>
          <CarouselAnuncio />
        </View>
        {/* ----------------------------------------------------------- */}
        <ModalContact guardarModal={guardarModal} modal={modal} />
        {/* ----------------------------------------------------------- */}
      </ImageBackground>
      <AlertError />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  ///-------------------------------- BACKGROUND TOTAL
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  //---------------------------------- SECCION BANNER DE ENTRADA
  seccion_0: {
    height: DEVICE_HEIGHT * 0.15,
    flex: 1,
    flexDirection: 'row',
  },
  seccion_0_1: {
    width: DEVICE_WIDTH * 0.4,
    justifyContent: 'center',
  },
  seccion_0_2: {
    width: DEVICE_WIDTH * 0.3,
  },
  seccion_0_3: {
    width: DEVICE_WIDTH * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.1,
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  //------------------------------------ SECCION DE BOTON TV BOPLUS
  seccion_1: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: DEVICE_HEIGHT * 0.2,
  },
  //------------------------------------- SECCION  DE BOTON RADIO BOPLUS
  seccion_2: {
    alignItems: 'center',
    justifyContent: 'center',

    height: DEVICE_HEIGHT * 0.2,
  },
  //-------------------------------------- SECCION DE BOTON QDSHOW
  seccion_3: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: DEVICE_HEIGHT * 0.2,
  },
  //---------------------------------------- SECCION DE CAROUSEL DE PUBLICIDAD
  seccion_4: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DEVICE_HEIGHT * 0.25,
  },
  //---------------------------------------- STYLE Y VARIOS
  icono: {
    marginHorizontal: 5,
  },
});
export default Selector;
