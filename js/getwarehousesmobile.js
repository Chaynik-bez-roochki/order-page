var selectRefG,
cityAll = document.getElementById('cityAll').getElementsByTagName('li'),
citySearchFormMobile = document.querySelector('.cityAll'),
warehousesSearchFormMobile = document.querySelector('.warehousesAll'),
errorInvalidWarehousesSearch = 'Извините, тут нет отделений ',
errorInvalidPersonalData = 'Некорректное значение';


citySearchForm.addEventListener("click", e=>{
    if (e.target.tagName=='LI')  cityChange(e.target) });



warehousesSearchForm.addEventListener("click",e=>{
    if (e.target.tagName=='LI') warehousesChange(e.target); });


function cityChange (item){
  window.selectRefG = item.id;
  let opt = document.querySelectorAll('.warehousesAll li');
  opt.forEach(o=> o.remove());
  document.getElementById('outCity').innerText = `${item.outerText} `;
  document.forms.formOne.outCity.value = `${item.outerText} `;
  document.getElementById('outWarehouses').innerHTML = "";
  document.getElementById('tooltiptext-city').style.display = "none";
  

  warehouses ();
};

function warehousesChange(item){
  document.getElementById('outWarehouses').innerHTML = `| ${item.outerText} `;
  document.forms.formOne.outWarehouses.value = `${item.outerText}`
  document.getElementById('tooltiptext-warehouses').style.display = "none";
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

    let opt = document.querySelectorAll('.warehousesAll li');
    opt.forEach(o=> o.remove())
    let select = document.getElementById("warehousesAll");
    let selectLen = document.getElementById("warehousesAll").getElementsByTagName('li');
    console.log(selectLen);
    console.log(selectLen.length);
    for (let item of warehouses){
      let option = document.createElement("li");
      let optionText = document.createTextNode(item.Description);
      let descript = item.Description.toLowerCase();
      let inputLow = b.toLowerCase();
      if (descript.includes(`${inputLow}`)){
         option.appendChild(optionText);
         select.appendChild(option);
        }};
        if (selectLen.length === 0) {
          document.getElementById('tooltiptext-warehouses').innerHTML = errorInvalidPersonalData;
          document.getElementById('tooltiptext-warehouses').style.display = "block";
        } else {document.getElementById('tooltiptext-warehouses').style.display = "none";};
          } else {
            let opt = document.querySelectorAll('.warehousesAll li');
            opt.forEach(o=> o.remove())
            document.getElementById('tooltiptext-warehouses').style.display = "none";
            allWarehouses ();
        } }
      function allWarehouses (){
            let select = document.querySelector(".warehousesAll");
            let selectLen = document.getElementById("warehousesAll").getElementsByTagName('li');
            for (let item of warehouses){
              let option = document.createElement("li");
              let optionText = document.createTextNode(item.Description);
              option.appendChild(optionText);
              select.appendChild(option);
              };
              if (selectLen.length == 0){
                document.getElementById('tooltiptext-warehouses').innerHTML = errorInvalidWarehousesSearch;
                document.getElementById('tooltiptext-warehouses').style.display = "block";}
                else{document.getElementById('tooltiptext-warehouses').style.display = "none"};
        }
};

warehouses()