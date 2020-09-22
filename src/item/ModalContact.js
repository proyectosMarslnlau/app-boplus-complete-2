import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
//Importamos la libreria de modal
import Modal from 'react-native-modal';
//Importamos las medidas de DISPOSITIVO
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../resource/js/Device';
//-------------------------------------------
//Inicio del Programa MODAL
//----------------------------------------
const ModalContact = ({modal, guardarModal}) => {
  return (
    <View>
      <Modal
        isVisible={modal}
        animationInTiming={800}
        animationOutTiming={800}
        onBackdropPress={() => guardarModal(false)}>
        <View style={styles.modal}>
          <View style={styles.seccion_1}>
            <Image
              style={styles.bboplus}
              source={require('../resource/img/bdeboplus.png')}
            />
          </View>
          <View style={styles.seccion_2}>
            <Text style={styles.texto_contacto}>Contactos Publicitarios</Text>
            <View style={styles.datos_contactos}>
              <Text>Celular : +591 72001177</Text>
              <Text>Email : sqlr.1988@gmail.com</Text>
            </View>
            <Text style={styles.texto_contacto}>Contactos Canal Boplus</Text>
            <View style={styles.datos_contactos}>
              <Text>Celular : +591 71562642</Text>
              <Text>Email : boplustv@gmail.com</Text>
              <Text>Facebook : BoPlusTV</Text>
              <Text>Página Oficial : https://boplus.tv/</Text>
            </View>
          </View>
          <View style={styles.seccion_3}>
            <Text style={styles.texto_boliviano}>"Simplemente Boliviano"</Text>
          </View>
          <View style={styles.seccion_4}>
            <Image
              style={styles.bboplusblack}
              source={require('../resource/img/boplusblack.png')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#DAD8D6',
    height: DEVICE_HEIGHT * 0.7,
    borderRadius: 10,
    padding: 10,
  },
  //-------------------------------
  seccion_1: {
    height: DEVICE_HEIGHT * 0.7 * 0.25,
  },
  bboplus: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.7 * 0.25,
  },
  ///-----------------------------------
  seccion_2: {
    height: DEVICE_HEIGHT * 0.7 * 0.45,
  },
  texto_contacto: {
    fontSize: 18,
    fontFamily: 'PFBeauSansPro-Regular',
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  datos_contactos: {
    alignItems: 'center',
    marginVertical: 15,
  },
  //------------------------------------
  seccion_3: {
    height: DEVICE_HEIGHT * 0.7 * 0.15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  texto_boliviano: {
    fontSize: 20,
    fontFamily: 'PFBeauSansPro-BlackItalic',
  },
  //-------------------------------------
  seccion_4: {
    height: DEVICE_HEIGHT * 0.7 * 0.1,
    justifyContent: 'flex-end',
  },
  bboplusblack: {
    width: null,
    resizeMode: 'contain',
    height: DEVICE_HEIGHT * 0.7 * 0.03,
  },
});
export default ModalContact;
