import { combineReducers } from "redux";
import { CustomerReducer } from "./CustomerReducers";
import { ParkingReducer } from "./ParkingReducer";
import { ParkingSlotReducer } from "./ParkingSlotReducer";
import { ParkingZoneReducer } from "./ParkingZoneReducer";

const rootReducer = combineReducers({
    customer: CustomerReducer,
    parking: ParkingReducer,
    parkingSlot: ParkingSlotReducer,
    parkingZone: ParkingZoneReducer,
});
export default rootReducer;