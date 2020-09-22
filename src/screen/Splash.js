import React, {useEffect} from 'react';

import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
//Importar libreria de VIDEO
import Video from 'react-native-video';
//Importamos la libreria de MEDIDAS
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//Importamos la orientacion de MOBILE
import Orientation from 'react-native-orientation-locker';
//Importamos la libreria de degradaciones
import LinearGradient from 'react-native-linear-gradient';
///----------------------------------------------------------------
const Splash = ({navigation}) => {
  //------------------------
  //USE EFECT DE INICIO
  useEffect(() => {
    //Bloqueamos la orientacion solo a PORTRAIT
    Orientation.lockToPortrait();
    //Le damos un tiempo de de 9 segundos para la animacion de entrada
    setTimeout(() => {
      //Nos dirigimos a SCREEN SELECTOR
      navigation.navigate('selector');
    }, 9000);
  }, []);
  //------------------------------------------
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#090909', '#090909', '#452f20']}
        style={styles.linearGradient}>
        <Video
          source={require('../resource/video/boplus2.mp4')} // Can be a URL or a local file.
          //source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
          style={styles.video}
          repeat={false}
          resizeMode="stretch"
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  //-----------------------------------------VIDEO
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
});
export default Splash;
