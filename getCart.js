const list = document.querySelector("#list-cart");

function getCart() {
  let cart = JSON.parse(localStorage.getItem("users"));
  if (!cart) {
    cart = {
      //корзина является объектом
      courses: [],
      totalPrice: 0,
    };
  }
  // cart.totalPrice = cart.courses.reduce((prev, curr) => {
  //   return prev + curr.subPrice;
  // }, 0);

  console.log(cart.courses);

  list.innerHTML = "";
  cart.courses.forEach((item) => {
    let newDiv = document.createElement("div");
    // newDiv.id = item.id;
    newDiv.innerHTML = `<img src="${item.item.url}" width="185px"><p id="contact-name">${item.item.name}</p><span>${item.item.number}</span><br><a>${item.item.price}</a><br><span>Start: ${item.item.date}</span><button class="btn-delete">Удалить</button><button class="btn-edit">Изменить</button> <button class="btn-addCart" id=${item.item.name}>корзинка</button>`;
    list.appendChild(newDiv);
  });
}
