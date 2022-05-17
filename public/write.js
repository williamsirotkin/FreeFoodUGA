var firebaseConfig = {
    apiKey: "AIzaSyDOs0oemIBzgsVvsS-mzWSSQET6SuHU_Nc",
    authDomain: "free-food-uga-97846.firebaseapp.com",
    databaseURL: "https://free-food-uga-97846-default-rtdb.firebaseio.com",
    projectId: "free-food-uga-97846",
    storageBucket: "free-food-uga-97846.appspot.com",
    messagingSenderId: "538379971058",
    appId: "1:538379971058:web:d69e20fe412440efc9636b",
    measurementId: "G-6C4FBTMGM1"
};

firebase.initializeApp(firebaseConfig);  

// Default valuesfun
var count = 0;
var latitude = 50;
var longitude = 50;

function checkUser() {
    const user = firebase.auth().currentUser;
    if (user) {
        writeMarker();
    } else {
        signin_page();
    }
}

function writeMarker() {
    if (count == 0) {
        getLat("Nothing")
    } 
    var select = document.getElementById('locationInput');
    var building = select.options[select.selectedIndex].value;
    getLat(building);
}

function signin_page() {
    window.location.href = "signin2.html";
}

async function getLat(building) {
    console.log(count);
    if (count == 0 || building == "Nothing") {
        count++;
        var firebaseRef = firebase.database().ref('Marker');
        initMap();
    } else {
        var dbRef1 = firebase.database().ref().child('Buildings').child(building).child('Latitude');
        dbRef1.on('value', snap => {
            latitude = snap.val();
            dbRef1 = firebase.database().ref().child('Buildings').child(building).child("Longitude");
            dbRef1.on('value', snap => {
                longitude = snap.val();
                var select = document.getElementById("foodType");
                var food = select.options[select.selectedIndex].value;
                select = document.getElementById('duration');
                var duration = select.options[select.selectedIndex].value;
                var eventType = document.getElementById('eventType').value;
                var additional = document.getElementById('additionalType').value;
                var dateCreated = new Date().toString();
                var formattedDateCreated = dateCreated.substring(dateCreated.indexOf(":") - 2, dateCreated.indexOf(":") + 3);
                var data = {
                    Building : building,
                    Food : food,
                    Event : eventType,
                    Additional : additional,
                    Latitude : latitude,
                    Longitude: longitude,
                    Duration: duration,
                    Creation: formattedDateCreated
                }
                var firebaseRef = firebase.database().ref('Marker');
                if (building != "Aderhold") {
                    markers.push(data);
                    firebaseRef.push(data);
                }
                initMap();
            })
        });
    }
}

