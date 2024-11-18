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
    if (editingRoomId === null) {
        dataHolder.push({ name: roomName, bookedBy: custName, price:roomPrice});
    } else {
        dataHolder[editingRoomId] = { name: roomName, bookedBy: custName, price:roomPrice};
        editingRoomId = null;
        document.getElementById('add-update-btn').value = 'Add Room';
    }
    // clear form
    document.getElementById('room-bookedBy').value = '';
    document.getElementById('room-name').value = '';
    document.getElementById('room-price').value = '';
    
    showRooms();
}


// function to display Rooms

function showRooms () {
    const roomContainer = document.getElementById('room-container');
    roomContainer.innerHTML = '';
    dataHolder.forEach((room, index) => {
        const roomElement = document.createElement('div');
        if (room.bookedBy == null) {
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Price: <strong>${room.price}</strong></p>
                <button onclick="bookRoom()">Book Now</button>
                <button onclick="btnEdit(${index})">Edit</button>
                <button onclick="btnDelete(${index})">Delete</button>
                `;
        } else {
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Booked by <strong>${room.bookedBy}</strong></p>
                <p>Price: <strong>${room.price}</strong></p>
                <button onclick="alert('It is not available at the moment...')">Unavaiable</button>
                <button onclick="btnEdit(${index})">Edit</button>
                <button onclick="btnDelete(${index})">Delete</button>
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
    document.getElementById('add-update-btn').value = 'Update Details';
    editingRoomId = roomIndex;
}

// function for deleting details

function btnDelete(roomIndex) {
    dataHolder.splice(roomIndex, 1);
    showRooms();
    alert('Details deleted...');
}
