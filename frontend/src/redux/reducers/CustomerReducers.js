import { ActionTypes } from "../actions/CustomerAction";
const initialState = {
  customers: [],
  isLoading: false,
};


export const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CUSTOMER_ALL:
        return {
            ...state,
            customers: action.payload.data,
            isLoading: false,
        };
    case ActionTypes.CUSTOMER_BY_ID:
        return {
            ...state,
            customers: action.payload.data,
            isLoading: false,
        };
    case ActionTypes.CUSTOMER_CREATE:
        return {
            ...state,
            customers: [...state.customers, action.payload.data],
            isLoading: false,
        };
    case ActionTypes.CUSTOMER_UPDATE:
        return {
            ...state,
            customers: state.customers.map((customer) =>
                customer._id === action.payload.data._id ? action.payload.data : customer
            ),
            isLoading: false,
        };
    case ActionTypes.CUSTOMER_DELETE:
        return {
            ...state,
            customers: state.customers.filter((customer) => customer._id !== action.payload),
            isLoading: false,
        };
    default:
      return state;
  }
};