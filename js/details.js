let followers = document.querySelector(".hero-cards-repos-followers");
let repos = document.querySelector(".hero-cards-repos");
let reposList = document.querySelector(".hero-cards-repos");
let followersList = document.querySelector(".hero-cards-repos-followers");
let spinner = document.querySelector(".spinner");

export async function reposFunc(url) {
  repos.style.display = "block";
  followers.style.display = "none";
  spinner.style.display = "flex";
  await fetch(`${url}`).then((res) =>
    res.json().then((repos) => {
      if (repos.length == 0) {
        document.querySelector(".no_repos").style.display = "flex";
        document.querySelector(".hero-secondBlock").style.paddingTop = "0px";

        spinner.style.display = "none";
      }

      console.log(repos);
      reposList.innerHTML = "";

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
export async function followersFunc(url) {
  repos.style.display = "none";
  followers.style.display = "block";
  spinner.style.display = "flex";
  let data = await fetch(`${url}`).then((res) => res.json());
  spinner.style.display = "none";
  console.log(data);

  followersList.innerHTML = "";

  data.forEach((item) => {
    let newDiv = document.createElement("div");

    newDiv.innerHTML = `<div class="hero-card-2" id=${item.id}>
      <div class="hero-card-image-box">
        <img src="${item.avatar_url}" alt="" />
      </div>
      <div class="hero-card-content-box">
        <div class="hero-card-content-left-box">
          <p>${item.login}</p>
          <a href="${item.url}" target="_blank">link to github</a>
        </div>
      
      </div>
    </div>`;

    followersList.appendChild(newDiv);
  });
}
