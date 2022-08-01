let list = document.querySelector(".hero-cards");
let spinner = document.querySelector(".spinner");
let not_found_page = document.querySelector(".section-5");
let not_found_page_back = document.querySelector(".bl_page404__link");
let no_user = document.querySelector(".no_user");

export function burgerMenu() {
  let burger = document.querySelector(".burger-menu");
  let burgerList = document.querySelector(".burger-list");
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
}
