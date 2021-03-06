//
import {
  PETICION_IMAGENES_TV,
  PETICION_IMAGENES_ANUNCIO,
  PETICION_PUBLICIDAD_PRINCIPAL,
  PETICION_INFORMACION_QD,
  ERROR_TV,
  DIRECCION_TV_BOPLUS,
} from '../../type/index';
export default (state, action) => {
  switch (action.type) {
    case PETICION_IMAGENES_TV:
      return {
        ...state,
        imagenestv: action.payload,
      };
    case PETICION_IMAGENES_ANUNCIO:
      return {
        ...state,
        imagenespublicidad: action.payload,
      };
    case PETICION_IMAGENES_TV:
      return {
        ...state,
        imagenestv: action.payload,
      };
    case PETICION_PUBLICIDAD_PRINCIPAL:
      return {
        ...state,
        imagenpublicidadprincipal: action.payload,
      };
    case PETICION_INFORMACION_QD:
      return {
        ...state,
        informacionqd: action.payload,
      };
    case ERROR_TV:
      return {
        ...state,
        errortv: action.payload,
      };
    case DIRECCION_TV_BOPLUS:
      return {
        ...state,
        direccion: action.payload,
      };
    default:
      return state;
  }
};
