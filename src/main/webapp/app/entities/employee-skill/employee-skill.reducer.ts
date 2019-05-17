import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeSkill, defaultValue } from 'app/shared/model/employee-skill.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEESKILL_LIST: 'employeeSkill/FETCH_EMPLOYEESKILL_LIST',
  FETCH_EMPLOYEESKILL: 'employeeSkill/FETCH_EMPLOYEESKILL',
  CREATE_EMPLOYEESKILL: 'employeeSkill/CREATE_EMPLOYEESKILL',
  UPDATE_EMPLOYEESKILL: 'employeeSkill/UPDATE_EMPLOYEESKILL',
  DELETE_EMPLOYEESKILL: 'employeeSkill/DELETE_EMPLOYEESKILL',
  RESET: 'employeeSkill/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeSkill>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EmployeeSkillState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeSkillState = initialState, action): EmployeeSkillState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEESKILL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEESKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEESKILL):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEESKILL):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEESKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEESKILL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEESKILL):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEESKILL):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEESKILL):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEESKILL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEESKILL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEESKILL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEESKILL):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEESKILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEESKILL):
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

const apiUrl = 'api/employee-skills';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeSkill> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEESKILL_LIST,
  payload: axios.get<IEmployeeSkill>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEmployeeSkill> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEESKILL,
    payload: axios.get<IEmployeeSkill>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmployeeSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEESKILL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEESKILL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeSkill> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEESKILL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
