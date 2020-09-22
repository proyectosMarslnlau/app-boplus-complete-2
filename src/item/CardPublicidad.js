import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
//Importamos la libreria de CARD
import {Card, ListItem, Button, Icon} from 'react-native-elements';
//Importamos las MEDIDAS de DISPOSITIVO
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//------------------------------------------------------
//Inicio de CARD
//-------------------------------------------------------
const CardPublicidad = () => {
  return (
    <View>
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        <Card.Image
          source={require('../resource/img/compresed/bopluscomprimida.jpg')}
          style={styles.tinyLogo}></Card.Image>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    color: 'white',
  },
  tinyLogo: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.25,
  },
});
export default CardPublicidad;
