import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeClientAssignment, defaultValue } from 'app/shared/model/employee-client-assignment.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEECLIENTASSIGNMENT_LIST: 'employeeClientAssignment/FETCH_EMPLOYEECLIENTASSIGNMENT_LIST',
  FETCH_EMPLOYEECLIENTASSIGNMENT: 'employeeClientAssignment/FETCH_EMPLOYEECLIENTASSIGNMENT',
  CREATE_EMPLOYEECLIENTASSIGNMENT: 'employeeClientAssignment/CREATE_EMPLOYEECLIENTASSIGNMENT',
  UPDATE_EMPLOYEECLIENTASSIGNMENT: 'employeeClientAssignment/UPDATE_EMPLOYEECLIENTASSIGNMENT',
  DELETE_EMPLOYEECLIENTASSIGNMENT: 'employeeClientAssignment/DELETE_EMPLOYEECLIENTASSIGNMENT',
  RESET: 'employeeClientAssignment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeClientAssignment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EmployeeClientAssignmentState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeClientAssignmentState = initialState, action): EmployeeClientAssignmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEECLIENTASSIGNMENT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEECLIENTASSIGNMENT):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEECLIENTASSIGNMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEECLIENTASSIGNMENT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEECLIENTASSIGNMENT):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEECLIENTASSIGNMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEECLIENTASSIGNMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEECLIENTASSIGNMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEECLIENTASSIGNMENT):
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

const apiUrl = 'api/employee-client-assignments';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeClientAssignment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT_LIST,
  payload: axios.get<IEmployeeClientAssignment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEmployeeClientAssignment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEECLIENTASSIGNMENT,
    payload: axios.get<IEmployeeClientAssignment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmployeeClientAssignment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEECLIENTASSIGNMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeClientAssignment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEECLIENTASSIGNMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeClientAssignment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEECLIENTASSIGNMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
