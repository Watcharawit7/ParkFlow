import api from "../../services/api";

export const ActionTypes = {
  PARKING_ZONE_ALL: "PARKING_ZONE_ALL",
  PARKING_ZONE_BY_ID: "PARKING_ZONE_BY_ID",
  PARKING_ZONE_CREATE: "PARKING_ZONE_CREATE",
  PARKING_ZONE_UPDATE: "PARKING_ZONE_UPDATE",
  PARKING_ZONE_DELETE: "PARKING_ZONE_DELETE",
};

export const fetchAllParkingZones = () => async (dispatch) => {
  try {
    const response = await api.get("/parkingzones");
    dispatch({
      type: ActionTypes.PARKING_ZONE_ALL,
      payload: response.data
    });
  } catch (error) {
    console.error("Error fetching parking zones:", error);
  }
};

export const fetchParkingZoneById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/parkingzones/${id}`); 
    dispatch({
      type: ActionTypes.PARKING_ZONE_BY_ID,
      payload: response.data
    });
  } catch (error) {
    console.error(`Error fetching parking zone with id ${id}:`, error);
  }
};

export const createParkingZone = (parkingZoneData) => async (dispatch) => {   
    try {   
        const response = await api.post("/parkingzones", parkingZoneData);
        dispatch({
            type: ActionTypes.PARKING_ZONE_CREATE,
            payload: response.data
        });
    } catch (error) {
        console.error("Error creating parking zone:", error);
    }   
};

export const updateParkingZone = (id, parkingZoneData) => async (dispatch) => {
    try {
        const response = await api.put(`/parkingzones/${id}`, parkingZoneData);       
        dispatch({
            type: ActionTypes.PARKING_ZONE_UPDATE,
            payload: response.data
        });
    }   
    catch (error) {
        console.error(`Error updating parking zone with id ${id}:`, error);
    }
};

export const deleteParkingZone = (id) => async (dispatch) => { 
    try {
        await api.delete(`/parkingzones/${id}`);
        dispatch({
            type: ActionTypes.PARKING_ZONE_DELETE,
            payload: id
        });
    } catch (error) {
        console.error(`Error deleting parking zone with id ${id}:`, error);
    }
};
