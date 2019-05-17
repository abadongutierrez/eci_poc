import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeBudgetAssignment, defaultValue } from 'app/shared/model/employee-budget-assignment.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEBUDGETASSIGNMENT_LIST: 'employeeBudgetAssignment/FETCH_EMPLOYEEBUDGETASSIGNMENT_LIST',
  FETCH_EMPLOYEEBUDGETASSIGNMENT: 'employeeBudgetAssignment/FETCH_EMPLOYEEBUDGETASSIGNMENT',
  CREATE_EMPLOYEEBUDGETASSIGNMENT: 'employeeBudgetAssignment/CREATE_EMPLOYEEBUDGETASSIGNMENT',
  UPDATE_EMPLOYEEBUDGETASSIGNMENT: 'employeeBudgetAssignment/UPDATE_EMPLOYEEBUDGETASSIGNMENT',
  DELETE_EMPLOYEEBUDGETASSIGNMENT: 'employeeBudgetAssignment/DELETE_EMPLOYEEBUDGETASSIGNMENT',
  RESET: 'employeeBudgetAssignment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeBudgetAssignment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EmployeeBudgetAssignmentState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeBudgetAssignmentState = initialState, action): EmployeeBudgetAssignmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEBUDGETASSIGNMENT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEBUDGETASSIGNMENT):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEBUDGETASSIGNMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEBUDGETASSIGNMENT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEBUDGETASSIGNMENT):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEBUDGETASSIGNMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEBUDGETASSIGNMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEBUDGETASSIGNMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEBUDGETASSIGNMENT):
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

const apiUrl = 'api/employee-budget-assignments';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeBudgetAssignment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT_LIST,
  payload: axios.get<IEmployeeBudgetAssignment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEmployeeBudgetAssignment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEBUDGETASSIGNMENT,
    payload: axios.get<IEmployeeBudgetAssignment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmployeeBudgetAssignment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEBUDGETASSIGNMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeBudgetAssignment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEBUDGETASSIGNMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeBudgetAssignment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEBUDGETASSIGNMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
