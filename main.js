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
  //   order.addEventListener("change", function () {
  //     getTodos();
  //   });
  addToCart();
});
sort.value === "followers";

sort.addEventListener("change", function handleChange(event) {
  getTodos(event.target.value);
});

async function getTodos(sort) {
  let data = await fetch(
    `${API}?q=${inpSearch.value}&per_page=10&page=${currentPage}&sort=${sort}&order=asc`
  ).then((res) => res.json());

  let users = await fetch(`${API}?q=${inpSearch.value}`).then((res) =>
    res.json()
  );
  if (data?.items?.length === 0 && users?.items?.length === 0) {
    return "loading";
  }

  pagesCount = Math.ceil(users?.items?.length / 10);
  console.log(users);

  list.innerHTML = "";
  data?.items?.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.id = item.id;
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

async function addToCart() {
  document.addEventListener("click", async function (event) {
    function addProductToCart(course) {
      console.log(course);
      let cart = JSON.parse(localStorage.getItem("users"));
      if (!cart) {
        cart = {
          //корзина является объектом
          courses: [],
          totalPrice: 0,
        };
      }
      let newProduct = {
        item: course,
        count: 1,
        // subPrice: course.price,
      };
      //   cart.courses.push(newProduct);

      let isProductInCart = cart.courses.some(
        (item) => item?.item?.id == course?.id
      );

      console.log(isProductInCart);
      if (isProductInCart) {
        cart.courses = cart.courses.filter(
          (item) => item?.item?.id != course?.id
        );
      } else {
        cart.courses.push(newProduct); //здесь добавили продукт в корзину
      }
      localStorage.setItem("users", JSON.stringify(cart));
      //   function getCart() {
      //     let cart = JSON.parse(localStorage.getItem("users"));
      //     if (!cart) {
      //       cart = {
      //         //корзина является объектом
      //         courses: [],
      //         totalPrice: 0,
      //       };
      //     }
      //     cart.totalPrice = cart.courses.reduce((prev, curr) => {
      //       return prev + curr.subPrice;
      //     }, 0);
      //     console.log(cart);
      //   }
    }

    console.log(event.target.className);

    // cart start
    if (event.target.className === "cart-icon-box btn-addCart") {
      let id = event.target.parentElement.parentElement.parentElement.id;

      let data = await fetch(`${API}?q=${inpSearch.value}`).then((res) =>
        res.json()
      );
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
}

getTodos();

btnPrev.addEventListener("click", async function () {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  spanPages.value = currentPage;

  inp_perPage.value = currentPage;

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
  inp_perPage.value = currentPage;
  //   spanPages.innerText = currentPage;
  getTodos();
});
