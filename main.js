const API = "https://api.github.com/search/users";

let inpSearch = document.getElementById("search-inp");
let list = document.querySelector(".hero-cards");
let list2 = document.querySelector(".hero-cards-2");
let section1 = document.querySelector(".section-1");
let section2 = document.querySelector(".section-2");
let section3 = document.querySelector(".section-3");
let section4 = document.querySelector(".section-4");

let reposList = document.querySelector(".hero-cards-repos");

// paginate
let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
let spanPages = document.getElementById("pages");
let inp_perPage = document.getElementById("per_page-input");

let sort = document.querySelector("#sort");
let order = document.querySelector("#order");
let currentPage = 1;
let pagesCount = 0;

inpSearch.addEventListener("change", function () {
  getTodos();

  addToCart();
  details();
});
inp_perPage.addEventListener("change", function () {
  getTodos();
  details();
});
sort.addEventListener("change", function () {
  getTodos();
  details();
});
order.addEventListener("change", function handleChange(event) {
  getTodos(event.target.value);
  addToCart(event.target.value);
  details(event.target.value);
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
              <a href="#" class="header-nav-btn-link">Show repositories</a>
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
    function addToDetails(user) {
      console.log(user);
      localStorage.setItem("details", JSON.stringify(cart));
    }

    // cart start
    let data = await fetch(
      `${API}?q=${inpSearch.value}&per_page=${inp_perPage}&page=${currentPage}&sort=${sort.value}&order=${order}`
    ).then((res) => res.json());

    if (event.target.className === "cart-icon-box btn-addCart") {
      let id = event.target.parentElement.parentElement.parentElement.id;

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

    // else if (event.target.className === "haeder-nav-btn") {
    //     let id = event.target.parentElement.parentElement.parentElement.id;

    //     data?.items?.forEach((elem) => {
    //       if (elem.id == id) {
    //         console.log(elem);
    //         addToDetails(elem);
    //       }
    //     });
    //   }
  });
  getTodos();
}

async function details() {
  let data = await fetch(
    `${API}?q=${inpSearch.value}&per_page=${inp_perPage.value}&page=${currentPage}&sort=${sort.value}&order=${order}`
  ).then((res) => res.json());

  document.addEventListener("click", async function (event) {
    if (event.target.className === "header-nav-btn-link") {
      let id =
        event.target.parentElement.parentElement.parentElement.parentElement.id;
      list2.innerHTML = "";
      data?.items?.forEach((item) => {
        if (item?.id == id) {
          console.log(item);
          section1.style.display = "none";
          section2.style.display = "none";
          section3.style.display = "none";
          section4.style.display = "block";

          let newDiv = document.createElement("div");

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
                <button class="haeder-nav-btn-back haeder-nav-btn">
                    back
                </button>   
              </div>
            </div>
          </div>`;
          async function reposFunc() {
            let repos = await fetch(`${item.repos_url}`).then((res) =>
              res.json()
            );
            reposList.innerHTML = "";
            console.log(repos);
            repos.forEach((item) => {
              let newDiv = document.createElement("div");

              newDiv.innerHTML = `<div class="hero-cards-repos-item">
              <p>${item.name}</p>
              <button><a href="${item.html_url}"  target="_blank" >Go to Github</a></button>
            </div>`;

              reposList.appendChild(newDiv);
            });
          }
          reposFunc();

          list2.appendChild(newDiv);
        }
      });
    }
  });
}

document.addEventListener("click", function (event) {
  if (event.target.className == "haeder-nav-btn-back haeder-nav-btn") {
    section1.style.display = "block";
    section2.style.display = "block";
    section3.style.display = "block";
    section4.style.display = "none";
  }
});

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
