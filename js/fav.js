let header_btn = document.querySelector(".header-nav-btn-active");

export function addProductToCart(user) {
  console.log(user);
  let cart = JSON.parse(localStorage.getItem("users"));
  if (!cart) {
    cart = {
      users: [],
    };
  }
  let newProduct = {
    item: user,
  };
  let isProductInCart = cart.users.some((item) => item?.item?.id == user?.id);
  console.log(isProductInCart);

  if (isProductInCart) {
    cart.users = cart.users.filter((item) => item?.item?.id != user?.id);
    alert("removed from fav");
  } else {
    cart.users.push(newProduct);
    alert("added to fav");
  }

  localStorage.setItem("users", JSON.stringify(cart));
}

export function getQuantity() {
  let cart = JSON.parse(localStorage.getItem("users"));
  if (!cart) {
    cart = {
      users: [],
    };
  }

  header_btn.innerHTML = "";

  let quantity = cart?.users?.length;

  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<a
    href="./templates/Cart/cart.html"
    class="header-nav-btn-link"
    >Favorities - ${quantity}</a
  >`;

  header_btn.appendChild(newDiv);
}
