import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INextOfKin, defaultValue } from 'app/shared/model/next-of-kin.model';

export const ACTION_TYPES = {
  FETCH_NEXTOFKIN_LIST: 'nextOfKin/FETCH_NEXTOFKIN_LIST',
  FETCH_NEXTOFKIN: 'nextOfKin/FETCH_NEXTOFKIN',
  CREATE_NEXTOFKIN: 'nextOfKin/CREATE_NEXTOFKIN',
  UPDATE_NEXTOFKIN: 'nextOfKin/UPDATE_NEXTOFKIN',
  DELETE_NEXTOFKIN: 'nextOfKin/DELETE_NEXTOFKIN',
  RESET: 'nextOfKin/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INextOfKin>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NextOfKinState = Readonly<typeof initialState>;

// Reducer

export default (state: NextOfKinState = initialState, action): NextOfKinState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NEXTOFKIN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NEXTOFKIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NEXTOFKIN):
    case REQUEST(ACTION_TYPES.UPDATE_NEXTOFKIN):
    case REQUEST(ACTION_TYPES.DELETE_NEXTOFKIN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NEXTOFKIN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NEXTOFKIN):
    case FAILURE(ACTION_TYPES.CREATE_NEXTOFKIN):
    case FAILURE(ACTION_TYPES.UPDATE_NEXTOFKIN):
    case FAILURE(ACTION_TYPES.DELETE_NEXTOFKIN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEXTOFKIN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEXTOFKIN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NEXTOFKIN):
    case SUCCESS(ACTION_TYPES.UPDATE_NEXTOFKIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NEXTOFKIN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/next-of-kins';

// Actions

export const getEntities: ICrudGetAllAction<INextOfKin> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NEXTOFKIN_LIST,
  payload: axios.get<INextOfKin>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INextOfKin> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NEXTOFKIN,
    payload: axios.get<INextOfKin>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INextOfKin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NEXTOFKIN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INextOfKin> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NEXTOFKIN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INextOfKin> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NEXTOFKIN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
