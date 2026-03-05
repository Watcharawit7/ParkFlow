 const Service = require("../services/parking.service");

const method = {
    async createParking(req, res) {
        try {
            const newParking = await Service.createParking(req.body);
            return res.status(201).json({ success: true, data: newParking });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getParkingAll(req, res) {
        try {
            const parkings = await Service.getParkingAll();
            return res.status(200).json({ success: true, data: parkings });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getParkingById(req, res) {
        try {
            const parking = await Service.getParkingById(req.params.id);
            if (!parking) {
                return res.status(404).json({ success: false, error: "Parking not found" });
            }
            return res.status(200).json({ success: true, data: parking });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateParking(req, res) {
        try {
            const updatedParking = await Service.updateParking(req.params.id, req.body);
            if (!updatedParking) {
                return res.status(404).json({ success: false, error: "Parking not found" });
            }
            return res.status(200).json({ success: true, data: updatedParking });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteParking(req, res) {
        try {
            const result = await Service.deleteParking(req.params.id);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

}

module.exports = method;