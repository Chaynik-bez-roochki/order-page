var paymentAction = document.querySelector('.payment-methods'),
    deliveryAction = document.querySelector('.delivery-methods'),
    paymentDiscript = document.getElementById('method-discript'),
    optionDiscript = document.getElementById('option-discript'),
    paymentUponReceipt = 'Возможно взимание платы за наложенный платеж по тарифам перевозчика',
    paymentOnSite = 'При оплате товаров на сайте картами Visa или Mastercard, скидка 5% ',
    bankTransfer = 'Возможно взимание платы за операцию по тарифам банка',
    pickup = '',
    np = 'Стоимость доставки 80 грн. Наложенный платеж 2% от суммы заказа',
    up = 'Стоимость доставки 70 грн. Наложенный платеж 2% от суммы заказа',
    cost = 3585,
    paymentPercentTax = 0,
    salePercentTax = 0,
    deliveryTax = 0,
    deliveryPercentTax = 0,
    deliveryCheck = 0,
    tax = 0;


    totalCheck()

    paymentAction.addEventListener("click", e=>{
        if (e.target.id =='payment-1')
        {paymentDiscript.innerHTML = paymentUponReceipt;
            salePercentTax = 0;} 
        if (e.target.id =='payment-2')
        {paymentDiscript.innerHTML = paymentOnSite;
        salePercentTax = 5;
        } 
        if (e.target.id =='payment-3')
        {paymentDiscript.innerHTML = bankTransfer;
            salePercentTax = 0;} 
        if (e.target.tagName=='INPUT')
        {paymentDiscript.style.display = "block";
        totalCheck()
        }
        });

    deliveryAction.addEventListener("click", e=>{
        if (e.target.id =='delivery-1')
        {optionDiscript.innerHTML = pickup;
            deliveryPercentTax = 0;
            deliveryTax = 0;
            document.getElementById('adressForm').style.display = "none";
            document.getElementById('delivery-np').style.display = "none";
        } 
        if (e.target.id =='delivery-2')
        {optionDiscript.innerHTML = np;
            deliveryPercentTax = 2;
            deliveryTax = 80;
            document.getElementById('adressForm').style.display = "block";
            document.getElementById('delivery-np').style.display = "block";
         } 
        if (e.target.id =='delivery-3')
        {optionDiscript.innerHTML = up;
            deliveryPercentTax = 2;
            deliveryTax = 70;
            document.getElementById('adressForm').style.display = "block";
            document.getElementById('delivery-np').style.display = "none";} 
        if (e.target.tagName=='INPUT')
        {optionDiscript.style.display = "block";
        totalCheck()
        }
        });

        function totalCheck () {
            tax = cost - cost / 100 * salePercentTax + deliveryTax + cost / 100 * deliveryPercentTax;
            deliveryCheck = deliveryTax + cost / 100 * deliveryPercentTax;
            document.getElementById('cost').innerHTML = cost;
            document.getElementById('tax').innerHTML = tax;
            document.getElementById('deliveryCheck').innerHTML = deliveryCheck;
            document.getElementById('sale').innerHTML = `-${cost / 100 * salePercentTax}`;
        }
        
