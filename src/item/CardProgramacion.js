import React from 'react';

import {View, Text, StyleSheet, Linking} from 'react-native';
//Importamos la libreria de CARD
import {Card, ListItem, Button, Icon} from 'react-native-elements';
//Importamos las MEDIDAS de DISPOSITIVO
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../resource/js/Device';
//------------------------------------------------------
//Inicio de CARD
//-------------------------------------------------------
const CardProgramacion = ({item}) => {
  //----------------------------------------

  const onPressRedes = (valor) => {
    Linking.openURL(item.redes)
      .then((data) => {
        console.log('Facebook Opened');
      })
      .catch(() => {
        Linking.openURL(item.facebook)
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
  return (
    <View>
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
          style={styles.tinyLogo}
          onPress={() => onPressRedes(item.id)}></Card.Image>
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
export default CardProgramacion;
