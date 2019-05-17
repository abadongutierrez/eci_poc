import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKeyDate, defaultValue } from 'app/shared/model/key-date.model';

export const ACTION_TYPES = {
  FETCH_KEYDATE_LIST: 'keyDate/FETCH_KEYDATE_LIST',
  FETCH_KEYDATE: 'keyDate/FETCH_KEYDATE',
  CREATE_KEYDATE: 'keyDate/CREATE_KEYDATE',
  UPDATE_KEYDATE: 'keyDate/UPDATE_KEYDATE',
  DELETE_KEYDATE: 'keyDate/DELETE_KEYDATE',
  RESET: 'keyDate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKeyDate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type KeyDateState = Readonly<typeof initialState>;

// Reducer

export default (state: KeyDateState = initialState, action): KeyDateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KEYDATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KEYDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_KEYDATE):
    case REQUEST(ACTION_TYPES.UPDATE_KEYDATE):
    case REQUEST(ACTION_TYPES.DELETE_KEYDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_KEYDATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KEYDATE):
    case FAILURE(ACTION_TYPES.CREATE_KEYDATE):
    case FAILURE(ACTION_TYPES.UPDATE_KEYDATE):
    case FAILURE(ACTION_TYPES.DELETE_KEYDATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEYDATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEYDATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_KEYDATE):
    case SUCCESS(ACTION_TYPES.UPDATE_KEYDATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_KEYDATE):
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

const apiUrl = 'api/key-dates';

// Actions

export const getEntities: ICrudGetAllAction<IKeyDate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_KEYDATE_LIST,
  payload: axios.get<IKeyDate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IKeyDate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KEYDATE,
    payload: axios.get<IKeyDate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IKeyDate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KEYDATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKeyDate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KEYDATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKeyDate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KEYDATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
