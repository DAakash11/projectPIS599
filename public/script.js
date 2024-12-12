const roomContainer = document.getElementById('room-container');
const roomBookedBy = document.getElementById('room-bookedBy').value;
const roomName = document.getElementById('room-name').value;
const roomPrice = document.getElementById('room-price').value;
const editingRoomId = null;

// function to add Room details

function addRoom() {
    if (roomName == '' || roomPrice == '') return
    if (editingRoomId === null) {
        if (roomBookedBy == '') {
            dataHolder.push({ roomname: roomName, bookedBy: null, price: roomPrice });
        } else {
            dataHolder.push({ roomname: roomName, bookedBy: roomBookedBy, price: roomPrice });
        }
    } else {
        if (document.getElementById('add-update-btn').value === 'Book Room') {

            // Basic check for valid customer name using regular expressions
            let custRegex = /^[a-zA-Z\s]+$/;    // allows only letters and spaces

            if (!custRegex.test(roomBookedBy)) {
                alert('Only letters and spaces are avaiable. Invalid customer name. Please try again..')
                return;
            }

            alert('The ${roomName} booked for ${roomBookedBy} at £${roomPrice} per night.')
            dataHolder[editingRoomId] = { roomname: roomName, bookedBy: roomBookedBy, price: roomPrice };
            editingRoomId = null;
            document.getElementById('add-update-btn').value = 'Add Room';
        } else {
            dataHolder[editingRoomId] = { roomname: roomName, bookedBy: roomBookedBy, price: roomPrice };
            editingRoomId = null;
            document.getElementById('add-update-btn').value = 'Add Room';
        }
    }
    // clear form
    document.getElementById('room-bookedBy').value = '';
    document.getElementById('room-name').value = '';
    document.getElementById('room-price').value = '';

    showRooms();
}


// function to display Rooms

function showRooms() {
    fetch('http://51.104.6.37:3000/api')
    .then(response => response.json())
    .then(dataHolder => {
        roomContainer.innerHTML = '';
        dataHolder.forEach((room, index) => {
            const roomElement = document.createElement('div');
            if (room.bookedBy == null) {
                roomElement.innerHTML = `
                    <h2>${room.roomname}</h2>
                    <p>Price: <strong>£${room.price}</strong></p>
                    <button onclick="bookRoom(${index})">Book Now</button>
                    <button onclick="btnEdit(${index})">Edit</button>
                    <button onclick="btnDelete(${index})">Delete</button>
                    `;
            } else {
                roomElement.innerHTML = `
                    <h2>${room.roomname}</h2>
                    <p>Booked by <strong>${room.bookedBy}</strong></p>
                    <p>Price: <strong>£${room.price}</strong></p>
                    <button onclick="alert('It is not available at the moment...')">Unavaiable</button>
                    <button onclick="btnEdit(${index})">Edit</button>
                    <button onclick="btnDelete(${index})">Delete</button>
                    `;
            }
            roomContainer.append(roomElement);
        });
    });
}

showRooms();


// function for editing details

function btnEdit(roomIndex) {
    const room = dataHolder[roomIndex];
    document.getElementById('room-bookedBy').value = room.bookedBy;
    document.getElementById('room-name').value = room.roomname;
    document.getElementById('room-price').value = room.price;
    document.getElementById('add-update-btn').value = 'Update Details';
    editingRoomId = roomIndex;
}


// function for booking room in the name of customer later..

function bookRoom(roomIndex) {
    const room = dataHolder[roomIndex];
    document.getElementById('room-name').value = room.roomname;
    document.getElementById('room-price').value = room.price;
    document.getElementById('add-update-btn').value = 'Book Room';
    editingRoomId = roomIndex;
}


// function for deleting details

function btnDelete(roomIndex) {
    if (dataHolder[roomIndex.bookedBy] != null) {
        let msg = dataHolder[roomIndex].bookedBy;
    } else {
        let msg = dataHolder[roomIndex].roomname;        
    }
    dataHolder.splice(roomIndex, 1);
    showRooms();
    alert('Details for ' + msg + ' deleted...');
}
