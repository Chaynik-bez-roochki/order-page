var form = document.querySelector('.personal-data'),
    formFooter = document.querySelector('.sale'),
    inputMandatory = document.querySelectorAll('.mandatory'),
    inputValidate = document.querySelectorAll('.validate'),
    paymentForm = document.querySelector('.payment-methods'),
    deliveryForm = document.querySelector('.delivery-methods'),
    paymentMethods = document.getElementsByName('payment'),
    deliveryMetods = document.getElementsByName('delivery'),
    payment = document.querySelectorAll('.payment'),
    AdressForm = document.getElementById('delivery-np'),
    outCity = document.getElementById('outCity').textContent,
    outWarehouses = document.getElementById('outWarehouses').textContent,
    subBtn = document.querySelector('.btn-checkout'),
    errorInvalidPersonalData = 'Некорректное значение',
    errorInvalidMandatoryData = 'Заполните поле',
    errorInvalidPayment = 'Выберите способ оплаты',
    errorInvalidDelivery = 'Выберите способ доставки',
    errorInvalidDeliveryCity = 'Укажите город доставки',
    errorInvalidDeliveryWarehouses = 'Укажите отделение';

// валидация по потере фокуса

form.addEventListener("input", inputValidation );
formFooter.addEventListener("input", inputValidation );

function inputValidation({target}){
    if (target.hasAttribute("data-reg")) {
        validation(target);
    }
};

function validation(item){
    item.addEventListener("blur",(e)=>{
        let targetValue = item.value;
    let targetReg = new RegExp(item.getAttribute("data-reg"));
    if (targetReg.test(targetValue)||targetValue=="") {
        item.classList.remove('error');
        item.nextElementSibling.style.display = "none";
    } else {
        item.classList.add('error');
        item.nextElementSibling.style.display = "block";
        item.nextElementSibling.innerHTML = errorInvalidPersonalData
    }
    })
    
};


// общая валидация

subBtn.addEventListener("click",allValidation );
paymentForm.addEventListener("click", e=>{
    if (e.target.tagName=='INPUT') document.getElementById('payment-tooltip').style.display = "none"; });
deliveryForm.addEventListener("click", e=>{
    if (e.target.tagName=='INPUT') document.getElementById('delivery-tooltip').style.display = "none"; });

function allValidation (event){
    let mandatoryEror = 0,
        paymentCheked = 0,
        deliveryCheked = 0;
    inputMandatory.forEach(function(input){
        if (input.value === "")
        {input.classList.add('error');
        mandatoryEror++;
        input.nextElementSibling.style.display = "block";
        input.nextElementSibling.innerHTML = errorInvalidMandatoryData;
        } else {
        input.classList.remove('error');
        };
    });
    if (mandatoryEror !== 0) {
        event.preventDefault();
    };

    for (let i=0; i<paymentMethods.length; i++){
        if (paymentMethods[i].checked) {
            paymentCheked++;
        };
    };
    if (paymentCheked == 0) {
        document.getElementById('payment-tooltip').innerHTML = errorInvalidPayment;
        document.getElementById('payment-tooltip').style.display = "block";
        event.preventDefault();
    };
    for (let i=0; i<deliveryMetods.length; i++){
        if (deliveryMetods[i].checked) {
            deliveryCheked++;
        };
    };
    if (deliveryCheked == 0) {
        document.getElementById('delivery-tooltip').innerHTML = errorInvalidDelivery;
        document.getElementById('delivery-tooltip').style.display = "block";
        event.preventDefault();
    };

    if (getComputedStyle(AdressForm).display !== 'none'){
        if (outCity.length == 0) {
            document.getElementById('tooltiptext-city').innerHTML = errorInvalidDeliveryCity;
            document.getElementById('tooltiptext-city').style.display = "block";
            event.preventDefault();
        }
        if (outWarehouses.length == 0) {
            document.getElementById('tooltiptext-warehouses').innerHTML = errorInvalidDeliveryWarehouses;
            document.getElementById('tooltiptext-warehouses').style.display = "block";
            event.preventDefault();
        }
    };

};

document.querySelector('.btn-sale').addEventListener("click", saleSubmit);

function saleSubmit (event) {
    let inputSaleEmail = document.getElementById('email-sale').value;
    if (inputSaleEmail.length == 0) {
        document.getElementById('sale-tooltip').style.display = "block";
        document.getElementById('sale-tooltip').innerHTML = errorInvalidMandatoryData;
        event.preventDefault();
    } else {event.preventDefault();}

};