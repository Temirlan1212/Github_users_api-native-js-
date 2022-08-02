const list = document.querySelector("#list-cart");

let burger = document.querySelector(".burger-menu");
let burgerList = document.querySelector(".burger-list");
let section2 = document.querySelector(".section-2");
let section3 = document.querySelector(".section-3");
let reposList = document.querySelector(".hero-cards-repos");
let spinner = document.querySelector(".spinner");
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
      users: [],
    };
  }

  list.innerHTML = "";

  Promise.all([
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
          <a href="${item.item.html_url}" target="_blank">link to github</a>
        </div>
        <div class="hero-card-content-right-box" >
          <div class="cart-icon-box btn-addCart">
          <img src="https://img.icons8.com/material-rounded/24/ffffff/filled-trash.png" style="cursor: pointer;" class="cart-delete-icon" id="${item.item.id}" />
          </div>
          <button class="haeder-nav-btn">
            <a href="#" class="header-nav-btn-link" id="${item.item.repos_url}">Show repositories</a>
          </button>   
          <a href="#" class="header-nav-btn-link-adaptive"><img src="https://img.icons8.com/ios/30/000000/repository.png" class="responsive-repos-icon" id="${item.item.repos_url}" /></a>
  
        </div>
      </div>
    </div>`;

      list.appendChild(newDiv);
    }),
  ]).then(() => {
    let btn = document.querySelectorAll(".cart-delete-icon");
    btn.forEach((elem) => {
      elem.addEventListener("click", function (e) {
        console.log(e.target.id);
        deleteFromCart(e.target.id);
      });
    });

    let btn2 = document.querySelectorAll(".header-nav-btn-link");
    btn2.forEach((elem) => {
      console.log(elem);
      elem.addEventListener("click", function (e) {
        console.log(e.target.id);
        renderRepo(e.target.id);
      });
    });

    let btn3 = document.querySelectorAll(".responsive-repos-icon");
    btn3.forEach((elem) => {
      console.log(elem);
      elem.addEventListener("click", function (e) {
        console.log(e.target.id);
        renderRepo(e.target.id);
      });
    });
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

async function renderRepo(url) {
  section2.style.display = "none";
  section3.style.display = "block";
  spinner.style.display = "flex";

  let repos = await fetch(`${url}`).then((res) => res.json());

  spinner.style.display = "none";

  repos.forEach((item) => {
    let newDiv = document.createElement("div");

    newDiv.innerHTML = `<div class="hero-cards-repos-item">
      <p>${item.name}</p>
      <button><a href="${item.html_url}"  target="_blank" >Go to Github</a></button>
    </div>`;

    reposList.appendChild(newDiv);
    // spinner.style.display = "none";
  });
}

getCart();

document.addEventListener("click", function (event) {
  if (event.target.className == "haeder-nav-btn-back haeder-nav-btn-1") {
    section2.style.display = "block";
    section3.style.display = "none";
  }
});
