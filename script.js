let dataHolder = [
    {
        name: "room zero",
        bookedBy: "Hello Mom",
        price: 1234
    }
];


// Display Rooms

function showRooms () {
    const roomContainer = document.getElementById('room-container');
    roomContainer.innerHTML = '';
    dataHolder.forEach((room, index) => {
        const roomElement = document.createElement('room');
        roomElement.innerHTML = `
            <h2>${room.name}</h2>
            <p>Booked by <strong>${room.bookedBy}</strong></p>
            <button onclick="bookRoom()">Book Now</button>
            <button onclick="btnEdit()">Edit</button>
            <button onclick="btnDelete()">Delete</button>
            `;
        roomContainer.appendChild(roomElement);
    });
}

showRooms();