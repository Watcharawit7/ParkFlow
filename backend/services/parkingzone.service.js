const ParkingZone = require("../models/ParkingZone");

const method ={
    async createParkingZone(data) {
        try {
            const NewParkingZone = await ParkingZone.create(data);
            return NewParkingZone;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingZoneAll() {
        try {
            const parkingZones = await ParkingZone.find();
            return parkingZones;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingZoneById(id) {
        try {
            const parkingZone = await ParkingZone.findById(id);
            return parkingZone;
        } catch (error) {
            throw error;
        }   
    },
    async updateParkingZone(id, data) {
        try {
            const updatedParkingZone = await ParkingZone.findByIdAndUpdate(id, data, { returnDocument: "after" });
            return updatedParkingZone;
        } catch (error) {
            throw error;
        }
    },
    async deleteParkingZone(id) {
        try {
            await ParkingZone.findByIdAndDelete(id);
            return { message: "Parking zone deleted successfully" };
        } catch (error) {
            throw error;
        }
    }
    



}

module.exports = method;