const Customer = require("../models/Customer");

const method ={
    async createCustomer(data) {
        try {
            const NewCustomer = await Customer.create(data);
            return NewCustomer;
        } catch (error) {
            throw error;
        }   
    },
    async getCustomerAll() {
        try {
            const customers = await Customer.find();
            return customers;
        } catch (error) {
            throw error;
        }   
    },
    async getCustomerById(id) {
        try {
            const customer = await Customer.findById(id);
            return customer;
        } catch (error) {
            throw error;
        }   
    },
    async updateCustomer(id, data) {
        try {
            const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { returnDocument: "after" });
            return updatedCustomer;
        } catch (error) {
            throw error;
        }
    },
    async deleteCustomer(id) {
        try {
            await Customer.findByIdAndDelete(id);
            return { message: "Customer deleted successfully" };
        } catch (error) {
            throw error;
        }
    }
    



}

module.exports = method;