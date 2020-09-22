import React, {useState, useContext, useEffect} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
//Importamos las medidas de dispositivo
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//Importamos el Carousel
import Carousel, {Pagination} from 'react-native-x2-carousel';
//Importamos la lireria de degradados
import LinearGradient from 'react-native-linear-gradient';
//Importamos el Context
import boplusContext from '../context/boplus/boplusContext';
//--------------------------------------------------------
//Inicio de programa
//--------------------------------------------------------
const CasouselAnuncio = () => {
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //STATE LOCALES
  const [defaultimage, guardarDefaultImage] = useState(false);
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Creamo slos STATE DE consultas
  const {imagenespublicidad, funcionPeticionImagenPublicidad} = useContext(
    boplusContext,
  );

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Area de useEffect para iniciar las consultas
  useEffect(() => {
    guardarDefaultImage(false);
    //Invocamos la funcion que nos devuelven las imagenes subidas de PUBLICIDAD
    funcionPeticionImagenPublicidad().then((item) => {
      if (item === false) {
        console.log('LENNY LAURA VALENCIA ARUQUIPA');
        guardarDefaultImage(true);
      }
    });
  }, []);

  //Funcion que renderiza al objeto
  const renderItem = (data) => (
    <View key={data.id} style={styles.item}>
      <Image style={styles.tinyLogo} source={{uri: data.direccion}} />
    </View>
  );
  //--------------------------------------------------------------------------
  //Funcion que renderiza al objeto
  //--------------------------------------------------------------------------
  const DATA_DEFAULT = [
    {
      id: 1,
      direccion: '../resource/img/compresed/bopluscomprimida.jpg',
    },
  ];
  const renderItemDefault = (data) => (
    <View key={data.id} style={styles.item}>
      <Image
        style={styles.tinyLogo}
        source={require('../resource/img/compresed/bopluscomprimida.jpg')}
      />
    </View>
  );
  //--------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.seccion_1}>
        {defaultimage ? (
          <Carousel
            pagination={Pagination}
            renderItem={renderItemDefault}
            data={DATA_DEFAULT}
            autoplay={true}
            loop={true}
            autoplayInterval={4000}
          />
        ) : (
          <Carousel
            pagination={Pagination}
            renderItem={renderItem}
            data={imagenespublicidad}
            autoplay={true}
            loop={true}
            autoplayInterval={4000}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  seccion_1: {
    height: DEVICE_HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.25,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  tinyLogo: {
    width: DEVICE_WIDTH,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.25,
  },
});
export default CasouselAnuncio;
