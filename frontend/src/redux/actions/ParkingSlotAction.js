import api from "../../services/api";

export const ActionTypes = {
  PARKING_SLOT_ALL: "PARKING_SLOT_ALL",
  PARKING_SLOT_BY_ID: "PARKING_SLOT_BY_ID",
  PARKING_SLOT_CREATE: "PARKING_SLOT_CREATE",
  PARKING_SLOT_UPDATE: "PARKING_SLOT_UPDATE",
  PARKING_SLOT_DELETE: "PARKING_SLOT_DELETE",
};

export const fetchAllParkingSlots = () => async (dispatch) => {
  try {
    const response = await api.get("/parkingslots");
    dispatch({
      type: ActionTypes.PARKING_SLOT_ALL,
      payload: response.data
    });
  } catch (error) {
    console.error("Error fetching parking slots:", error);
  }
};

export const fetchParkingSlotById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/parkingslots/${id}`); 
    dispatch({
      type: ActionTypes.PARKING_SLOT_BY_ID,
      payload: response.data
    });
  } catch (error) {
    console.error(`Error fetching parking slot with id ${id}:`, error);
  }
};

export const createParkingSlot = (parkingSlotData) => async (dispatch) => {   
    try {   
        const response = await api.post("/parkingslots", parkingSlotData);
        dispatch({
            type: ActionTypes.PARKING_SLOT_CREATE,
            payload: response.data
        });
    } catch (error) {
        console.error("Error creating parking slot:", error);
    }   
};

export const updateParkingSlot = (id, parkingSlotData) => async (dispatch) => {
    try {
        const response = await api.put(`/parkingslots/${id}`, parkingSlotData);       
        dispatch({
            type: ActionTypes.PARKING_SLOT_UPDATE,
            payload: response.data
        });
    }   
    catch (error) {
        console.error(`Error updating parking slot with id ${id}:`, error);
    }
};

export const deleteParkingSlot = (id) => async (dispatch) => { 
    try {
        await api.delete(`/parkingslots/${id}`);
        dispatch({
            type: ActionTypes.PARKING_SLOT_DELETE,
            payload: id
        });
    } catch (error) {
        console.error(`Error deleting parking slot with id ${id}:`, error);
    }
};
