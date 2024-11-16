let dataHolder = [
    {
        name: "room zero",
        bookedBy: "Hello Mom",
        price: 2500
    }
];
editingRoomId = null;

// Display Rooms

function showRooms () {
    const roomContainer = document.getElementById('room-container');
    dataHolder.forEach((room, index) => {
        const roomElement = document.createElement('div');
        roomElement.innerHTML = `
            <h2>${room.name}</h2>
            <p>Booked by <strong>${room.bookedBy}</strong></p>
            <p>Price: <strong>${room.price}</strong></p>
            <button onclick="bookRoom()">Book Now</button>
            <button onclick="btnEdit()">Edit</button>
            <button onclick="btnDelete()">Delete</button>
            `;
        roomContainer.appendChild(roomElement);
    });
}

showRooms();

function btnEdit(roomIndex) {
    const room = dataHolder[roomIndex];
    document.getElementById('room-bookedBy').value = room.bookedBy;
    document.getElementById('room-name').value = room.name;
    document.getElementById('room-price').value = room.price;
    document.getElementById('add-update-btn').textContent = 'Update Details';
    editingRoomId = roomIndex;
}

function btnDelete(roomIndex) {
    room.splice(roomIndex, 1);
    showRooms();
    alert('Details deleted...');
}
