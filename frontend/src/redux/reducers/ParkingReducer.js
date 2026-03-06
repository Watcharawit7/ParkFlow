import { ActionTypes } from "../actions/ParkingAction";

const initialState = {
  parkings: [],
  isLoading: false,
};

export const ParkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PARKING_ALL:
        return {
            ...state,
            parkings: action.payload.data || [],
            isLoading: false,
        };
    case ActionTypes.PARKING_BY_ID:
        return {
            ...state,
            parkings: action.payload.data || [],
            isLoading: false,
        };
    case ActionTypes.PARKING_CREATE:
        return {
            ...state,
            parkings: [...state.parkings, action.payload.data],
            isLoading: false,
        };
    case ActionTypes.PARKING_UPDATE:
        return {
            ...state,
            parkings: state.parkings.map((parking) =>
                parking._id === action.payload.data._id ? action.payload.data : parking
            ),
            isLoading: false,
        };
    case ActionTypes.PARKING_DELETE:
        return {
            ...state,
            parkings: state.parkings.filter((parking) => parking._id !== action.payload),
            isLoading: false,
        };
    default:
      return state;
  }
};
