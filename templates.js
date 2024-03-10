
function templateContent() {
    return `

    <div class="header" id="header">
        <img class="lieferando-lettering pointer" src="./icons/lieferando_lettering.png" alt="">
        <h6 class="header-headline">Speisekarte</h6>
        <div class="header-icons">
            <img class="german-flag pointer" src="./icons/germany_icon.png" alt="">
            <img class="menu-icon pointer" src="./icons/bars-solid.svg" alt="">
        </div>
    </div>

        <div class="main-section">
            <div class="menu-section">
                <div>
                    <img class="header-img" src="./img/header_img.jpg" alt="">
                    <img id="restaurant-img" class="restaurant-img" src="./img/kettle_img.jpg" alt="">
                    <h1 class="restaurant-title">Zum Tropfenden Kessel</h1>
                    <div class="rating">
                        <img class="star-rating" src="./icons/stars_icon.png" alt="">
                        <div class="rating-count pointer">719 Bewertungen</div>
                    </div>
                    <div class="location"><img class="location-icon" src="./icons/location_icon.svg" alt=""> Winkelgasse
                        1
                    </div>
                </div>
                <div class="menu">
                    <h2 class="menu-sub-section-headline">Speisen</h2>
                    <div id="dishes" class="menu-sub-section">  
                    </div>
                    <h2 class="menu-sub-section-headline">Getränke</h2>
                    <div id="drinks" class="menu-sub-section">   
                    </div>
                </div>
            </div>

            <div id="basket" class="basket">
                <div id="basket-header" class="basket-header">
                </div>
                <div id="basket-content" class="basket-content">
                </div>

                <div id="charge-order-container" class="charge-order-container">
                </div>
            </div>
            <div id="responsive-basket-btn-container" class="responsive-basket-btn-container">
                
            </div>
        </div>

</body>
`;
}

function templateDish(dish, dishDescription, dishPrice, dishImg, i, y) { // i unterscheidet dishes von drinks, y unterscheidet die Speisen bzw. Geträmke untereinander
    return `
<div onclick="addToBasket(${i}, ${y})" id="dish${y}" class="dish pointer">
    <div class="dish-text-container">
        <h3 class="dish-title">${dish}</h3>
        <div class="dish-description">${dishDescription}</div>
        <h3 class="dish-price">${dishPrice} €</h3>
    </div>
    <div class="dish-img-container">
        <img class="dish-img" src="${dishImg}" alt="">
        <div class="add-to-basket-btn">
            <img class="plus-icon-add-to-basket" src="./icons/plus_icon.svg" alt="">
        </div>
    </div>
</div>
    `;
}

function templateBasketHeader() {
    return `
    <h2 class="basket-title">Warenkorb</h2>
    <div class="deliver-collect">
        <div class="deliver-collect-text-container">
            <div id="deliver-background" class="deliver-collect-white-background">
                <div onclick="deliverCollectSwitch('deliver')" class="deliver-collect-text pointer" id="deliver">Lieferung</div>
            </div>
            <div id="collect-background" class="">
                <div onclick="deliverCollectSwitch('collect')" class="deliver-collect-text pointer" id="collect">Abholung</div>
            </div>
        </div>
    </div>
`;
}

function templateEmptyBasket() {
    return `
<div class="empty-basket">
    <img class="basket-icon" src="./icons/shoppingbag_icon.svg" alt="">
      <h2>Fülle deinen Warenkorb</h2>
      <div class="basket-text">Füge einige leckere Gerichte aus der<br>Speisekarte hinzu und bestelle dein Essen.</div>
  </div>

    
    `;
}

function templateFillBasket(amount, dish, price, i) {
    return `
    <div id="dish-in-basket${i}" class="dish-in-basket">
        <div class="dish-in-basket-info">
            <div id="" class="">
                <span id="" class="amount">${amount}</span>
                <span id="" class="">${dish}</span>
            </div>
            <div id="" class="dish-in-basket-price">${price} €</div>
        </div>
        <div class="change-amount-in-basket">
            <div onclick="removeFromBasket(${i})" class="change-amount-btn pointer">
                <img class="plus-minus-icon-basket" src="./icons/minus_icon.svg" alt="">
            </div>
            <div id="" class="amount">${amount}</div>
            <div onclick="increaseAmount(${i})" class="change-amount-btn pointer">
                <img class="plus-minus-icon-basket" src="./icons/plus_icon.svg" alt="">
            </div>
        </div>
    </div>
    `;
}

function templateCharges(subtotal, deliveryFee, totalCharge) {
    return `
    <div class="charges">
        <span>Zwischensumme</span>
        <span id="subtotal">${subtotal} €</span>
    </div>
    <div class="charges">
        <span>Lieferkosten</span>
        <span id="delivery-fee">${deliveryFee} €</span>
    </div>
    <div class="charges total-charge">
        <span>Gesamt</span>
        <span id="total-charge">${totalCharge} €</span>
    </div>
    <div onclick="thanksForYourOrder()" class="order-btn pointer">
        Bezahlen (${totalCharge} €)
    </div>
    `;
}

function templateThanks() {
    return `
        <h2 class="thanks-header">Danke für deine Bestellung!</h2>
        <span class="thanks-text">In Kürze erhältst du eine Bestellbestätigung per E-Mail.</span>
        <div class="reset-basket-btn pointer" id="reset-basket" onclick="render()">Neue Bestellung</div> 
    `;
}

function templateResponsiveBasket() { 
    return`
    <div onclick="hideResponsiveBasket()" id="hide-responsive-basket" class="hide-responsive-basket-btn pointer"><img class="close-icon" src="./icons/close_icon.svg"></div>
    <div id="responsive-basket-header" class="responsive-basket-header"></div>
    <div id="responsive-basket-content" class="responsive-basket-content"></div>
    <div id="responsive-basket-charges" class="responsive-basket-charges"></div>
`;    
}

function templateShowBasketBtn(totalCharge) {
    return `
    <div class="responsive-basket-btn pointer" onclick="showBasket()">Warenkorb (${totalCharge} €)</div>
    `
}