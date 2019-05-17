import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContactInfo, defaultValue } from 'app/shared/model/contact-info.model';

export const ACTION_TYPES = {
  FETCH_CONTACTINFO_LIST: 'contactInfo/FETCH_CONTACTINFO_LIST',
  FETCH_CONTACTINFO: 'contactInfo/FETCH_CONTACTINFO',
  CREATE_CONTACTINFO: 'contactInfo/CREATE_CONTACTINFO',
  UPDATE_CONTACTINFO: 'contactInfo/UPDATE_CONTACTINFO',
  DELETE_CONTACTINFO: 'contactInfo/DELETE_CONTACTINFO',
  RESET: 'contactInfo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContactInfo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContactInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: ContactInfoState = initialState, action): ContactInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTACTINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTACTINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTACTINFO):
    case REQUEST(ACTION_TYPES.UPDATE_CONTACTINFO):
    case REQUEST(ACTION_TYPES.DELETE_CONTACTINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTACTINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTACTINFO):
    case FAILURE(ACTION_TYPES.CREATE_CONTACTINFO):
    case FAILURE(ACTION_TYPES.UPDATE_CONTACTINFO):
    case FAILURE(ACTION_TYPES.DELETE_CONTACTINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTACTINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTACTINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTACTINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTACTINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTACTINFO):
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

const apiUrl = 'api/contact-infos';

// Actions

export const getEntities: ICrudGetAllAction<IContactInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTACTINFO_LIST,
  payload: axios.get<IContactInfo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContactInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTACTINFO,
    payload: axios.get<IContactInfo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContactInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTACTINFO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContactInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTACTINFO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContactInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTACTINFO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
