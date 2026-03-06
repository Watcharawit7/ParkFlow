import { ActionTypes } from "../actions/ParkingZoneAction";

const initialState = {
  parkingZones: [],
  isLoading: false,
};

export const ParkingZoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PARKING_ZONE_ALL:
        return {
            ...state,
            parkingZones: action.payload.data || [],
            isLoading: false,
        };
    case ActionTypes.PARKING_ZONE_BY_ID:
        return {
            ...state,
            parkingZones: action.payload.data || [],
            isLoading: false,
        };
    case ActionTypes.PARKING_ZONE_CREATE:
        return {
            ...state,
            parkingZones: [...state.parkingZones, action.payload.data],
            isLoading: false,
        };
    case ActionTypes.PARKING_ZONE_UPDATE:
        return {
            ...state,
            parkingZones: state.parkingZones.map((zone) =>
                zone._id === action.payload.data._id ? action.payload.data : zone
            ),
            isLoading: false,
        };
    case ActionTypes.PARKING_ZONE_DELETE:
        return {
            ...state,
            parkingZones: state.parkingZones.filter((zone) => zone._id !== action.payload),
            isLoading: false,
        };
    default:
      return state;
  }
};
