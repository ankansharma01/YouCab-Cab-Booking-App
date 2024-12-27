const rideService = require('../Services/ride_services')
const {validationResult} = require('express-validator')
const captainModel = require('../Models/captain_model')
const mapService = require('../Services/maps_service')
const {sendMessageToSocketId}  = require('../socket')
const ride_model = require('../Models/ride_model')
// cons

module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: "Validation failed" 
            });
        }

        // Log incoming request data
        console.log('Create ride request:', req.body);
        console.log('Authenticated user:', req.user);

        const { pickup, destination, vehicleType } = req.body;

        // Additional validation
        if (!pickup || !destination || !vehicleType) {
            return res.status(400).json({ 
                message: "Missing required fields", 
                required: ['pickup', 'destination', 'vehicleType'],
                received: { pickup, destination, vehicleType }
            });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                message: "User not authenticated properly" 
            });
        }

        // Create the ride
        const ride = await rideService.createRide({ 
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType 
        });

        // Get coordinates for pickup location
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        
        if (!pickupCoordinates || !pickupCoordinates.ltd || !pickupCoordinates.lng) {
            return res.status(400).json({ 
                message: "Invalid pickup location coordinates" 
            });
        }

        // Find nearby captains
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );

        // Get ride with user details
        const rideWithUser = await ride_model
            .findOne({_id: ride._id})
            .populate('user')
            .select('-otp');

        // Notify available captains
        if (captainsInRadius && captainsInRadius.length > 0) {
            captainsInRadius.forEach(captain => {
                if (captain.socketId) {
                    sendMessageToSocketId(captain.socketId, {
                        event: 'new-ride',
                        data: rideWithUser
                    });
                }
            });
        }

        // Return success response
        res.status(201).json(ride);

    } catch (err) {
        console.error('Create ride error:', err);
        res.status(500).json({ 
            message: err.message || 'Error creating ride',
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};


module.exports.getFare= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() ,message:"Invalid "});
    }
    const { pickup, destination} = req.query;
    const fare = await rideService.getFare(pickup,destination)
    try{
    res.status(200).json(fare)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Error while calculating fare"})
    }

}


module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    
    // Check if captain exists in request
    if (!req.captain) {
        return res.status(401).json({ message: "Captain not authenticated" });
    }

    try {
        // Validate captain object has required fields
        if (!req.captain._id) {
            return res.status(400).json({ message: "Invalid captain data" });
        }

        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        if (!ride.user || !ride.user.socketId) {
            return res.status(400).json({ message: "Invalid user data in ride" });
        }

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error('Ride confirmation error:', err);
        return res.status(err.status || 500).json({ message: err.message });
    }
};


module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}


module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}  