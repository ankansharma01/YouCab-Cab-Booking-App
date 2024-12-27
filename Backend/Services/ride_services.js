const rideModel = require('../Models/ride_model')
const mapsService = require('../Services/maps_service')
const crypto = require('crypto')




module.exports.getFare=async(pickup, destination)=> {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination)

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;


}


 function getOTP(num)
{
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    // Input validation
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Normalize vehicle type
    const normalizedVehicleType = vehicleType.toLowerCase();
    const validVehicleTypes = ['auto', 'car', 'motorcycle'];
    
    if (!validVehicleTypes.includes(normalizedVehicleType)) {
        throw new Error(`Invalid vehicle type. Must be one of: ${validVehicleTypes.join(', ')}`);
    }

    try {
        // Calculate fare first
        const fare = await this.getFare(pickup, destination);
        
        if (!fare || !fare[normalizedVehicleType]) {
            throw new Error('Failed to calculate fare for the selected vehicle type');
        }

        // Create the ride
        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            status: 'pending',
            vehicleType: normalizedVehicleType,
            otp: getOTP(6),
            fare: fare[normalizedVehicleType]
        });

        // Return populated ride data
        return await rideModel
            .findById(ride._id)
            .populate('user')
            .lean();

    } catch (error) {
        console.error('Error in createRide service:', error);
        throw error;
    }
};

module.exports.confirmRide = async ({ rideId, captain }) => {
    // Input validation
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    
    if (!captain || !captain._id) {
        const error = new Error('Valid captain data is required');
        error.status = 400;
        throw error;
    }

    // First check if ride exists and is in valid state
    const existingRide = await rideModel.findById(rideId);
    if (!existingRide) {
        const error = new Error('Ride not found');
        error.status = 404;
        throw error;
    }

    if (existingRide.status !== 'pending') {
        const error = new Error('Ride is not in pending state');
        error.status = 400;
        throw error;
    }

    // Update the ride with captain information
    const updatedRide = await rideModel.findOneAndUpdate(
        {
            _id: rideId,
            status: 'pending' // Additional check to prevent race conditions
        },
        {
            status: 'accepted',
            captain: captain._id
        },
        { new: true } // Return updated document
    );

    if (!updatedRide) {
        const error = new Error('Failed to update ride');
        error.status = 400;
        throw error;
    }

    // Fetch complete ride data with populated fields
    const ride = await rideModel.findOne({ _id: rideId })
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        const error = new Error('Failed to fetch updated ride details');
        error.status = 500;
        throw error;
    }

    return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}



module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}