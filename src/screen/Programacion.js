import React, {useEffect, useContext, useState, useRef} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Image,
} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

//Importamos la MEDIDAS
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//
import boplusContext from '../context/boplus/boplusContext';
//
//Importamos la lireria de degradados
import LinearGradient from 'react-native-linear-gradient';
//
import Tv from './Tv';
//
//Importamos la orientacion de MOBILE
import Orientation from 'react-native-orientation-locker';
//
import CarouselAnuncio from '../item/CarouselAnuncio';

//----------------------------------------------
//Inicio de programa
//----------------------------------------------
const Programacion = ({navigation}) => {
  //--------------------------------------------
  const scrollRef = useRef();
  //uso de USECONTEXT
  const {
    imagenestv,
    errortv,
    imagenpublicidadprincipal,
    funcionPeticionImagenTv,
    funcionPeticionPublicidadPrincipal,
    funcionErrorTv,
  } = useContext(boplusContext);
  //--------------------------------------------
  //Area de USEeFFECT
  useEffect(() => {
    //Invocamos las imagenes de programa
    funcionPeticionImagenTv();
    funcionPeticionPublicidadPrincipal();
    //Fucion que se usa para el boton de atras
    const backAction = () => {
      Orientation.lockToPortrait();
      navigation.navigate('selector');

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  //
  useEffect(() => {
    if (errortv === true) {
      console.log('NO EXISTE VIDEO');
      navigation.navigate('selector');
      funcionErrorTv(false);
    }
  }, [errortv]);
  //
  const onPressTv = () => {
    navigation.navigate('tv');
  };
  //
  const onPressReturn = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  //

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#090909', '#452f20', '#090909']}>
        <ScrollView ref={scrollRef}>
          <View style={styles.seccion_1}>
            <Tv />
          </View>
          <View style={styles.seccion_2}>
            <Text style={styles.texto_programacion}>Auspicio de:</Text>
            <CarouselAnuncio />
          </View>
          <View style={styles.seccion_3}>
            <Text style={styles.texto_programacion}>Nuestra Programación</Text>
          </View>
          {imagenestv.map((item) => (
            <Card
              containerStyle={{backgroundColor: '#DAD8D6', borderRadius: 10}}
              wrapperStyle={{backgroundColor: '#DAD8DF'}}
              key={item.id}>
              <Card.Title>
                <Text style={styles.texto_card}>{item.titulo}</Text>
              </Card.Title>
              <Card.Divider />
              <Card.Image
                source={{uri: item.direccion}}
                style={styles.tinyLogo}></Card.Image>
            </Card>
          ))}
          <View>
            <Button
              icon={
                <Icon
                  name="pointer"
                  type="evilicon"
                  size={25}
                  color="#DC5F13"
                  style={styles.icono}
                />
              }
              title="Volver al Principio"
              type="outline"
              buttonStyle={{
                backgroundColor: 'black',
                paddingHorizontal: DEVICE_WIDTH * 0.1,
                borderRadius: 10,
                borderColor: '#B21E27',
                borderWidth: 1,
                marginVertical: 10,
              }}
              titleStyle={{
                color: '#DC5F13',
                fontFamily: 'PFBeauSansPro-Regular',
                fontWeight: '700',
                fontSize: 15,
              }}
              onPress={onPressReturn}
            />
          </View>
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
  //-------------------------
  seccion_2: {
    height: DEVICE_HEIGHT * 0.3,
  },
  //-------------------------
  tinyLogo: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.25,
  },
  logo: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.4,
  },
  texto_card: {
    color: '#000000',
    fontFamily: 'PFBeauSansPro-BlackItalic',
  },
  texto_programacion: {
    marginTop: 10,
    color: 'white',
    fontFamily: 'PFBeauSansPro-Regular',
    fontSize: 15,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
});
export default Programacion;
