import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBudget, defaultValue } from 'app/shared/model/budget.model';

export const ACTION_TYPES = {
  FETCH_BUDGET_LIST: 'budget/FETCH_BUDGET_LIST',
  FETCH_BUDGET: 'budget/FETCH_BUDGET',
  CREATE_BUDGET: 'budget/CREATE_BUDGET',
  UPDATE_BUDGET: 'budget/UPDATE_BUDGET',
  DELETE_BUDGET: 'budget/DELETE_BUDGET',
  RESET: 'budget/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBudget>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BudgetState = Readonly<typeof initialState>;

// Reducer

export default (state: BudgetState = initialState, action): BudgetState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUDGET_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUDGET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BUDGET):
    case REQUEST(ACTION_TYPES.UPDATE_BUDGET):
    case REQUEST(ACTION_TYPES.DELETE_BUDGET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BUDGET_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUDGET):
    case FAILURE(ACTION_TYPES.CREATE_BUDGET):
    case FAILURE(ACTION_TYPES.UPDATE_BUDGET):
    case FAILURE(ACTION_TYPES.DELETE_BUDGET):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUDGET_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUDGET):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUDGET):
    case SUCCESS(ACTION_TYPES.UPDATE_BUDGET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUDGET):
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

const apiUrl = 'api/budgets';

// Actions

export const getEntities: ICrudGetAllAction<IBudget> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BUDGET_LIST,
    payload: axios.get<IBudget>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBudget> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUDGET,
    payload: axios.get<IBudget>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBudget> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUDGET,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBudget> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUDGET,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBudget> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUDGET,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
