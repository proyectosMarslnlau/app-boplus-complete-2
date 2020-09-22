import React, {useReducer} from 'react';
//
import boplusContext from './boplusContext';
import boplusReducer from './boplusReducer';
//Importamos la libreria AXIOS
import axios from 'axios';
//import TYPES
import {
  PETICION_IMAGENES_TV,
  PETICION_IMAGENES_ANUNCIO,
  PETICION_PUBLICIDAD_PRINCIPAL,
  PETICION_INFORMACION_QD,
} from '../../type/index';
//Importamos la direccion
import {
  peticion_imagenes_publicidad,
  peticion_imagenes_programacion,
  peticion_publicidad_principal,
  peticion_informacion_qd,
  peticion_imagenes_radio,
} from '../../resource/js/DirectionApi';
//-----------------------------------------------------
const BoplusState = (props) => {
  const initialState = {
    imagenesradio: [],
    imagenestv: [],
    imagenespublicidad: [],
    imagenpublicidadprincipal: [
      {direccion: 'https://boplus.tv/img_apk/img_tv/boplusprincipal.jpg'},
    ],
    informacionqd: [],
  };
  const [state, dispatch] = useReducer(boplusReducer, initialState);
  //
  const funcionPeticionImagenRadio = async () => {
    try {
      const urlImagenRadio = peticion_imagenes_radio;
      const peticion = await axios.get(urlImagenRadio);
      const respuestaImagenRadio = peticion.data;
      if (respuestaImagenRadio.length !== 0) {
        //Retornamos el ARREGLO con la informacion
        return respuestaImagenRadio;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const funcionPeticionImagenTv = async () => {
    try {
      const urlImagenTv = peticion_imagenes_programacion;
      const peticion = await axios.get(urlImagenTv);
      const respuestaImagenTv = peticion.data;
      if (respuestaImagenTv.length !== 0) {
        //Retornamos el ARREGLO con la informacion
        dispatch({
          type: PETICION_IMAGENES_TV,
          payload: respuestaImagenTv,
        });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const funcionPeticionImagenPublicidad = async () => {
    try {
      //----------------------------------------------
      //Importamoas la variable de direccion de API
      const urlImagenPublicidad = peticion_imagenes_publicidad;
      //Realizamos la peticion mediante AXIOS
      const peticion = await axios.get(urlImagenPublicidad);
      //Respuesta de la peticion
      const respuestaImagenPublicidad = peticion.data;
      //Verificacion de la informacion recibida
      if (respuestaImagenPublicidad.length !== 0) {
        dispatch({
          type: PETICION_IMAGENES_ANUNCIO,
          payload: respuestaImagenPublicidad,
        });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  //
  const funcionPeticionPublicidadPrincipal = async () => {
    try {
      //----------------------------------------------
      //Importamoas la variable de direccion de API
      const urlImagenPublicidadPrincipal = peticion_publicidad_principal;
      //Realizamos la peticion mediante AXIOS
      const peticion = await axios.get(urlImagenPublicidadPrincipal);
      //Respuesta de la peticion
      const respuestaImagenPublicidadPrincipal = peticion.data;
      //Verificacion de la informacion recibida
      if (respuestaImagenPublicidadPrincipal.length !== 0) {
        dispatch({
          type: PETICION_PUBLICIDAD_PRINCIPAL,
          payload: respuestaImagenPublicidadPrincipal,
        });
        return respuestaImagenPublicidadPrincipal;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const funcionPeticionInformacionQd = async () => {
    try {
      //----------------------------------------------
      //Importamoas la variable de direccion de API
      const urlInformacionQd = peticion_informacion_qd;
      //Realizamos la peticion mediante AXIOS
      const peticion = await axios.get(urlInformacionQd);
      //Respuesta de la peticion
      const respuestaInformacionQd = peticion.data;
      //Verificacion de la informacion recibida
      if (respuestaInformacionQd.length !== 0) {
        dispatch({
          type: PETICION_INFORMACION_QD,
          payload: respuestaInformacionQd,
        });
        return respuestaInformacionQd;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <boplusContext.Provider
      value={{
        imagenesradio: state.imagenesradio,
        imagenestv: state.imagenestv,
        imagenespublicidad: state.imagenespublicidad,
        imagenpublicidadprincipal: state.imagenpublicidadprincipal,
        informacionqd: state.informacionqd,
        funcionPeticionImagenRadio,
        funcionPeticionImagenTv,
        funcionPeticionImagenPublicidad,
        funcionPeticionPublicidadPrincipal,
        funcionPeticionInformacionQd,
      }}>
      {props.children}
    </boplusContext.Provider>
  );
};

export default BoplusState;
