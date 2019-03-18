
var korv = '';

var getOldCoordinates = function(longitude,latitude){
  fetch("https://www.lantmateriet.se/api/epi/Transform?from=25&to=RT%2090%202,5%20gon%20V%200:-15%20(RH%202000)&id=16446&x=" + longitude + "&y=" + latitude + "&z=42.860")
    .then( (res) => {
      console.log("thrn1")
      return res.json()
    })
    .then(korv += "korv")
    .catch((err) => {console.log(err)})
}

export default getOldCoordinates;
