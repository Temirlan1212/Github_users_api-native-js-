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

  console.log(cart.users);

  list.innerHTML = "";
  cart.users.forEach((item) => {
    let newDiv = document.createElement("div");
    // newDiv.id = item.id;
    newDiv.innerHTML = `<img src="${item.item.url}" width="185px"><p id="contact-name">${item.item.name}</p><span>${item.item.number}</span><br><a>${item.item.price}</a><br><span>Start: ${item.item.date}</span><button class="btn-delete">Удалить</button><button class="btn-edit">Изменить</button> <button class="btn-addCart" id=${item.item.name}>корзинка</button>`;
    list.appendChild(newDiv);
  });
}
