const API = "https://api.github.com/search/users";

let inpSearch = document.getElementById("search-inp");
let list = document.querySelector(".hero-cards");
let list2 = document.querySelector(".hero-cards-2");
let section1 = document.querySelector(".section-1");
let section2 = document.querySelector(".section-2");
let section3 = document.querySelector(".section-3");
let section4 = document.querySelector(".section-4");
let spinner = document.querySelector(".spinner");
let not_found_page = document.querySelector(".section-5");
let not_found_page_back = document.querySelector(".bl_page404__link");
let no_user = document.querySelector(".no_user");

let default_state = document.querySelector(".default_state");

let reposList = document.querySelector(".hero-cards-repos");

// paginate
let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
let spanPages = document.getElementById("pages");
let inp_perPage = document.getElementById("per_page-input");

let sort = document.querySelector("#sort");
let order = document.querySelector("#order");
let pagesCount = 0;

let bool = false;

[inpSearch, inp_perPage, sort, order, spanPages].forEach((element) => {
  element.addEventListener("change", function () {
    fetchData();
  });
});

const fetchData = async () => {
  console.log(spanPages.value);
  spinner.style.display = "flex";
  let data = await fetch(
    `${API}?q=${inpSearch.value}&per_page=${inp_perPage.value}&page=${spanPages.value}&sort=${sort.value}&order=${order.value}`
  ).then((res) => res.json());

  spinner.style.display = "none";
  section3.style.display = "block";
  default_state.style.display = "none";

  getTodos(data);
  addToCart(data);
  details(data);
};

async function getTodos(data) {
  if (data?.message === "Not Found") {
    not_found_page.style.display = "block";
    not_found_page_back.addEventListener("click", function () {
      window.location.reload();
    });
  } else if (data?.items?.length === 0) {
    return (no_user.style.display = "flex"), (list.style.display = "none");
  }

  no_user.style.display = "none";
  list.style.display = "block";
  spinner.style.display = "none";

  list.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("users"));

  data?.items?.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.id = item.id;

    newDiv.innerHTML = `<div class="hero-card" id=${item.id}>
          <div class="hero-card-image-box">
            <img src="${item.avatar_url}" alt="" />
          </div>
          <div class="hero-card-content-box">
            <li class="hero-card-content-left-box">
              <p>${item.login}</p>
              <a href="${
                item.html_url
              }"  class="link-to-github">link to github</a>
             
            </li>
  
            <div class="hero-card-content-right-box">
              <div class="cart-icon-box btn-addCart">
              ${
                cart.users.find((elem) => elem.item.id == item.id)
                  ? `<svg  width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="cart-icon-box btn-addCart" onclick="addToCart()" d="M17.9524 6.46201C17.8959 6.29542 17.7917 6.14903 17.6529 6.04092C17.5141 5.93282 17.3466 5.86773 17.1712 5.85369L12.0403 5.44605L9.81998 0.5318C9.74927 0.373522 9.63426 0.239089 9.48882 0.144723C9.34338 0.0503584 9.17374 9.52785e-05 9.00037 1.35323e-07C8.82699 -9.50078e-05 8.6573 0.0499819 8.51176 0.144187C8.36622 0.238393 8.25106 0.3727 8.18017 0.530901L5.95986 5.44605L0.828929 5.85369C0.656537 5.86735 0.491731 5.93037 0.354225 6.03523C0.21672 6.14008 0.112338 6.28233 0.0535678 6.44494C-0.00520237 6.60756 -0.0158724 6.78366 0.0228342 6.95218C0.0615409 7.1207 0.147985 7.27451 0.271825 7.39519L4.06355 11.091L2.72254 16.897C2.68182 17.0728 2.69487 17.2567 2.76 17.4249C2.82512 17.5932 2.93932 17.738 3.08776 17.8405C3.23621 17.943 3.41205 17.9986 3.59247 18C3.77289 18.0013 3.94956 17.9485 4.09955 17.8482L9.00008 14.5816L13.9006 17.8482C14.0539 17.95 14.2347 18.0024 14.4187 17.9983C14.6026 17.9943 14.781 17.934 14.9297 17.8256C15.0784 17.7172 15.1903 17.5659 15.2504 17.392C15.3105 17.2181 15.3159 17.03 15.2659 16.8529L13.6198 11.0937L17.7022 7.42039C17.9695 7.17922 18.0676 6.80307 17.9524 6.46201Z" fill="#3D3E40"/></svg>`
                  : `<svg  width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="cart-icon-box btn-addCart" d="M17.9524 6.46201C17.8959 6.29542 17.7917 6.14903 17.6529 6.04092C17.5141 5.93282 17.3466 5.86773 17.1712 5.85369L12.0403 5.44605L9.81998 0.5318C9.74927 0.373522 9.63426 0.239089 9.48882 0.144723C9.34338 0.0503584 9.17374 9.52785e-05 9.00037 1.35323e-07C8.82699 -9.50078e-05 8.6573 0.0499819 8.51176 0.144187C8.36622 0.238393 8.25106 0.3727 8.18017 0.530901L5.95986 5.44605L0.828929 5.85369C0.656537 5.86735 0.491731 5.93037 0.354225 6.03523C0.21672 6.14008 0.112338 6.28233 0.0535678 6.44494C-0.00520237 6.60756 -0.0158724 6.78366 0.0228342 6.95218C0.0615409 7.1207 0.147985 7.27451 0.271825 7.39519L4.06355 11.091L2.72254 16.897C2.68182 17.0728 2.69487 17.2567 2.76 17.4249C2.82512 17.5932 2.93932 17.738 3.08776 17.8405C3.23621 17.943 3.41205 17.9986 3.59247 18C3.77289 18.0013 3.94956 17.9485 4.09955 17.8482L9.00008 14.5816L13.9006 17.8482C14.0539 17.95 14.2347 18.0024 14.4187 17.9983C14.6026 17.9943 14.781 17.934 14.9297 17.8256C15.0784 17.7172 15.1903 17.5659 15.2504 17.392C15.3105 17.2181 15.3159 17.03 15.2659 16.8529L13.6198 11.0937L17.7022 7.42039C17.9695 7.17922 18.0676 6.80307 17.9524 6.46201Z" fill="#ffffff"/></svg>`
              }
              </div>
              
              <button class="haeder-nav-btn">
                <a href="#" class="header-nav-btn-link">Show repositories</a>
              </button>   
              <img class="haeder-nav-img" src="https://img.icons8.com/material-outlined/24/000000/link--v1.png"/>
  
            </div>
          </div>
        </div>`;

    list.appendChild(newDiv);
  });
}

async function addToCart(data) {
  document.addEventListener("click", async function (event) {
    function addProductToCart(user) {
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
      let isProductInCart = cart.users.some(
        (item) => item?.item?.id == user?.id
      );

      if (isProductInCart) {
        cart.users = cart.users.filter((item) => item?.item?.id != user?.id);
        getQuantity();
      } else {
        cart.users.push(newProduct);
        getQuantity();
      }

      localStorage.setItem("users", JSON.stringify(cart));
    }

    if (event.target.className.animVal === "cart-icon-box btn-addCart") {
      let id =
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id;

      console.log(id);
      data?.items?.forEach((elem) => {
        if (elem.id == id) {
          console.log(elem);

          Promise.all([addProductToCart(elem)]).then((values) => {
            getQuantity();
            getTodos(data);
          });
        }
      });
    }
  });
}

async function details(data) {
  document.addEventListener("click", async function (event) {
    console.log(event.target.className);
    if (
      event.target.className === "header-nav-btn-link" ||
      event.target.className === "haeder-nav-img"
    ) {
      let id =
        event.target.parentElement.parentElement.parentElement.parentElement.id;
      list2.innerHTML = "";
      data?.items?.forEach((item) => {
        if (item?.id == id) {
          console.log(item);

          [section1, section2, section3].forEach((elem) => {
            elem.style.display = "none";
          });
          section4.style.display = "block";

          let newDiv = document.createElement("div");
          newDiv.innerHTML = `<div class="hero-card" id=${item.id}>
            <div class="hero-card-image-box">
              <img src="${item.avatar_url}" alt="" />
            </div>
            <div class="hero-card-content-box">
              <div class="hero-card-content-left-box">
                <p>${item.login}</p>
                <a href="${item.html_url}" target="_blank">link to github</a>
              </div>
              <div class="hero-card-content-right-box">
               
              </div>
            </div>
          </div>`;

          reposFunc(item.repos_url);

          list2.appendChild(newDiv);
        }
      });
    }
  });
}

async function reposFunc(url) {
  spinner.style.display = "flex";
  await fetch(`${url}`).then((res) =>
    res.json().then((repos) => {
      if (repos.length == 0) {
        document.querySelector(".no_repos").style.display = "flex";
        document.querySelector(".hero-secondBlock").style.paddingTop = "0px";

        spinner.style.display = "none";
      }

      reposList.innerHTML = "";
      console.log(repos);

      repos.forEach((item) => {
        let newDiv = document.createElement("div");

        newDiv.innerHTML = `<div class="hero-cards-repos-item">
          <p>${item.name}</p>
          <button><a href="${item.html_url}"  target="_blank" >Go to Github</a></button>
        </div>`;

        reposList.appendChild(newDiv);
        spinner.style.display = "none";
      });
    })
  );
}

document.addEventListener("click", function (event) {
  if (event.target.className == "haeder-nav-btn-back haeder-nav-btn-1") {
    section1.style.display = "block";
    section2.style.display = "block";
    section3.style.display = "block";
    section4.style.display = "none";
  }
});

btnPrev.addEventListener("click", function () {
  spanPages.value > 1 ? +spanPages.value-- : "";

  fetchData();
});
btnNext.addEventListener("click", async function () {
  +spanPages.value++;

  fetchData();
});

//! burger menu start
let burger = document.querySelector(".burger-menu");
let burgerList = document.querySelector(".burger-list");

burger.addEventListener("click", function () {
  if (bool) {
    burgerList.style.top = "-8000px";
    bool = false;
  } else {
    bool = true;
    burgerList.style.top = "40px";
  }
});
//! burger menu ends

let header_btn = document.querySelector(".header-nav-btn-active");

function getQuantity() {
  let cart = JSON.parse(localStorage.getItem("users"));
  if (!cart) {
    cart = {
      users: [],
    };
  }
  console.log(cart);

  header_btn.innerHTML = "";

  let quantity = cart?.users?.length;
  console.log(quantity);

  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<a
    href="./templates/Cart/cart.html"
    class="header-nav-btn-link"
    >Favorities - ${quantity}</a
  >`;

  header_btn.appendChild(newDiv);
}

getQuantity();
