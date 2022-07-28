const list = document.querySelector("#list-cart");

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
    console.log(item.item);
    let newDiv = document.createElement("div");
    // newDiv.id = item.id;
    newDiv.innerHTML = `<div class="hero-card" id=${item.item.id}>
    <div class="hero-card-image-box">
      <img src="${item.item.avatar_url}" alt="" />
    </div>
    <div class="hero-card-content-box">
      <div class="hero-card-content-left-box">
        <p>${item.item.login}</p>
        <a href="">link to github</a>
      </div>
      <div class="hero-card-content-right-box">
        <div class="cart-icon-box btn-addCart">star</div>
        <button class="haeder-nav-btn">
          <a href="" class="header-nav-btn-link">Show repositories</a>
        </button>   
      </div>
    </div>
  </div>`;

    list.appendChild(newDiv);
  });
}

getCart();
