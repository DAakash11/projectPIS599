var roomContainer = document.getElementById('room-container');
var roomForm = document.getElementById('room-form');

var editingRoomId = null;

// function to add Room details

function addRoom() {
    var roomBookedBy = document.getElementById('room-bookedBy').value;
    var roomName = document.getElementById('room-name').value;
    var roomPrice = document.getElementById('room-price').value;
    if (roomName == '' || roomPrice == '') return
    if (editingRoomId === null) {
        if (roomBookedBy == '') {
            var newRoom = {
                roomname: roomName,
                bookedBy: '',
                price: roomPrice
            };
        } else {
            var newRoom = {
                roomname: roomName,
                bookedBy: roomBookedBy,
                price: roomPrice
            };
        }
        fetch('http://51.104.6.37:3000/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRoom),
        }).then(() => {
            showRooms();
            roomForm.reset();
        }).catch(error => console.error('Error adding rooms:', error));
    } else {
        if (document.getElementById('add-update-btn').value === 'Book Room') {

            // Basic check for valid customer name using regular expressions
            let custRegex = /^[a-zA-Z\s]+$/;    // allows only letters and spaces

            if (!custRegex.test(roomBookedBy)) {
                alert('Only letters and spaces are avaiable. Invalid customer name. Please try again..')
                return;
            }

            alert(`The ${roomName} booked for ${roomBookedBy} at £${roomPrice} per night.`)
            var newRoom = {
                roomname: roomName,
                bookedBy: roomBookedBy,
                price: roomPrice
            };
        } else {
            var newRoom = {
                roomname: roomName,
                bookedBy: '',
                price: roomPrice
            };
        }
        fetch(`http://51.104.6.37:3000/api/${editingRoomId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRoom),
        }).then(response => {
            if (response.ok) {
                alert('Details updated..')
                showRooms();
                roomForm.reset();
            } else {
                return response.json().then(err => {
                    alert('Failed to update vital: ' + (err.message || response.statusText));
                });
            }
        }).catch(error => console.error('Error adding rooms:', error));
        document.getElementById('add-update-btn').value = 'Add Room';
        editingRoomId = null;
    }
}


// function to display Rooms

function showRooms() {
    fetch('http://51.104.6.37:3000/api')
        .then(response => response.json())
        .then(data => {
            roomContainer.innerHTML = '';
            dataHolder = data;
            console.log(dataHolder);
            data.forEach((room) => {
                const roomElement = document.createElement('div');
                if (room.bookedBy == '') {
                    roomElement.innerHTML = `
                    <h2>${room.roomname}</h2>
                    <p>Price: <strong>£${room.price}</strong></p>
                    <button onclick="bookRoom('${room._id.toString()}')">Book Now</button>
                    <button onclick="btnEdit('${room._id.toString()}')">Edit</button>
                    <button onclick="btnDelete('${room._id.toString()}')">Delete</button>
                    `;
                } else {
                    roomElement.innerHTML = `
                    <h2>${room.roomname}</h2>
                    <p>Booked by <strong>${room.bookedBy}</strong></p>
                    <p>Price: <strong>£${room.price}</strong></p>
                    <button onclick="alert('It is not available at the moment...')">Unavaiable</button>
                    <button onclick="btnEdit('${room._id.toString()}')">Edit</button>
                    <button onclick="btnDelete('${room._id.toString()}')">Delete</button>
                    `;
                }
                roomContainer.append(roomElement);
            });
        });
}

showRooms();


// function for editing details

function btnEdit(roomIndex) {
    fetch(`http://51.104.6.37:3000/api/${roomIndex}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('room-bookedBy').value = data.bookedBy;
            document.getElementById('room-name').value = data.roomname;
            document.getElementById('room-price').value = data.price;
            document.getElementById('add-update-btn').value = 'Update Details';
            editingRoomId = data._id.toString();
        })
}


// function for booking room in the name of customer later..

function bookRoom(roomIndex) {
    fetch(`http://51.104.6.37:3000/api/${roomIndex}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('room-bookedBy').value = data.bookedBy;
            document.getElementById('room-name').value = data.roomname;
            document.getElementById('room-price').value = data.price;
            document.getElementById('add-update-btn').value = 'Book Room';
            editingRoomId = data._id.toString();
        })
}


// function for deleting details

function btnDelete(roomIndex) {
    fetch(`http://51.104.6.37:3000/api/${roomIndex}`, { method: 'DELETE' }).then(() => {
        showRooms();
        roomForm.reset();
    }).catch(error => console.error('Error adding rooms:', error));
    // let msg = dataHolder[roomIndex].roomname;
    alert('Details deleted...');
}
