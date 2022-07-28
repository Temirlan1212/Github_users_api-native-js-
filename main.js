const API = "https://api.github.com/search/users";

let inpSearch = document.getElementById("search-inp");
let list = document.querySelector(".hero-cards");

// paginate
let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
let spanPages = document.getElementById("pages");
let inp_perPage = document.getElementById("per_page-input");

let sort = document.querySelector("#sort");
let order = document.querySelector("#order");
let currentPage = 1;
let pagesCount = 0;

inpSearch.addEventListener("input", function () {
  getTodos();

  addToCart();
});

inp_perPage.addEventListener("change", function () {
  getTodos();
});

// sort.addEventListener("change", function handleChange(event) {
//   getTodos(event.target.value);
//   console.log(event.target.value);
// });

sort.addEventListener("change", function () {
  getTodos();
});
order.addEventListener("change", function handleChange(event) {
  getTodos(event.target.value);
  addToCart(event.target.value);
});

async function getTodos(order) {
  let data = await fetch(
    `${API}?q=${inpSearch.value}&per_page=${inp_perPage.value}&page=${currentPage}&sort=${sort.value}&order=${order}`
  ).then((res) => res.json());

  //   let users = await fetch(`${API}?q=${inpSearch.value}`).then((res) =>
  //     res.json()
  //   );
  if (data?.items?.length === 0) {
    return "loading";
  }
  pagesCount = Math.ceil(30 / +inp_perPage.value);
  console.log(pagesCount);

  list.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("users"));

  data?.items?.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.id = item.id;
    cart?.users.forEach((elem) => {
      newDiv.innerHTML = `<div class="hero-card" id=${item.id}>
        <div class="hero-card-image-box">
          <img src="${item.avatar_url}" alt="" />
        </div>
        <div class="hero-card-content-box">
          <div class="hero-card-content-left-box">
            <p>${item.login}</p>
            <a href="">link to github</a>
          </div>
          <div class="hero-card-content-right-box">
            <div class="cart-icon-box btn-addCart">${
              elem.item.id == item.id ? "added" : "add"
            }</div>
            <button class="haeder-nav-btn">
              <a href="" class="header-nav-btn-link">Show repositories</a>
            </button>   
          </div>
        </div>
      </div>`;
    });

    //
    list.appendChild(newDiv);
  });
}

async function addToCart(order) {
  document.addEventListener("click", async function (event) {
    function addProductToCart(user) {
      console.log(user);
      let cart = JSON.parse(localStorage.getItem("users"));
      if (!cart) {
        cart = {
          //корзина является объектом
          users: [],
          totalPrice: 0,
        };
      }
      let newProduct = {
        item: user,
        count: 1,
        // subPrice: user.price,
      };
      //   cart.users.push(newProduct);

      let isProductInCart = cart.users.some(
        (item) => item?.item?.id == user?.id
      );

      console.log(isProductInCart);
      if (isProductInCart) {
        cart.users = cart.users.filter((item) => item?.item?.id != user?.id);
      } else {
        cart.users.push(newProduct); //здесь добавили продукт в корзину
      }
      localStorage.setItem("users", JSON.stringify(cart));
    }

    // cart start
    if (event.target.className === "cart-icon-box btn-addCart") {
      let id = event.target.parentElement.parentElement.parentElement.id;

      let data = await fetch(
        `${API}?q=${inpSearch.value}&per_page=${inp_perPage}&page=${currentPage}&sort=${sort.value}&order=${order}`
      ).then((res) => res.json());

      console.log(id);
      console.log(data);
      data?.items?.forEach((elem) => {
        if (elem.id == id) {
          console.log(elem);
          addProductToCart(elem);
        }
      });
    }
    // cart end
  });
  getTodos();
}

btnPrev.addEventListener("click", async function () {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  spanPages.value = currentPage;

  //   inp_perPage.value = currentPage;

  //   spanPages.innerText = currentPage;
  getTodos();
});
btnNext.addEventListener("click", async function () {
  console.log(pagesCount);
  if (currentPage === pagesCount) {
    return;
  }

  currentPage++;
  spanPages.value = currentPage;
  //   inp_perPage.value = currentPage;
  //   spanPages.innerText = currentPage;
  getTodos();
});
getTodos();
