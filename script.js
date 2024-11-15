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
    if (dataSet) {
        const roomElement = document.getElementById('room-container');
        dataSet.forEach((room) => {
            roomElement.innerHTML += `
                <h2>${room.name}</h2>
                <p>Room booked by £${room.bookedBy} per night</p>
                <p>Price: £${room.price} per night</p>
                <button onclick="bookRoom('${index})"> Book Now </button>
                <button onclick="editRoom(${index})"> Edit Room </button>
                <button onclick="deleteRoom(${index})"> Delete Room </button>
            `;
        });
    }
}

showRooms(dataHolder);
