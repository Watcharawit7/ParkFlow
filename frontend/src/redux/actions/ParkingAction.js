import api from "../../services/api";

export const ActionTypes = {
  PARKING_ALL: "PARKING_ALL",
  PARKING_BY_ID: "PARKING_BY_ID",
  PARKING_CREATE: "PARKING_CREATE",
  PARKING_UPDATE: "PARKING_UPDATE",
  PARKING_DELETE: "PARKING_DELETE",
};

export const fetchAllParkings = () => async (dispatch) => {
  try {
    const response = await api.get("/parkings");
    dispatch({
      type: ActionTypes.PARKING_ALL,
      payload: response.data
    });
  } catch (error) {
    console.error("Error fetching parkings:", error);
  }
};

export const fetchParkingById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/parkings/${id}`); 
    dispatch({
      type: ActionTypes.PARKING_BY_ID,
      payload: response.data
    });
  } catch (error) {
    console.error(`Error fetching parking with id ${id}:`, error);
  }
};

export const createParking = (parkingData) => async (dispatch) => {   
    try {   
        const response = await api.post("/parkings", parkingData);
        dispatch({
            type: ActionTypes.PARKING_CREATE,
            payload: response.data
        });
    } catch (error) {
        console.error("Error creating parking:", error);
    }   
};

export const updateParking = (id, parkingData) => async (dispatch) => {
    try {
        const response = await api.put(`/parkings/${id}`, parkingData);       
        dispatch({
            type: ActionTypes.PARKING_UPDATE,
            payload: response.data
        });
    }   
    catch (error) {
        console.error(`Error updating parking with id ${id}:`, error);
    }
};

export const deleteParking = (id) => async (dispatch) => { 
    try {
        await api.delete(`/parkings/${id}`);
        dispatch({
            type: ActionTypes.PARKING_DELETE,
            payload: id
        });
    } catch (error) {
        console.error(`Error deleting parking with id ${id}:`, error);
    }
};
