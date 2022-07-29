const list = document.querySelector("#list-cart");

let burger = document.querySelector(".burger-menu");
let burgerList = document.querySelector(".burger-list");

let bool = false;

burger.addEventListener("click", function () {
  if (bool) {
    burgerList.style.top = "-8000px";
    bool = false;
  } else {
    bool = true;
    burgerList.style.top = "40px";
  }
});

function getCart() {
  let cart = JSON.parse(localStorage.getItem("users"));
  if (!cart) {
    cart = {
      //корзина является объектом
      users: [],
      totalPrice: 0,
    };
  }
  // cart.totalPrice = cart.users.reduce((prev, curr) => {
  //   return prev + curr.subPrice;
  // }, 0);

  list.innerHTML = "";

  cart.users.forEach((item) => {
    let newDiv = document.createElement("div");
    // newDiv.id = item.id;
    newDiv.innerHTML = `<div class="hero-card" id=${item.item.id}>
    <div class="hero-card-image-box">
      <img src="${item.item.avatar_url}" alt="" />
    </div>
    <div class="hero-card-content-box">
      <div class="hero-card-content-left-box">
        <img src="${item.item.avatar_url}" alt="" />
        <p>${item.item.login}</p>
        <a href="">link to github</a>
      </div>
      <div class="hero-card-content-right-box" >
        <div class="cart-icon-box btn-addCart">
        <img src="https://img.icons8.com/material-rounded/24/3d3e40/filled-trash.png" style="cursor: pointer;" id="${item.item.id}" onclick="deleteFromCart(this.id)"/>
        </div>
        <button class="haeder-nav-btn">
          <a href="" class="header-nav-btn-link">Show repositories</a>
        </button>   
        <a href="" class="header-nav-btn-link-adaptive"><img src="https://img.icons8.com/ios/30/000000/repository.png"/></a>

      </div>
    </div>
  </div>`;

    list.appendChild(newDiv);
  });
}

function deleteFromCart(id) {
  console.log(id);
  let cart = JSON.parse(localStorage.getItem("users"));
  console.log(cart);
  cart.users = cart.users.filter((item) => item.item.id != id);
  localStorage.setItem("users", JSON.stringify(cart));
  getCart();
}

getCart();
