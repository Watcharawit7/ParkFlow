 const Service = require("../services/parkingslot.service");

const method = {
    async createParkingSlot(req, res) {
        try {
            const newParkingSlot = await Service.createParkingSlot(req.body);
            return res.status(201).json({ success: true, data: newParkingSlot });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getParkingSlotAll(req, res) {
        try {
            const parkingSlots = await Service.getParkingSlotAll();
            return res.status(200).json({ success: true, data: parkingSlots });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async getParkingSlotById(req, res) {
        try {
            const parkingSlot = await Service.getParkingSlotById(req.params.id);
            if (!parkingSlot) {
                return res.status(404).json({ success: false, error: "Parking slot not found" });
            }
            return res.status(200).json({ success: true, data: parkingSlot });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateParkingSlot(req, res) {
        try {
            const updatedParkingSlot = await Service.updateParkingSlot(req.params.id, req.body);
            if (!updatedParkingSlot) {
                return res.status(404).json({ success: false, error: "Parking slot not found" });
            }
            return res.status(200).json({ success: true, data: updatedParkingSlot });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteParkingSlot(req, res) {
        try {
            const result = await Service.deleteParkingSlot(req.params.id);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

}

module.exports = method;