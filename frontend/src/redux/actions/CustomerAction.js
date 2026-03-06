import api from "../../services/api";


export const ActionTypes = {
  CUSTOMER_ALL: "CUSTOMER_ALL",
  CUSTOMER_BY_ID: "CUSTOMER_BY_ID",
  CUSTOMER_CREATE: "CUSTOMER_CREATE",
  CUSTOMER_UPDATE: "CUSTOMER_UPDATE",
  CUSTOMER_DELETE: "CUSTOMER_DELETE",
};

export const fetchAllCustomers = () => async (dispatch) => {
  try {
    const response = await api.get("/customers");
    dispatch({
      type: ActionTypes.CUSTOMER_ALL,
      payload: response.data
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

export const fetchCustomerById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/customers/${id}`); 
    dispatch({
      type: ActionTypes.CUSTOMER_BY_ID,
      payload: response.data
    });
  } catch (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
  }
};

export const createCustomer = (customerData) => async (dispatch) => {   
    try {   
        const response = await api.post("/customers", customerData);
        dispatch({
            type: ActionTypes.CUSTOMER_CREATE,
            payload: response.data
        });
    } catch (error) {
        console.error("Error creating customer:", error);
    }   
};

export const updateCustomer = (id, customerData) => async (dispatch) => {
    try {
        const response = await api.put(`/customers/${id}`, customerData);       
        dispatch({
            type: ActionTypes.CUSTOMER_UPDATE,
            payload: response.data
        });
    }   
    catch (error) {
        console.error(`Error updating customer with id ${id}:`, error);
    }
};

export const deleteCustomer = (id) => async (dispatch) => { 
    try {
        await api.delete(`/customers/${id}`);
        dispatch({
            type: ActionTypes.CUSTOMER_DELETE,
            payload: id
        });
    } catch (error) {
        console.error(`Error deleting customer with id ${id}:`, error);
    }

};

