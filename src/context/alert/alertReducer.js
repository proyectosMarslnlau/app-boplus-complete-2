//\
import {CAMBIAR_ESTADO_ERROR} from '../../type/index';
export default (state, action) => {
  switch (action.type) {
    case CAMBIAR_ESTADO_ERROR:
      return {
        ...state,
        alerterror: action.payload,
      };
    default:
      return state;
  }
};
