const Parking = require("../models/Parking");

const method ={
    async createParking(data) {
        try {
            const NewParking = await Parking.create(data);
            return NewParking;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingAll() {
        try {
            const parkings = await Parking.find();
            return parkings;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingById(id) {
        try {
            const parking = await Parking.findById(id);
            return parking;
        } catch (error) {
            throw error;
        }   
    },
    async updateParking(id, data) {
        try {
            const updatedParking = await Parking.findByIdAndUpdate(id, data, { returnDocument: "after" });
            return updatedParking;
        } catch (error) {
            throw error;
        }
    },
    async deleteParking(id) {
        try {
            await Parking.findByIdAndDelete(id);
            return { message: "Parking deleted successfully" };
        } catch (error) {
            throw error;
        }
    }
    



}

module.exports = method;