//DOM

const jokeWrap = document.querySelector(".jokewrap");
const favBtn = document.querySelector(".favourite_btn");
const favCounter = document.querySelector(".favourite_btn span");
const favBtnHeart = document.querySelector(".favourite_btn .fa");
const favList = document.querySelector(".favourite_list");
const favListUL = document.querySelector(".favourite_list ul");
const header = document.querySelector(".header");
const year = document.querySelector(".year");
let favEle;
//Fetch Joke List
let jokeList = [];

//Favourite Joke List
let jokeFavourite = [];

class joke {
  constructor(limit) {
    this.limit = limit;
  }

  async jokeData() {
    let rawData = await fetch(
      `https://api.icndb.com/jokes/random/${this.limit}`
    );
    let data = await rawData.json();

    await data.value.map((i) => {
      jokeList = [...jokeList, { id: i.id, title: i.joke, isLiked: false }];
      jokeWrap.insertAdjacentHTML(
        "beforeend",
        `
<div class="jokeslist" data-id=${i.id}>
<li>${i.joke} <span data-id=${i.id}><i class="fa fa-heart" aria-hidden="true"></i></span></li> 
</div>
`
      );
    });
  }
}

//Event When Click On Love Button
jokeWrap.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa")) {
    let id = e.target.parentElement.dataset.id;

    //Check If Is In Fav List And Add Based On The Boolean Result
    if (jokeFavourite.findIndex((i) => i.id === Number(id)) === -1) {
      addToFavourite(id);
      heartAdd(e.target, id);
      updateFavCount();
    } else {
      heartRemove(e.target, id);
      updateFavCount();
      return jokeFavourite;
    }
  }
});

//Add To Favourite List
function addToFavourite(id) {
  let data = jokeList.find((i) => i.id === Number(id));
  jokeFavourite.push(data);
  favListUL.insertAdjacentHTML(
    "beforeend",
    `
<li data-id=${data.id}>${data.title}</li>
`
  );
  updatingUIList();
}

//Add Heart To Like Fav BTN
function heartAdd(ele, id) {
  ele.classList.add("like");
  let isLiked = jokeFavourite.find((i) => i.id === parseInt(id));
  isLiked.isLiked = true;
  updateFavCount();
  updatingUIList();
}

//Remove From Favourite
function heartRemove(ele, id) {
  let eleToRemove = jokeFavourite.find((i) => i.id === parseInt(id));
  let index = jokeFavourite.findIndex((i) => i.id === parseInt(id));

  let deleteUI = favEle.find((i) => i.dataset.id === id);

  deleteUI.remove();
  eleToRemove.isLiked = false;
  jokeFavourite.splice(index, 1);

  ele.classList.remove("like");
  updatingUIList();
}

//Open Favourite List
favBtn.addEventListener("click", () => {
  favList.classList.toggle("show");
});

//Update fav Count
function updateFavCount() {
  jokeFavourite.length > 0
    ? favBtnHeart.classList.add("like")
    : favBtnHeart.classList.remove("like");
  favCounter.textContent = jokeFavourite.length;
}

function updatingUIList() {
  //Get All Elements In Jokes Favourite List For Deleting
  favEle = Array.from(document.querySelectorAll(".favourite_list > ul li"));
}
//Styling Functionality
/* document.addEventListener("scroll",()=>{
    window.pageYOffset > 200 ? header.classList.add("fixed"):header.classList.remove("fixed")
}) */

//Initialization
function init() {
  let currentYear = new Date();
  year.textContent = `©${currentYear.getFullYear()}`;
  let run = new joke(30);
  run.jokeData();
}

document.addEventListener("DOMContentLoaded", init);

/* const rawData = await fetch(`http://api.icndb.com/jokes/random1http://api.icndb.com/jokes/random`);
       const data = await rawData.json();

       jokeList.push({id:data.value.id,joke:data.value.joke})
        text.insertAdjacentHTML("beforeend",`
       <li data-id=${data.value.id}>${data.value.joke}</li>
       `) 
       return jokeList
       
 */
