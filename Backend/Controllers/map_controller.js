const mapService = require('../Services/maps_service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    } 

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json({
            success: true,
            data: coordinates
        });
    } catch (error) {
        console.error('Geocoding error:', error.message);
        
        // Handle different types of errors with appropriate status codes
        let statusCode = 500;
        let message = error.message;

        if (message.includes('API key')) {
            statusCode = 401;
        } else if (message.includes('Invalid address') || message.includes('Invalid request')) {
            statusCode = 400;
        } else if (message.includes('No coordinates found')) {
            statusCode = 404;
        } else if (message.includes('query limit')) {
            statusCode = 429;
        }

        res.status(statusCode).json({ 
            success: false,
            error: message 
        });
    }
}



module.exports.getDistanceTime = async (req, res, next) => {
try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const distanceTime = await mapService.getDistanceTime(origin, destination);

    res.status(200).json(distanceTime);

} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}
}



module.exports.getSuggestions = async (req,res,next) =>
{
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}