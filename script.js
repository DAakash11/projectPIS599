let dataHolder = [
    {
        roomIndex: 1,
        name: "room zero",
        bookedBy: "Hello Mom",
        price: 1234
    }
];


// Display Rooms

function showRooms (dataSet) {
    const roomContainer = document.getElementById('room-container');
    if (dataSet) {
        dataSet.forEach((room) => {
            const roomElement = document.createElement('div');
            roomElement.className = room;
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Room booked by £${room.bookedBy} per night</p>
                <p>Price: £${room.price} per night</p>
                <input type="submit" value="Book Now" onclick="bookRoom('${room.name}', ${room.price})" />
                <input type="submit" value="Edit" onclick="editRoom(${room.roomIndex})" />
                <input type="submit" value="Delete" onclick="deleteRoom(${room.roomIndex})" />
            `;
        });
    }
}

showRooms(dataHolder);

// Add or Update a room

function addRoom() {
    const roomName = document.getElementById('room-name').value;
    const roomBookedBy = document.getElementById('room-bookedBy').value;
    const roomPrice = document.getElementById('room-price').value;
    room.push({ name: roomName, bookedBy: roomBookedBy, price: parseInt(roomPrice)});
    if (editingRoomId === null) {
    } else {
        rooms[editingRoomId] = { name:roomName, bookedBy: roomBookedBy, price: parseInt(roomPrice)};
        editingRoomId = null;
        document.getElementById('add-update-btn').value = 'Add Room';
    }
    showRooms();
}

