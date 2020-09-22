import React, {useContext, useEffect} from 'react';

import {View, Text, StyleSheet, BackHandler, Image} from 'react-native';
//Importamos las medidas del APP
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//Importamos la libreria de degradaciones
import LinearGradient from 'react-native-linear-gradient';
//Importamos la orientacion de MOBILE
import Orientation from 'react-native-orientation-locker';
//
import YoutubePlayer from 'react-native-youtube-iframe';
import {ScrollView} from 'react-native-gesture-handler';
//
import boplusContext from '../context/boplus/boplusContext';
//-------------------------------
const QdShow = ({navigation}) => {
  //Se pone en escucha el formato de ORIENTATION
  const {informacionqd, funcionPeticionInformacionQd} = useContext(
    boplusContext,
  );
  //Usamos los STATE LOCALES
  //
  useEffect(() => {
    funcionPeticionInformacionQd();
    console.log(informacionqd);
    Orientation.lockToPortrait();
    //Fucion que se usa para el boton de atras
    const backAction = () => {
      navigation.navigate('selector');
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#090909', '#090909', '#452f20']}
        style={styles.linearGradient}>
        <ScrollView>
          <View style={styles.seccion_0}>
            <View style={styles.seccion_0_1}>
              <Image
                style={styles.logo_boplus}
                source={require('../resource/img/logoFondoNegro.png')}
              />
            </View>
            <View style={styles.seccion_0_2}></View>
            <View style={styles.seccion_0_3}></View>
          </View>

          {informacionqd.map((item) => (
            <View key={item.id}>
              <Text style={styles.texto_qd}>{item.titulo}</Text>
              <YoutubePlayer
                key={item.id}
                height={DEVICE_HEIGHT * 0.3}
                play={false}
                videoId={item.direccion}
                showinfo={false}
              />
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  video: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.5,
    backgroundColor: 'black',
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
  logo_boplus: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.1,
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  texto_qd: {
    marginVertical: 20,
    color: 'white',
    fontFamily: 'PFBeauSansPro-Regular',
    fontSize: 15,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
});
export default QdShow;
