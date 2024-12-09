import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://hotelroombookings:rooms123@cluster0.x5wvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("roombooking").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



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
const result = await collection.insertOne(dataHolder);


// function to add Room details

function addRoom() {
    const roomBookedBy = document.getElementById('room-bookedBy').value;
    const roomName = document.getElementById('room-name').value;
    const roomPrice = document.getElementById('room-price').value;
    if (roomName == '' || roomPrice == '')
        return 
    if (editingRoomId === null) {
        if (roomBookedBy == '') {
            dataHolder.push({ name: roomName, bookedBy: null, price:roomPrice});            
        } else {
            dataHolder.push({ name: roomName, bookedBy: roomBookedBy, price:roomPrice});
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
            dataHolder[editingRoomId] = { name: roomName, bookedBy: roomBookedBy, price:roomPrice};
            editingRoomId = null;
            document.getElementById('add-update-btn').value = 'Add Room';
        } else {
            dataHolder[editingRoomId] = { name: roomName, bookedBy: roomBookedBy, price:roomPrice};
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

async function showRooms () {
    const dataHolder = await collection.find().toArray();
    const roomContainer = document.getElementById('room-container');
    roomContainer.innerHTML = '';
    dataHolder.forEach((room, index) => {
        const roomElement = document.createElement('div');
        if (room.bookedBy == null) {
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Price: <strong>£${room.price}</strong></p>
                <button onclick="bookRoom(${index})">Book Now</button>
                <button onclick="btnEdit(${index})">Edit</button>
                <button onclick="btnDelete(${index})">Delete</button>
                `;
        } else {
            roomElement.innerHTML = `
                <h2>${room.name}</h2>
                <p>Booked by <strong>${room.bookedBy}</strong></p>
                <p>Price: <strong>£${room.price}</strong></p>
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


// function for booking room in the name of customer later..

function bookRoom(roomIndex) {
    const room = dataHolder[roomIndex];
    document.getElementById('room-name').value = room.name;
    document.getElementById('room-price').value = room.price;
    document.getElementById('add-update-btn').value = 'Book Room';
    editingRoomId = roomIndex;
}


// function for deleting details

function btnDelete(roomIndex) {
    let msg = dataHolder[roomIndex].name;
    dataHolder.splice(roomIndex, 1);
    showRooms();
    alert('Details for '+ msg +' deleted...');
}
