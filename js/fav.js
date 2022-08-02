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
    document.querySelector(".noticification").style.right = "20px";
    document.querySelector(".notic_removed").style.display = "block";
    document.querySelector(".notic_added").style.display = "none";
    setTimeout(() => {
      document.querySelector(".noticification").style.right = "-20000px";
    }, 1000);
  } else {
    cart.users.push(newProduct);
    document.querySelector(".noticification").style.right = "20px";
    document.querySelector(".notic_added").style.display = "block";
    document.querySelector(".notic_removed").style.display = "none";
    setTimeout(() => {
      document.querySelector(".noticification").style.right = "-20000px";
    }, 500);
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
