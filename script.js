let dataHolder = [
    {
        name: "room zero",
        bookedBy: "Hello Mom",
        price: 2500
    },
    {
        name: "room zero",
        bookedBy: null,
        price: 2500
    }
];
editingRoomId = null;

// function to add Room details

function addRoom() {
    const custName = document.getElementById('room-bookedBy').value;
    const roomName = document.getElementById('room-name').value;
    const roomPrice = document.getElementById('room-price').value;
    dataHolder.push({ bookedBy: custName, name: roomName, price:roomPrice});
    showRooms();
}


// function to display Rooms

function showRooms () {
    const roomContainer = document.getElementById('room-container');
    dataHolder.forEach((room, index) => {
        const roomElement = document.createElement('div');
        roomElement.innerHTML = '';
        if (room.bookedBy == null) {
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Price: <strong>${room.price}</strong></p>
                <button onclick="bookRoom()">Book Now</button>
                <button onclick="btnEdit()">Edit</button>
                <button onclick="btnDelete()">Delete</button>
                `;
        } else {
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Booked by <strong>${room.bookedBy}</strong></p>
                <p>Price: <strong>${room.price}</strong></p>
                <button onclick="alert('It is not available at the moment...')">Unavaiable</button>
                <button onclick="btnEdit()">Edit</button>
                <button onclick="btnDelete()">Delete</button>
                `;
        }
        roomContainer.append(roomElement);
    });
}

showRooms();

// function for editing details

function btnEdit(roomIndex) {
    const room = dataHolder[roomIndex];
    document.getElementById('room-bookedBy').value = room.bookedBy;
    document.getElementById('room-name').value = room.name;
    document.getElementById('room-price').value = room.price;
    document.getElementById('add-update-btn').textContent = 'Update Details';
    editingRoomId = roomIndex;
}

// function for deleting details

function btnDelete(roomIndex) {
    room.splice(roomIndex, 1);
    showRooms();
    alert('Details deleted...');
}
