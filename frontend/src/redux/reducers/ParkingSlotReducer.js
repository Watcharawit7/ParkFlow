import { ActionTypes } from "../actions/ParkingSlotAction";

const initialState = {
  parkingSlots: [],
  isLoading: false,
};

export const ParkingSlotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PARKING_SLOT_ALL:
        return {
            ...state,
            parkingSlots: action.payload.data || [],
            isLoading: false,
        };
    case ActionTypes.PARKING_SLOT_BY_ID:
        return {
            ...state,
            parkingSlots: action.payload.data || [],
            isLoading: false,
        };
    case ActionTypes.PARKING_SLOT_CREATE:
        return {
            ...state,
            parkingSlots: [...state.parkingSlots, action.payload.data],
            isLoading: false,
        };
    case ActionTypes.PARKING_SLOT_UPDATE:
        return {
            ...state,
            parkingSlots: state.parkingSlots.map((slot) =>
                slot._id === action.payload.data._id ? action.payload.data : slot
            ),
            isLoading: false,
        };
    case ActionTypes.PARKING_SLOT_DELETE:
        return {
            ...state,
            parkingSlots: state.parkingSlots.filter((slot) => slot._id !== action.payload),
            isLoading: false,
        };
    default:
      return state;
  }
};
