import React, {useState, useEffect, useContext, useRef} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  ScrollView,
  Dimensions,
} from 'react-native';
//--------------------
import alertContext from '../context/alert/alertContext';
//Importamos la libreria de HOOKS
import useDeviceOrientation from '@rnhooks/device-orientation';
//Importamos la libreria de VIDEO
import VideoPlayer from 'react-native-video-controls';
//Importamos las medidas de RESOLUCION
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//Importamos la libreria de GRADIENTES
import LinearGradient from 'react-native-linear-gradient';
//Importamos los ICONOS
import {Icon} from 'react-native-elements';
//Importamos la orientacion de MOBILE
import Orientation from 'react-native-orientation-locker';
//
import {Button} from 'react-native-elements';

//-----------------------------------------------------------------
//Inicio de programa
//------------------------------------------------------------------
const Tv = ({navigation}) => {
  //State Locales
  const [orientacion, guardarOrientacion] = useState('portrait');

  //Importamos useState estas son las medidas iniciales del VIDEO
  const [medidas, guardarMedidas] = useState({
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.5,
  });

  //---------------------------------------------------------------
  const {funcionAlertError} = useContext(alertContext);

  //-------------------------------------------------------
  //Creasmos la funcion que se incluira en el video
  //-------------------------------------------------------
  const style_video = () => {
    return {
      width: medidas.width,
      height: medidas.height,
    };
  };
  //-------------
  //Funciones
  const onPressPantallaCompleta = () => {
    Orientation.lockToLandscape();
    guardarMedidas({
      width: DEVICE_HEIGHT,
      height: DEVICE_WIDTH * 0.95,
    });
    guardarOrientacion('landscape');
  };
  //----------------------------------------------------
  const loadErrorCarga = () => {
    let valorError = {
      estado: true,
      mensaje: 'BoPlus no Disponible. Intente mas Tarde',
    };
    funcionAlertError(valorError);
    navigation.navigate('selector');
  };
  return (
    <View>
      {orientacion === 'landscape' ? null : (
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
      )}

      <View style={style_video()}>
        <VideoPlayer
          source={{
            uri:
              'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
          }}
          //https://livestreamingperu.com:8081/boliviajoven/tracks-v1a1/mono.m3u8
          //https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4
          onError={loadErrorCarga}
          disableBack
          disableFullscreen
          disableVolume
          disableSeekbar
          repeat={true}
          style={styles.video}
        />
      </View>
      <Button
        icon={
          <Icon
            name="external-link"
            size={20}
            color="#ffd618"
            type="evilicon"
            style={styles.icono}
          />
        }
        title="Ver Pantalla Completa"
        type="outline"
        buttonStyle={{
          paddingHorizontal: DEVICE_WIDTH * 0.1,
          borderRadius: 10,
          borderColor: '#FFB718',
          borderWidth: 1,
          backgroundColor: '#090909',
        }}
        titleStyle={{
          color: '#ffd618',
          fontFamily: 'PFBeauSansPro-Thin',
          fontSize: 15,
          fontWeight: '600',
        }}
        onPress={onPressPantallaCompleta}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'red',
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
  //--------------------------
  seccion_1: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.9,
  },

  //----------------------------------
  seccion_texto: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.05,
    backgroundColor: 'black',
  },
  texto_programacion: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PFBeauSansPro-Thin',
    marginLeft: DEVICE_WIDTH * 0.08,
    paddingBottom: 10,
  },
  icono: {},
  //-----------------------------------
  seccion_2: {
    backgroundColor: 'black',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.35,
  },
  tinyLogo: {
    width: DEVICE_WIDTH,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.35,
  },
});
export default Tv;
