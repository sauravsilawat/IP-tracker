var api_key = "at_MrpijcOdQJ8SqXIbqJlOHljJuBKNn";
var inp = document.querySelector(".searchbar");
var sub = document.querySelector(".form-ipInput").addEventListener("submit", clicked);
var ip = document.getElementById("IP_adress");
var ad = document.getElementById("IP_adress");
var loc = document.getElementById("location");
var tz = document.getElementById("timezone");
var isp = document.getElementById("ISP");
var lat;
var long;
var intpro;
var map = L.map('map');


if(intpro == undefined){
    getip();
}

function geolocation(lat, long) {
    if (lat == undefined && long == undefined) {
        return true
    }
}


//---------------------------------------------------------------------- Creating map


function initmap() {

    // Map layer

    map.setView([lat, long], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Custom marker icon
    var marker = L.icon({
        iconUrl: "./images/icon-location.svg",
    });

    // Marker text
    L.marker([lat, long], { icon: marker }).addTo(map).bindPopup("<b>Your location is: </b><br>" + `${loc.innerHTML}`).openPopup();
}




//---------------------------------------------------------------------- IP location

function getip() {
    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: { apiKey: api_key, ipAddress: intpro },
            success: function (data) {
                ad.innerHTML = data.ip;
                loc.innerHTML = data.location.city + ", " + data.location.country;
                tz.innerHTML = data.location.timezone;
                isp.innerHTML = data.isp;
                lat = data.location.lat;
                long = data.location.lng;
                console.log(data);
                if(!geolocation(lat, long)) {
                    initmap();
                }
                                
            }
        });
    });
}


function clicked(e) {
    e.preventDefault();
    intpro = inp.value;
    console.log(intpro);
    getip(intpro);
}
