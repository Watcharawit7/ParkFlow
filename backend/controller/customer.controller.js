 const Service = require("../services/customer.service");

const method = {
    async createCustomer(req, res) {
        try {
            const newCustomer = await Service.createCustomer(req.body);
            return res.status(201).json({ success: true, data: newCustomer });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getCustomerAll(req, res) {
        try {
            const customers = await Service.getCustomerAll();
            return res.status(200).json({ success: true, data: customers });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getCustomerById(req, res) {
        try {
            const customer = await Service.getCustomerById(req.params.id);
            if (!customer) {
                return res.status(404).json({ success: false, error: "Customer not found" });
            }
            return res.status(200).json({ success: true, data: customer });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateCustomer(req, res) {
        try {
            const updatedCustomer = await Service.updateCustomer(req.params.id, req.body);
            if (!updatedCustomer) {
                return res.status(404).json({ success: false, error: "Customer not found" });
            }
            return res.status(200).json({ success: true, data: updatedCustomer });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteCustomer(req, res) {
        try {
            const result = await Service.deleteCustomer(req.params.id);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

}

module.exports = method;