import React, {useState, useEffect, useContext} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  BackHandler,
  ImageBackground,
} from 'react-native';
//Importamos la medidas del dispositivo
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//Importamos la libreria de la RADIO
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';
//Importamos la libreria de AUDIO VOLUMEN
import {SliderVolumeController} from 'react-native-volume-controller';
//Importamos la libreria de GRADIENTES
import LinearGradient from 'react-native-linear-gradient';
//Importamos el Carousel de RADIO
import CarouselRadio from '../item/CarouselRadio';
import CarouselAnuncioRadio from '../item/CarouselAnuncioRadio';
//
import boplusContext from '../context/boplus/boplusContext';
//Context Alert
import alertContext from '../context/alert/alertContext';
//------------------------------------------------------------
//Inicio del programa
//------------------------------------------------------------
const Radio = ({navigation}) => {
  //
  //Declaracion del STATE CONTEXT
  const {funcionAlertError} = useContext(alertContext);
  //
  const {
    imagenpublicidadprincipal,
    funcionPeticionPublicidadPrincipal,
  } = useContext(boplusContext);
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //---------------------------------------------------------
  const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
  ];
  //-------------------------------------
  useTrackPlayerEvents(events, (event) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      let valorError = {
        estado: true,
        mensaje: 'BoPlus Radio no Disponible. Intente mas Tarde',
      };
      funcionAlertError(valorError);
      navigation.navigate('selector');
    }
  });
  //Usamos los STATE LOCALES
  useEffect(() => {
    funcionPeticionPublicidadPrincipal();
    //Fucion que se usa para el boton de atras
    const backAction = async () => {
      guardarEstado('Stop');
      await TrackPlayer.stop();
      config();
      navigation.navigate('selector');
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  //-----------------------------------------------------------
  //INSTANCIAMOS LA RADIO
  //---------------------------------------------------------
  const playbackState = usePlaybackState();
  const [estado, guardarEstado] = useState('Play');
  //---------------------------------------------
  const config = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
    TrackPlayer.addEventListener('remote-play', (event) => {
      guardarEstado('Stop');
      TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause', (event) => {
      guardarEstado('Pause');
      TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-stop', () => {
      guardarEstado('Play');
      TrackPlayer.destroy();
    });
  };
  //---------------------------------------------------------------
  //Configuracionde usuario INICIALES
  ///--------------------------------------------------------------
  const toglePlay = async () => {
    //http://streamingv2.shoutcast.com/japanimradio-fm
    const currentTrack = await TrackPlayer.getCurrentTrack();
    config();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: 'local-track',
        url: 'https://conectperu.com/8134/stream',
        title: 'BOLIVIA JOVEN',
        artist: 'Radio',
        artwork: 'https://boplus.tv/img_apk/img_tv/boplusprincipal.jpg',
        duration: 28,
      });
      guardarEstado('Stop');
      await TrackPlayer.play();
      //config();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        guardarEstado('play');

        await TrackPlayer.play();
      } else {
        guardarEstado('pause');
        await TrackPlayer.pause();
      }
    }
  };
  //----------------------------------------------------------
  const onPress = async () => {
    try {
      guardarEstado('Play');
      await TrackPlayer.stop();
      config();
    } catch (_) {}
  };
  //------------------------------------------
  const onPress2 = async () => {
    toglePlay();
  };
  //-------------
  const onPressFacebook = () => {
    Linking.openURL('fb://profile/100048286309201')
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Linking.openURL('https://www.facebook.com/boplus.canal.9')
          .then((data) => {
            console.log('Facebook Open');
          })
          .catch(() => {
            let valorError = {
              estado: true,
              mensaje:
                'No cuenta con alguna Aplicación que pueda abrir la dirección',
            };
            //Se inicializa la ALERTA ERROR
            funcionAlertError(valorError);
          });
      });
  };
  const onPressWhatsapp = () => {
    Linking.openURL('whatsapp://send?phone=59171562642')
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        let valorError = {
          estado: true,
          mensaje:
            'No cuenta con la Aplicacion Whatsapp Instalado en su Dispositivo',
        };
        //Se inicializa la ALERTA ERROR
        funcionAlertError(valorError);
      });
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#090909', '#090909', '#452f20']}
        style={styles.linearGradient}>
        <View style={styles.seccion_1}>
          <View style={styles.seccion_1_1}>
            <Image
              style={styles.logo}
              source={require('../resource/img/logoFondoNegro.png')}
            />
          </View>
          <View style={styles.seccion_1_2}></View>
          <View style={styles.seccion_1_3}></View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#452f20', '#090909', '#090909']}
        style={styles.linearGradient}>
        <View style={styles.seccion_2}>
          <View style={styles.seccion_2_2}>
            <TouchableOpacity onPress={onPressWhatsapp}>
              <Image
                style={styles.logo_redes}
                source={require('../resource/img/whatsapp.png')}
              />
            </TouchableOpacity>
            <Text style={styles.titulo_encabezado}>Whatsapp</Text>
          </View>
          <View style={styles.seccion_2_3}>
            <TouchableOpacity onPress={onPressFacebook}>
              <Image
                style={styles.logo_redes}
                source={require('../resource/img/facebook.png')}
              />
            </TouchableOpacity>

            <Text style={styles.titulo_encabezado}>Facebook</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.seccion_3}>
        <View style={styles.seccion_3_1}>
          <Text style={styles.texto_reproduccion}>{estado}</Text>
          {estado !== 'Stop' ? (
            <TouchableOpacity onPress={onPress2} activeOpacity={0.9}>
              <Image
                source={require('../resource/img/play.png')}
                style={styles.boton_reproduccion}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress} activeOpacity={0.1}>
              <Image
                style={styles.boton_reproduccion}
                source={require('../resource/img/stop.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.seccion_3_2}>
          <Text style={styles.text_slider}> - Volumen +</Text>
          <SliderVolumeController
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="red"
            value={0.8}
          />
        </View>
      </View>
      <View style={styles.seccion_4}>
        <ImageBackground
          source={require('../resource/img/boplusradio/fondo.png')}
          style={styles.image_back}>
          <View style={styles.seccion_4_1}>
            <Image
              style={styles.bolivia_joven_logo}
              source={require('../resource/img/boplusradio/boplusradio.png')}
            />
          </View>
          <View style={styles.seccion_4_2}>
            <CarouselAnuncioRadio />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.seccion_5}>
        <CarouselRadio />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'black',
  },
  ///-------------------------------- BACKGROUND TOTAL
  image_back: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: DEVICE_WIDTH,
  },
  //----------------------------------------
  seccion_1: {
    height: DEVICE_HEIGHT * 0.08,
    flexDirection: 'row',
  },
  seccion_1_1: {
    width: DEVICE_WIDTH * 0.4,
  },
  seccion_1_2: {
    width: DEVICE_WIDTH * 0.3,
  },
  seccion_1_3: {
    width: DEVICE_WIDTH * 0.3,
  },
  logo: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.1,
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  logo_radio: {
    width: DEVICE_WIDTH * 0.5,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.1,
    marginLeft: DEVICE_WIDTH * 0.04,
  },

  //----------------------------------------
  seccion_2: {
    height: DEVICE_HEIGHT * 0.17,
    flexDirection: 'row',
  },
  seccion_2_2: {
    width: DEVICE_WIDTH * 0.5,
    justifyContent: 'center',
  },
  seccion_2_3: {
    width: DEVICE_WIDTH * 0.5,
    justifyContent: 'center',
  },
  logo_redes: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.07,
  },
  titulo_encabezado: {
    color: 'white',
    marginLeft: DEVICE_WIDTH * 0.17,
    marginTop: 5,
    fontFamily: 'PFBeauSansPro-Regular',
  },
  //----------------------------------------
  seccion_3: {
    height: DEVICE_HEIGHT * 0.25,
    backgroundColor: 'black',
  },
  seccion_3_1: {
    height: DEVICE_HEIGHT * 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_reproduccion: {
    fontSize: 20,
    fontFamily: 'PFBeauSansPro-Black',
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  boton_reproduccion: {
    width: DEVICE_WIDTH * 0.4,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.1,
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  seccion_3_2: {
    flexDirection: 'row',
    height: DEVICE_HEIGHT * 0.05,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  text_slider: {
    color: 'white',
    fontFamily: 'PFBeauSansPro-BlackItalic',
    fontSize: 18,
    marginLeft: DEVICE_WIDTH * 0.05,
  },
  slider: {
    width: DEVICE_WIDTH * 0.6,
    height: DEVICE_HEIGHT * 0.1,
  },
  //------------------------------------------
  seccion_4: {
    height: DEVICE_HEIGHT * 0.25,
    backgroundColor: '#090909',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  seccion_4_1: {
    height: DEVICE_HEIGHT * 0.25 * 0.5,
    alignItems: 'center',
  },
  seccion_4_2: {
    height: DEVICE_HEIGHT * 0.25 * 0.5,
  },
  bolivia_joven_logo: {
    width: DEVICE_WIDTH * 0.8,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.25 * 0.5,
    marginLeft: DEVICE_WIDTH * 0.02,
  },
  publicidad_principal: {
    width: DEVICE_WIDTH,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.25 * 0.5,
  },
  //------------------------------------------
  seccion_5: {
    flex: 1,
    height: DEVICE_HEIGHT * 0.25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 5,
  },
  item: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  tinyLogo: {
    width: DEVICE_WIDTH,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.23,
  },
  texto_prueba: {
    color: 'white',
  },
});
export default Radio;
