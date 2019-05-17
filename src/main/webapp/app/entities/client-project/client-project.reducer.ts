import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClientProject, defaultValue } from 'app/shared/model/client-project.model';

export const ACTION_TYPES = {
  FETCH_CLIENTPROJECT_LIST: 'clientProject/FETCH_CLIENTPROJECT_LIST',
  FETCH_CLIENTPROJECT: 'clientProject/FETCH_CLIENTPROJECT',
  CREATE_CLIENTPROJECT: 'clientProject/CREATE_CLIENTPROJECT',
  UPDATE_CLIENTPROJECT: 'clientProject/UPDATE_CLIENTPROJECT',
  DELETE_CLIENTPROJECT: 'clientProject/DELETE_CLIENTPROJECT',
  RESET: 'clientProject/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IClientProject>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ClientProjectState = Readonly<typeof initialState>;

// Reducer

export default (state: ClientProjectState = initialState, action): ClientProjectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLIENTPROJECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLIENTPROJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CLIENTPROJECT):
    case REQUEST(ACTION_TYPES.UPDATE_CLIENTPROJECT):
    case REQUEST(ACTION_TYPES.DELETE_CLIENTPROJECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CLIENTPROJECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLIENTPROJECT):
    case FAILURE(ACTION_TYPES.CREATE_CLIENTPROJECT):
    case FAILURE(ACTION_TYPES.UPDATE_CLIENTPROJECT):
    case FAILURE(ACTION_TYPES.DELETE_CLIENTPROJECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTPROJECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTPROJECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLIENTPROJECT):
    case SUCCESS(ACTION_TYPES.UPDATE_CLIENTPROJECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLIENTPROJECT):
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

const apiUrl = 'api/client-projects';

// Actions

export const getEntities: ICrudGetAllAction<IClientProject> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CLIENTPROJECT_LIST,
  payload: axios.get<IClientProject>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IClientProject> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLIENTPROJECT,
    payload: axios.get<IClientProject>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IClientProject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLIENTPROJECT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClientProject> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLIENTPROJECT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClientProject> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLIENTPROJECT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
