 const Service = require("../services/parkingzone.service");

const method = {
    async createParkingZone(req, res) {
        try {
            const newParkingZone = await Service.createParkingZone(req.body);
            return res.status(201).json({ success: true, data: newParkingZone });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getParkingZoneAll(req, res) {
        try {
            const parkingZones = await Service.getParkingZoneAll();
            return res.status(200).json({ success: true, data: parkingZones });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getParkingZoneById(req, res) {
        try {
            const parkingZone = await Service.getParkingZoneById(req.params.id);
            if (!parkingZone) {
                return res.status(404).json({ success: false, error: "Parking zone not found" });
            }
            return res.status(200).json({ success: true, data: parkingZone });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateParkingZone(req, res) {
        try {
            const updatedParkingZone = await Service.updateParkingZone(req.params.id, req.body);
            if (!updatedParkingZone) {
                return res.status(404).json({ success: false, error: "Parking zone not found" });
            }
            return res.status(200).json({ success: true, data: updatedParkingZone });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteParkingZone(req, res) {
        try {
            const result = await Service.deleteParkingZone(req.params.id);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

}

module.exports = method;