
var errorInvalidCitySearch = 'Неизвестное значение';

async function getCity (){
  const url = 'https://api.novaposhta.ua/v2.0/json/'
  const param = {
  method: 'post',
   body: JSON.stringify({
  apiKey: "eddf718f9049c03876b3c7cd0e2c9168",
   modelName: "Address",
  calledMethod: "getCities",
   methodProperties: {}
  }),
  headers: {
  'content-type': 'application/json'
  }
  }
  const response = await fetch(url,param);
  const data = await response.json();
  let cityList = data.data
  return cityList
};

async function citySearch (){
var cityList = await getCity ()

allCity ()
let input = document.querySelector('#citySearch');
input.oninput = function(){
    let b = new String(this.value);
    if (b.length >= 3){
        let opt = document.querySelectorAll('option');
        opt.forEach(o=> o.remove());
        let select = document.querySelector(".cityAll");
        for (let item of cityList){
            let option = document.createElement("option");
            let optionText = document.createTextNode(item.Description);
            let descriptFull = item.Description.toLowerCase();
            let descript = descriptFull.substring(0,b.length);
            let inputLow = b.toLowerCase();
            if (descript.includes(`${inputLow}`)){
                option.setAttribute('value', item.Ref);
                option.appendChild(optionText);
                select.appendChild(option);
            }};
            if (select.length == 0) {document.getElementById('tooltiptext-city').innerHTML = errorInvalidCitySearch;
            document.getElementById('tooltiptext-city').style.display = "block";
            document.getElementById('tooltiptext-warehouses').style.display = "none";}
    } else {
        let opt = document.querySelectorAll('option');
        document.getElementById('tooltiptext-city').style.display = "none"
        opt.forEach(o=> o.remove())
        allCity ();
    }
};


function allCity (){
for (let item of cityList){
    let select = document.querySelector(".cityAll")
    let option = document.createElement("option");
    let optionText = document.createTextNode(item.Description);
    option.setAttribute('value', item.Ref)
    option.appendChild(optionText);
    select.appendChild(option);
    }};
  };

  citySearch ();


