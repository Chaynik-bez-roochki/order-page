var form = document.querySelectorAll('form'),
    formOne = document.forms.formOne,
    inputMandatory = document.querySelectorAll('.mandatory'),
    inputValidate = document.querySelectorAll('.validate'),
    radioBoxs = document.querySelectorAll('.radioBox'),
    tooltipActiv = document.querySelectorAll('.tooltipActiv'),
    payment = document.querySelectorAll('.payment'),
    AdressForm = document.getElementById('delivery-np'),
    outCity = document.getElementById('outCity'),
    outWarehouses = document.getElementById('outWarehouses'),
    subBtn = document.querySelector('.btn-checkout'),
    errorInvalidPersonalData = 'Некорректное значение',
    errorInvalidMandatoryData = 'Заполните поле',
    errorInvalidPayment = 'Выберите3 способ оплаты',
    errorInvalidDelivery = 'Выберите3 способ доставки',
    errorInvalidDeliveryCity = 'Укажите город доставки',
    errorInvalidDeliveryWarehouses = 'Укажите отделение',
    atention = 'ВНИМАНИЕ!',
    invalidInput = 'Вы не заполнили все обязательные формы либо в формах присутствую некорректные значения',
    wait = 'ПОДОЖДИТЕ!',
    loading = 'Данные отправляются',
    thank = 'СПАСИБО!',
    success = 'Ваш заказ принят в обработку',
    saleOk = 'Ваша подписка на бесконечный спам оформлена',
    error = 'Что-то пошло не так',
    popupError = "url('./img/popup-error.png')",
    popupErrorSubmit = "url('./img/popup-error-submit.png')",
    popupSubmit = "url('./img/popup-submit.png')",
    popupLoading = "url('./img/popup-loading.png')";

// валидация по потере фокуса


form.forEach(item => {
    item.addEventListener("focusout", ({target})=>{
        if (target.hasAttribute("data-reg")) {
            let targetValue = target.value;
            let targetReg = new RegExp(target.getAttribute("data-reg"));
            if (targetReg.test(targetValue)||targetValue=="") {
            target.classList.remove('error');
            target.nextElementSibling.style.display = "none";
            } else {
            target.classList.add('error');
            target.nextElementSibling.style.display = "block";
            target.nextElementSibling.innerHTML = errorInvalidPersonalData
            }
        }
    })
});

// отмена ошибки валидации методов отправки и оплаты
radioBoxs.forEach(item => {
    item.addEventListener("click", e=>{
        if (e.target.tagName=='INPUT') item.querySelector('.tooltiptext-method').style.display = "none"; });
});

// общая валидация

function allValidation (){
    inputMandatory.forEach((input)=>{
        if (input.value === "")
        {input.classList.add('error');
        input.nextElementSibling.style.display = "block";
        input.nextElementSibling.innerHTML = errorInvalidMandatoryData;
        } else {
        input.classList.remove('error');
        };
    });
    radioBoxs.forEach(item => {
        let checked = 0;
        itemInput = item.querySelectorAll('.radio-select');
        itemInput.forEach(checkedInput => {
            if (checkedInput.checked) {
                checked++;
            };
        })
        if (checked == 0) {
            item.querySelector('.tooltiptext-method').style.display = "block";
        }
    });
    if (document.querySelector('.delivery-adress').display === 'block'){
        if (outCity.textContent.length == 0) {
            document.getElementById('tooltiptext-city').innerHTML = errorInvalidDeliveryCity;
            document.getElementById('tooltiptext-city').style.display = "block";
        }
        if (outWarehouses.textContent.length == 0) {
            document.getElementById('tooltiptext-warehouses').innerHTML = errorInvalidDeliveryWarehouses;
            document.getElementById('tooltiptext-warehouses').style.display = "block";
        }
    }
};



formOne.addEventListener('submit', (e)=> {
    allValidation();
    e.preventDefault();
    let stopSubmit = 0;
    tooltipActiv.forEach(item =>{
        if (item.style.display === "block"){
            stopSubmit++;
        }
    });
    if (stopSubmit !== 0) {
        popupContent (atention, invalidInput, popupError);
    }
    else {
        const formData = new FormData(formOne);
        postData('./server.php',formData)
            .then(res => {
                popupContent (thank, success, popupSubmit);
                submitSeccecc ()
                console.log(res);
                })
            .catch(()=>{
                popupContent (atention, error, popupErrorSubmit);
    })
    };

});

document.forms.sale.addEventListener('submit', (e)=> {
    saleValidation();
    e.preventDefault();
        if (document.querySelector('.tooltiptext-footer').style.display === "block"){
            popupContent (atention, invalidInput, popupError);
        }
    else {
        const formData = new FormData(document.forms.sale);
        postData('./server.php',formData)
            .then(res => {
                popupContent (thank, saleOk, popupSubmit);
                submitSeccecc ()
                console.log(res);
                })
            .catch(()=>{
                popupContent (atention, error, popupErrorSubmit);
    })
    };

});


function saleValidation () {
    let inputSaleEmail = document.getElementById('email-sale').value;
    if (inputSaleEmail.length == 0) {
        document.getElementById('sale-tooltip').style.display = "block";
        document.getElementById('sale-tooltip').innerHTML = errorInvalidMandatoryData;
    } 
};

async function postData (url, data){
                popupContent (wait, loading, popupLoading);
    let res = await fetch(url, {
        method: "POST",
        body: data,
    });
    return await res.text();
   };

   function popupContent (title, text, url){
        document.getElementById('popup__title').textContent = title;
        document.getElementById('popup__text').textContent = text;
        document.getElementById('popup__content').style.backgroundImage = url;
        document.getElementById('popup').style.display = "block";
   };

   function submitSeccecc (){
    setTimeout(() => {
        document.getElementById('popup').style.display = "none";
    }, 3000);
    clearInputs = document.querySelectorAll('input');
    radioInputs = document.querySelectorAll('.radio-select');
    clearInputs.forEach(item =>{
            item.value = "";
    });
    radioInputs.forEach(item =>{
        item.checked = false;
    });
   };


// gjhgjhj@rfgd.dfgd
