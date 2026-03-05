const Parkingslot = require("../models/ParkingSlot");

const method ={
    async createParkingSlot(data) {
        try {
            const NewParkingSlot = await Parkingslot.create(data);
            return NewParkingSlot;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingSlotAll() {
        try {
            const parkingSlots = await Parkingslot.find();
            return parkingSlots;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingSlotById(id) {
        try {
            const parkingSlot = await Parkingslot.findById(id);
            return parkingSlot;
        } catch (error) {
            throw error;
        }   
    },
    async updateParkingSlot(id, data) {
        try {
            const updatedParkingSlot = await Parkingslot.findByIdAndUpdate(id, data, { returnDocument: "after" });
            return updatedParkingSlot;
        } catch (error) {
            throw error;
        }
    },
    async deleteParkingSlot(id) {
        try {
            await Parkingslot.findByIdAndDelete(id);
            return { message: "Parking slot deleted successfully" };
        } catch (error) {
            throw error;
        }
    }
    



}

module.exports = method;