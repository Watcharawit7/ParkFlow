const Parking = require("../models/Parking");
const ParkingSlot = require("../models/ParkingSlot");
const Customer = require("../models/Customer");

const calculateCost = (checkIn, checkOut, customerType) => {  //คำนวณค่าใช้จ่าย
    const hours = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60);
    let totalPrice = 0;
    let totalCredits = 0;
    let totalDays = 0;

    if (customerType === 'GENERAL') {
        if (hours <= 1) {
            totalPrice = 20;
        } else {
            totalDays = Math.ceil((hours - 1) / 24);
            totalPrice = 20 + totalDays * 50;
        }
    } else if (customerType === 'MEMBER') {
        if (hours > 1) {
            totalDays = Math.ceil((hours - 1) / 24);
            totalCredits = totalDays * 1;
        }
    }

    return { totalPrice, totalCredits, totalDays };
};

const method ={
    async createParking(data) {
        try {
            const NewParking = await Parking.create(data);
            await ParkingSlot.findByIdAndUpdate(data.slotId, {
                status: "OCCUPIED",
                currentParkingId: NewParking._id
            });
            return NewParking;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingAll() {
        try {
            const parkings = await Parking.find().populate("customerId").populate("slotId");
            return parkings;
        } catch (error) {
            throw error;
        }   
    },
    async getParkingById(id) {
        try {
            const parking = await Parking.findById(id).populate("customerId").populate("slotId");
            return parking;
        } catch (error) {
            throw error;
        }   
    },
    async updateParking(id, data) {
        try {
            const currentParking = await Parking.findById(id).populate('customerId');
            const updatedParking = await Parking.findByIdAndUpdate(id, data, { returnDocument: "after" });
            console.log('data',data);
            console.log('currentParking',currentParking);
            
            if (data.status === "FINISHED") {
                const checkOut = data.checkOut;

                
                const { totalPrice, totalCredits, totalDays } = calculateCost(
                    currentParking.checkIn,
                    checkOut,
                    currentParking.customerId.customerType
                );  //ส่ง วันเข้า-ออก เเละประเภทสมาชิก

                await Parking.findByIdAndUpdate(id, {
                    totalPrice,
                    totalCredits,
                    totalDays
                });

                if (currentParking.customerId.customerType === 'MEMBER' && totalCredits > 0) {
                    await Customer.findByIdAndUpdate(currentParking.customerId._id, {
                        $inc: { credits: -totalCredits }
                    });
                }

                await ParkingSlot.findByIdAndUpdate(updatedParking.slotId, {
                    status: "AVAILABLE",
                    currentParkingId: null,
                }); //หลังรถออกให้มีการ clear ที่จอด
            }

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