module.exports = (app) => {
    // Add room
    require('./Add')(app);
    // Update room
    require('./update')(app);
    // Find all rooms
    require('./findAll')(app);
    // Delete room
    require('./delete')(app);
    // List available rooms
    require('./findRoomEvalable')(app);
    // List valable rooms
    require('./findRoomValable')(app);
    // Find room by primary key
    require('./findByPk')(app);
    // Search room
    require('./search')(app);
}