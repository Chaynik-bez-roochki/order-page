var selectRefG,
errorInvalidWarehousesSearch = 'Извините, тут нет отделений ',
errorInvalidPersonalData = 'Некорректное значение';

citySearchForm.city.addEventListener("change",cityChange);
warehousesSearchForm.warehouses.addEventListener("change",warehousesChange);


function cityChange (){
  window.selectRefG = this.value;
  let opt = document.querySelectorAll('.warehousesAll option');
    opt.forEach(o=> o.remove());
  document.getElementById('outCity').innerHTML = `${this.options[this.selectedIndex].text} `;
  document.getElementById('tooltiptext-city').style.display = "none";
  warehouses ();
};

function warehousesChange(){
  document.getElementById('outWarehouses').innerHTML = `| ${this.options[this.selectedIndex].text} `;

};




async function getWarehouses (){
    let selectRef = window.selectRefG;
    const url = 'https://api.novaposhta.ua/v2.0/json/'
    const param = {
    method: 'post',
     body: JSON.stringify({
    apiKey: "eddf718f9049c03876b3c7cd0e2c9168",
     modelName: "Address",
    calledMethod: "getWarehouses",
     methodProperties: {CityRef: `${selectRef}` }
    }),
    headers: {
    'content-type': 'application/json'
    }
    }
    const response = await fetch(url,param);
    const data = await response.json();
    let warehouses = data.data;
    return warehouses
};

async function warehouses(){
var warehouses = await getWarehouses ();

allWarehouses ();

let input_w = document.querySelector('#warehousesSearch');
input_w.oninput = function(){
    let b = new String(this.value);
    if (b.length >= 3){
    let opt = document.querySelectorAll('.warehousesAll option');
    opt.forEach(o=> o.remove())
    let select = document.querySelector(".warehousesAll");
    for (let item of warehouses){
      let option = document.createElement("option");
      let optionText = document.createTextNode(item.Description);
      let descript = item.Description.toLowerCase();
      let inputLow = b.toLowerCase();
      if (descript.includes(`${inputLow}`)){
         option.appendChild(optionText);
         select.appendChild(option);
        }};
        if (select.length === 0) {
          document.getElementById('tooltiptext-warehouses').innerHTML = errorInvalidPersonalData;
          document.getElementById('tooltiptext-warehouses').style.display = "block";
        };
          } else {
            let opt = document.querySelectorAll('.warehousesAll option');
            opt.forEach(o=> o.remove())
            allWarehouses ();
        } }
        function allWarehouses (){
            let select = document.querySelector(".warehousesAll")
            for (let item of warehouses){
              let option = document.createElement("option");
              let optionText = document.createTextNode(item.Description);
              option.appendChild(optionText);
              select.appendChild(option);
              };
              if (select.length == 0){
                document.getElementById('tooltiptext-warehouses').innerHTML = errorInvalidWarehousesSearch;
                document.getElementById('tooltiptext-warehouses').style.display = "block";}
                else{document.getElementById('tooltiptext-warehouses').style.display = "none"};
        }
};

warehouses()