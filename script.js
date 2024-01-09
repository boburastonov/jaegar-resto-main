const paymentButtons = document.querySelector(".payment-buttons");
const paymentButton = document.querySelector(".payment-btn");
const overlay = document.querySelector(".overlay");
const order = document.querySelector(".order");
const payment = document.querySelector(".payment");
const foodList = document.querySelector(".food__list");
const date = document.querySelector(".date");
const form = document.querySelector(".form");
const input = document.querySelector(".search-input");
const productInfoList = document.querySelector(".product-info__list");
const siteHeaderList = document.querySelector(".site-header-list"); //ul
const siteHeaderItem = document.querySelector(".site-header-item"); //li
const orderButtons = document.querySelector(".order-header__buttons");
const cardList = document.querySelector(".card-list");
let productCount = document.querySelector(".product-count");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const comDate = new Date();
const datee = comDate.getDate();
const dayName = days[comDate.getUTCDay()];
const monthName = months[comDate.getMonth()];
const year = comDate.getFullYear();

date.innerHTML = `${dayName}, ${datee} ${monthName} ${year}`;

const foods = [
  {
    id: 1,
    foodName: "Spicy seasoned seafood noodles",
    foodPrice: 2.29,
    bowlCount: 20,
    imgSrc: "./img/image 4.png",
    category: "Hot Dishes",
  },
  {
    id: 2,
    foodName: "Salted Pasta with mushroom sauce",
    foodPrice: 2.69,
    bowlCount: 11,
    imgSrc: "./img/image 4-1.png",
    category: "Hot Dishes",
  },
  {
    id: 3,
    foodName: "Beef dumpling in hot and sour soup",
    foodPrice: 2.99,
    bowlCount: 16,
    imgSrc: "./img/image 4-2.png",
    category: "Cold Dishes",
  },
  {
    id: 4,
    foodName: "Healthy noodle with spinach leaf",
    foodPrice: 3.29,
    bowlCount: 22,
    imgSrc: "./img/image 4-3.png",
    category: "Hot Dishes",
  },
  {
    id: 5,
    foodName: "Hot spicy fried rice with omelet",
    foodPrice: 3.49,
    bowlCount: 13,
    imgSrc: "./img/image 4-4.png",
    category: "Hot Dishes",
  },
  {
    id: 6,
    foodName: "Spicy instant noodle with special omelette",
    foodPrice: 3.59,
    bowlCount: 17,
    imgSrc: "./img/image 4-5.png",
    category: "Soup",
  },
];

let newArr = [];
let newList = [];
let foodInfo = [];
let list;
var defolt = 0;

foodInfo = foods.map((food) => {
  for (let child of siteHeaderList.children) {
    if (
      child.classList.contains("active-item") &&
      child.textContent === food.category
    ) {
      return `<li class="food__item" onclick = 'getItemFromList(${food.id})'>
                          <img class="food__img" src="${food.imgSrc}" alt="Spicy seasoned seafood noodles">
                          <div class="about__food">
                              <p class="food__name">${food.foodName}</p>
                              <span class="food-price">$${food.foodPrice}</span>
                              <p class="availabled-bowls">${food.bowlCount} Bowls available</p>
                          </div>
                      </li>`;
    }
  }
});
foodList.innerHTML = foodInfo.join("");

function handleFilterBtnClick(e) {
  console.log(e);
  for (let child of siteHeaderList.children) {
    child.classList.remove("active-item");
  }

  e.target.classList.add("active-item");
  foodInfo = foods.map((food) => {
    for (let child of siteHeaderList.children) {
      if (
        child.classList.contains("active-item") &&
        child.textContent === food.category
      ) {
        return `<li class="food__item" onclick = 'getItemFromList(${food.id})'>
                          <img class="food__img" src="${food.imgSrc}" alt="Spicy seasoned seafood noodles">
                          <div class="about__food">
                              <p class="food__name">${food.foodName}</p>
                              <span class="food-price">$${food.foodPrice}</span>
                              <p class="availabled-bowls">${food.bowlCount} Bowls available</p>
                          </div>
                      </li>`;
      }
    }
  });
  foodList.innerHTML = foodInfo.join("");
}

for (let child of siteHeaderList.children) {
  child.addEventListener("click", handleFilterBtnClick);
}

// function getItemFromList(e) {
//   productInfoList.style.display = "";
//   let foo = foods.map((food) => {
//     if (food.id == e)
//       return ` <li class="product-info__item">
//                         <div class="product-info">
//                             <div class="product-info__header">
//                                 <img class="product-info__img" src="${food.imgSrc}" alt="Spicy seasoned seafood noodles">
//                                 <div class="product-info__text">
//                                     <p class="product-name">${food.foodName}</p>
//                                     <span class="product-price">$${food.foodPrice}</span>
//                                 </div>
//                                 <div class="product-count">2</div>
//                                 <p class="total-price">$4.58</p>
//                             </div>
//                             <div class="product-info__footer">
//                                 <form class="product-info__form">
//                                     <input type="text" class="form-info__input" placeholder="Order Note...">
//                                 </form>
//                                 <div class="remove-product-wrapper">
//                                     <img class="remove-product-image" src="./img/delete.svg" alt="remove product">
//                                 </div>
//                             </div>
//                         </div>
//                     </li>`;
//     for (let i = 1; i <= food.bowlCount; i++) {
//       productCount.innerHTML = i;
//       i++;
//     }
//   });
//   productInfoList.innerHTML = foo.join("");
// }

let cartItems = []; // Хранит элементы в корзине

function getItemFromList(e) {
  const selectedFood = foods.find((food) => food.id == e);

  if (selectedFood) {
    cartItems.push(selectedFood);
    updateCart();
    removeDuplicates();
  }
}

function removeDuplicates() {
  cartItems.filter((item, index) => {
    // if (cartItems.indexOf(item) === index) console.log("hello");
    return cartItems.indexOf(item) === index;
  });
}
function updateCart() {
  console.log(removeDuplicates());
  const cartHTML = cartItems.map((item) => {
    return ` <li class="product-info__item">
                            <div class="product-info">
                                <div class="product-info__header">
                                    <img class="product-info__img" src="${item.imgSrc}" alt="Spicy seasoned seafood noodles">
                                    <div class="product-info__text">
                                        <p class="product-name">${item.foodName}</p>
                                        <span class="product-price">$${item.foodPrice}</span>
                                    </div>
                                    <div class="product-count">2</div>
                                    <p class="total-price">$4.58</p>
                                </div>
                                <div class="product-info__footer">
                                    <form class="product-info__form">
                                        <input type="text" class="form-info__input" placeholder="Order Note...">
                                    </form>
                                    <div class="remove-product-wrapper">
                                        <img class="remove-product-image" src="./img/delete.svg" alt="remove product">
                                    </div>
                                </div>
                            </div>
                        </li>`;
  });

  productInfoList.innerHTML = cartHTML.join("");
}

form.addEventListener("change", (e) => {
  newList = newArr.filter((food) => {
    food.foodName === input.value;
  });

  foodList.innerHTML = newList.join("");
});

paymentButton.addEventListener("click", () => {
  order.style.display = "none";
  payment.style.display = "block";
  overlay.style.display = "block";
  document.querySelector(".right-section").style.paddingBottom = "2px";
  const removeBtn = document.createElement("button");
  paymentButtons.appendChild(removeBtn);
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Cancel";
  const confirmBtn = document.createElement("button");
  paymentButtons.appendChild(confirmBtn);
  confirmBtn.className = "btn";
  confirmBtn.textContent = "Confirm Payment";
  confirmBtn.addEventListener("click", () => {
    productInfoList.style.display = "none";
    order.style.display = "block";
    payment.style.display = "none";
    overlay.style.display = "none";
    confirmBtn.style.display = "none";
    removeBtn.style.display = "none";
    paymentButton.style.display = "";
    document.querySelector(".right-section").style.paddingBottom = "24px";
  });
  confirmBtn.style.width = "45.5%";
  paymentButton.style.display = "none";
  removeBtn.addEventListener("click", () => {
    order.style.display = "block";
    payment.style.display = "none";
    overlay.style.display = "none";
    removeBtn.style.display = "none";
    document.querySelector(".right-section").style.paddingBottom = "24px";
    paymentButton.style.display = "";
    confirmBtn.style.display = "none";
  });
});

function oBtn(e) {
  for (let child of orderButtons.children) {
    child.classList.remove("active-btn");
  }
  e.target.classList.add("active-btn");
}

for (let child of orderButtons.children) {
  child.addEventListener("click", oBtn);
}

function pBtn(e) {
  for (let child of cardList.children) {
    child.classList.remove("active-card");
  }
  e.target.classList.add("active-card");
  console.log(e.target.className);
  console.log(e.target);
}

for (let child of cardList.children) {
  child.addEventListener("click", pBtn);
}

// filter = input.value.toUpperCase();
// for (let i = 0; i < siteHeaderItem.length; i++) {
//   txtValue = siteHeaderItem.textContent || siteHeaderItem.innerText;
//   if (txtValue.toUpperCase().indexOf(filter) > -1) {
//     siteHeaderItem[i].style.display = "";
//   } else {
//     siteHeaderItem[i].style.display = "none";
//   }
// }
