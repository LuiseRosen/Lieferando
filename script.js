let dishes = [
  {
    "dish": ['Kesselkuchen', 'Kürbispastete', 'Felsenkekse', 'Schokofrosch'],
    "description": ['Im Kessel gebackener Schokokuchen', 'Blätterteiggebäck mit Kürbisfüllung', 'Rubeus Hagrids Originalrezept', 'Hüpft dir vorbildgetreu in den Mund'],
    "price": [5.50, 6.00, 4.50, 3.50],
    "img": ['./img/cauldron_cake_img.jpg', './img/pumpkin_pasty_img.jpg', './img/rock_candy_img.jpg', './img/chocolate_frog_img.jpeg'],
    "amount": [1, 1, 1, 1]
  },
  {
    "dish": ['Butterbier', 'Kürbissaft', 'Feuerwhisky', 'Felix Felicis'],
    "description": ['Heißes Butterbier', 'Eisgekühlter Kürbissaft', 'Ogdens Old Firewhisky', 'Flüssiges Glück'],
    "price": [5.50, 3.50, 4.50, 777.77],
    "img": ['./img/butterbeer_img.jpg', './img/pumpkinjuice_img.jpg', './img/firewhiskey_img.jpg', './img/felix_felicis_img.jpg'],
    "amount": [1, 1, 1, 1]
  }
];

let basket = [
  {
    "dishes": [],
    "prices": [],
    "amounts": [],
    "deliveryFee": [5]
  }
];


function render() {
  let content = document.getElementById('content');
  content.innerHTML = '';
  content.innerHTML += templateContent();
  renderDishes();
  renderBasket();
  renderCharges();
  hideResponsiveBasket();
}

function distinguishDishesDrinks(i) {
  let dishesContainer = document.getElementById('dishes');
  let drinksContainer = document.getElementById('drinks');
  if (i == 0) {
    return dishesContainer;
  } else if (i == 1) {
    return drinksContainer;
  }
}

function renderDishes() {
  for (let i = 0; i < dishes.length; i++) {
    for (let y = 0; y < dishes[i]['dish'].length; y++) {
      let dish = dishes[i]['dish'][y];
      let dishDescription = dishes[i]['description'][y];
      let dishImg = dishes[i]['img'][y];
      let dishPrice = formatPrice(dishes[i]['price'][y]);
      let container = distinguishDishesDrinks(i);
      container.innerHTML += templateDish(dish, dishDescription, dishPrice, dishImg, i, y);
    }
  }
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',');
}

function renderBasket() {
  let basketContentList = basket[0]['dishes'];
  resetContainer('basket-content');
  fillBasketHeader('basket-header');
  if (basketContentList == 0) {
    emptyBasket('basket-content');
  } else {
    for (let i = 0; i < basketContentList.length; i++) {
      fillBasket('basket-content', i);
    }
  }
}

function resetContainer(containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = '';
}

function fillBasketHeader(containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = templateBasketHeader();
}

function emptyBasket(containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML += templateEmptyBasket();
}

function fillBasket(containerId, i) {
  let container = document.getElementById(containerId);
  let dish = basket[0]['dishes'][i];
  let amount = basket[0]['amounts'][i];
  let price = formatPrice(basket[0]['prices'][i] * amount); // der Preis wird anhand der Menge im basket errechnet
  
  container.innerHTML += templateFillBasket(amount, dish, price, i);
}

function fillCharges(containerId) {
  let subtotal = formatPrice(calculateSubtotal());
  let deliveryFee = formatPrice(basket[0]['deliveryFee'][0]);
  let totalCharge = formatPrice(calculateSubtotal() + basket[0]['deliveryFee'][0]);
  let container = document.getElementById(containerId);
  container.innerHTML += templateCharges(subtotal, deliveryFee, totalCharge);
}

function getBasketIndexOf(dish) { // gibt den basket-Index des eingegebenen Gerichtes zurück. falls nicht vorhanden, wird -1 zurück gegeben
  return basket[0]['dishes'].indexOf(dish);
}

function addToBasket(i, y) {
  let dishIndex = getBasketIndexOf(dishes[i]['dish'][y]);
  if (dishIndex == -1) {
    addToBasketList('dish', 'dishes', i, y); // schickt aus array dishes/dish an  array basket/dishes
    addToBasketList('price', 'prices', i, y); // schickt aus array dishes/price an array basket/prices
    addToBasketList('amount', 'amounts', i, y); // schickt aus array dishes/amount an array basket/amounts
    renderBasket();
    renderCharges();
  } else {
    increaseAmount(dishIndex);
  }

}

function addToBasketList(listOfOrigin, listDestination, i, y) {
  let addedItem = dishes[i][listOfOrigin][y];
  let basketList = basket[0][listDestination];
  basketList.push(addedItem);
}

function increaseAmount(dishIndex) {
  let basketAmounts = basket[0]['amounts'];
  let newAmount = basketAmounts[dishIndex] + 1; // Erhöhen der Menge im basket um 1
  basketAmounts.splice(dishIndex, 1, newAmount) // an der Stelle dishIndex wird 1 Element durch newAmount ersetzt
  renderBasket();
  renderCharges();
  renderResponsiveBasket();
}

function removeFromBasket(dishIndex) {
  let basketAmounts = basket[0]['amounts'];
  let prices = basket[0]['prices'];
  let dishes = basket[0]['dishes'];

  if (basketAmounts[dishIndex] == 1) { // dish aus dem basket entfernen
    basketAmounts.splice(dishIndex, 1); // an der stelle dishIndex 1 Element entfernen (und nichts neues hinzufügen)
    prices.splice(dishIndex, 1);
    dishes.splice(dishIndex, 1);
  } else {
    let newAmount = basketAmounts[dishIndex] - 1; // Reduzieren der Menge im basket um 1
    basketAmounts.splice(dishIndex, 1, newAmount) // an der Stelle dishIndex wird 1 Element durch newAmount ersetzt
  }
  renderBasket();
  renderCharges();
  renderResponsiveBasket();
}

function calculateSubtotal() {
  let basketDishes = basket[0]['dishes'];
  let basketAmounts = basket[0]['amounts'];
  let basketPrices = basket[0]['prices'];
  let subtotal = 0;

  for (let i = 0; i < basketDishes.length; i++) {
    subtotal += basketAmounts[i] * basketPrices[i];
  }
  return subtotal;
}

function renderCharges() {
  let basketContent = basket[0]['dishes'];
  resetContainer('charge-order-container');
  if (basketContent == 0) { // do nothing
  } else {
    fillCharges('charge-order-container');
  }
  renderResponsiveBasketBtn();
}

function deliverCollectSwitch(option) {
  let deliver = document.getElementById('deliver-background');
  let collect = document.getElementById('collect-background');
  let deliveryFee = basket[0]['deliveryFee'];

  if (option == 'deliver') {
    deliveryFee.splice(0, 1, 5); // an der stelle 0 wird 1 element durch die zahl 5 ersetzt
    deliver.classList.add('deliver-collect-white-background');
    collect.classList.remove('deliver-collect-white-background');
  } else {
    deliveryFee.splice(0, 1, 0);
    deliver.classList.remove('deliver-collect-white-background');
    collect.classList.add('deliver-collect-white-background');
  }
  renderCharges();
  renderResponsiveCharges();
}

function thanksForYourOrder() {
  let basketContainer = document.getElementById('basket');
  let responsiveBasket = document.getElementById('responsive-basket');
  basketContainer.innerHTML = '';
  basketContainer.innerHTML += templateThanks();
  responsiveBasket.innerHTML = '';
  responsiveBasket.innerHTML += templateThanks();
  clearBasket();
}

function clearBasket() {
  let basketDishes = basket[0]['dishes'];
  let basketAmounts = basket[0]['amounts'];
  let basketPrices = basket[0]['prices'];

  basketDishes.length = 0;
  basketAmounts.length = 0;
  basketPrices.length = 0;
}

// responsive ----------------------------------------------------------------------------------------

function showBasket() {
  let responsiveBasket = document.getElementById('responsive-basket');

  responsiveBasket.classList.remove('display-none');
  responsiveBasket.innerHTML = '';
  responsiveBasket.innerHTML += templateResponsiveBasket();

  renderResponsiveBasket();
}

function hideResponsiveBasket() {
  document.getElementById('responsive-basket').classList.add('display-none');
}

function renderResponsiveBasket() {
  let basketContentList = basket[0]['dishes'];

  resetContainer('responsive-basket-content');
  if (basketContentList == 0) {
    emptyBasket('responsive-basket-content');
  } else {
    fillBasketHeader('responsive-basket-header');
    for (let i = 0; i < basketContentList.length; i++) {
      fillBasket('responsive-basket-content', i)
      renderResponsiveCharges();
    }
  }
}

function renderResponsiveBasketBtn() {
  let showBasketBtn = document.getElementById('responsive-basket-btn-container');
  let basketContent = basket[0]['dishes'];
  let totalCharge = formatPrice(calculateSubtotal() + basket[0]['deliveryFee'][0]);
  
  if (basketContent == 0) {
    showBasketBtn.classList.add('display-none');
  } else {
    showBasketBtn.classList.remove('display-none');
  }
  showBasketBtn.innerHTML = '';
  showBasketBtn.innerHTML += templateShowBasketBtn(totalCharge);
}

function renderResponsiveCharges() {
  let basketContent = basket[0]['dishes'];

  if (basketContent == 0) { // do nothing
  } else {
    resetContainer('responsive-basket-charges');
    fillCharges('responsive-basket-charges');
  }
}


