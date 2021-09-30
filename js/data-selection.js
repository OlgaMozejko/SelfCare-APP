//----------- Olga ---------------

//fetch data from wordpress headless cms
//using it for mood-category selecting

class MoodSelector {
  constructor() {
    this.posts = [];
    this.categories = [];
    this.tags = [];
    this.filtered = [];
    this.favposts = [];
  }
  init() {
    this.getPosts();
    this.getCategories();
    this.getTags();
  }

  async getPosts() {
    let data = await fetch(
      "http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed"
    ).then((res) => res.json());
    this.posts = data;
    this.appendPosts(this.posts);
  }

  async getCategories() {
    let data = await fetch(
      "http://appcontent.omozejko.com/wp-json/wp/v2/categories"
    ).then((res) => res.json());
    this.categories = data;
    this.appendCategories();
  }

  async getTags() {
    let data = await fetch(
      "http://appcontent.omozejko.com/wp-json/wp/v2/tags"
    ).then((res) => res.json());
    this.tags = data;
    this.appendTags();
  }

  async getPostsByCategory(categoryId) {
    let url = `http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}`;
    let data = await fetch(url).then((res) => res.json());
    this.appendPostsByCategory(data);
  }

  async getPostsByTags(tagId) {
    let data = await fetch(
      `http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&tags=${tagId}`
    ).then((res) => res.json());
    this.appendPostsByTags(data);
  }

  async getPostsByCatAndTag(catId, tagId) {
    let data = await fetch(
      `http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${catId}&tags=${tagId}`
    ).then((res) => res.json());
    this.filtered = data;
    this.appendPostsByCatAndTag(data);
  }

  appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
         <article >
      <h2 onclick="showDetailView('${post.id}')">${post.title.rendered}</h2>
      <p onclick="showDetailView('${post.id}')">${post.acf.description}</p>
      <div>
      <p>${post.acf.environment}</p>
      ${this.generateFavPostsButton(post.id)}
      </div>
      </article>
    `;
    }
    //document.querySelector("#section-favorites").innerHTML = htmlTemplate;
  }

  appendCategories() {
    let html = "";
    for (let category of this.categories) {
      html += `
      <button id="${category.id}" value="${category.id}" class="filterByEmotions" onclick="filterbyEmotions(this.value)">${category.name}</button>
      `;
    }
    document.querySelector(".filter-container").innerHTML += html;
  }

  appendTags() {
    let htmlTemplate = "";
    for (let tag of this.tags) {
      htmlTemplate += `
        <option value="${tag.id}">${tag.name}</option>
      `;
    }
    document.querySelector("#time-select").innerHTML += htmlTemplate;
  }

  appendPostsByTags() {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
      <article >
      <h2 onclick="showDetailView('${post.id}')">${post.title.rendered}</h2>
      <p onclick="showDetailView('${post.id}')">${post.acf.description}</p>
      <div>
      <p>${post.acf.environment}</p>
      ${this.generateFavPostsButton(post.id)}
      </div>
      </article>
    `;
    }

    if (posts.length === 0) {
      htmlTemplate = /*html*/ `
        <p>No Activities</p>
      `;
    }

    // document.querySelector('#activities-container').innerHTML = htmlTemplate;
  }

  // --------------------- Olga ---------
  //using this function for mood selection : moods = categories

  appendPostsByCatAndTag(posts) {
    let html = "";
    console.log(posts);
    for (let post of posts) {
      html += /*html*/ `
      <article >
      <h2 onclick="showDetailView('${post.id}')">${post.title.rendered}</h2>
      <p onclick="showDetailView('${post.id}')">${post.acf.description}</p>
      <div>
      <p>${post.acf.environment}</p>
      ${this.generateFavPostsButton(post.id)}
      </div>
      </article>
    `;
    }

    if (posts.length === 0) {
      html = `
        <h5>No Activities</h5><br>
        <h5>try again ❤</h5>
      `;
    }

    document.querySelector("#activities-container").innerHTML = html;
  }

  appendPostsByCategory(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
       <article >
      <h2 onclick="showDetailView('${post.id}')">${post.title.rendered}</h2>
      <p onclick="showDetailView('${post.id}')">${post.acf.description}</p>
      <div>
      <p>${post.acf.environment}</p>
      ${this.generateFavPostsButton(post.id)}
      </div>
      </article>
    `;
    }
    // if no movies, display feedback to the user
    if (posts.length == 0) {
      htmlTemplate = /*html*/ `
        <h5>No Activities</h5><br>
        <h5>try again ❤</h5>
      `;
    }

    document.querySelector("#section-favorites").innerHTML = htmlTemplate;
  }

  //filter by environment function for activity tab - Vlada
  /*
  filterByEnvironment(environment) {
    if (environment === "all") {
      this.appendPosts(this.posts);
    } else {
      const results = this.posts.filter(
        (post) => post.acf.environment === environment
      );
      this.appendPosts(results);
    }
  }
  */

  // filter by emotions function - Marius
  filterByEmotions(value) {
    const buttons = document.querySelectorAll(
      ".filter-container .filterByEmotions"
    );
    for (const button of buttons)
      if (value === button.getAttribute("id")) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    /*if (value == "all") {
      this.getPosts();
    } else {
      const results = this.categories.filter(post => post.categories[id] == value);
      this.getPostsByCategory(results);
    }*/
  }

  // order function - Marius
  orderBy(option) {
    if (option === "environment") {
      orderByEnvironment();
    } else if (option === "latest") {
      orderByLatest();
    } else if (option === "oldest") {
      orderByOldest();
    }
  }

  // order by environment of the activity function - Marius
  orderByEnvironment() {
    this.favposts.sort((activity1, activity2) => {
      return activity1.acf.environment.localeCompare(activity2.acf.environment);
    });
    this.appendFavPosts();
  }

  // order by latest activities function - Marius
  orderByLatest() {
    this.favposts.sort((activity1, activity2) => {
      return activity2.date.localeCompare(activity1.date);
    });
    this.appendFavPosts();
  }

  // order by oldest activities function - Marius
  orderByOldest() {
    this.favposts.sort((activity1, activity2) => {
      return activity1.date.localeCompare(activity2.date);
    });
    this.appendFavPosts();
  }

  // Detail View function - Vlada
  showDetailView(id) {
    const postObject = this.posts.find((post) => post.id == id);
    document.querySelectorAll("#detailed-view-container h2").innerHTML =
      postObject.title.rendered;
    document.querySelector("#detailed-view-container").innerHTML = /*html*/ `
        <article>
        <div>
        <p>${postObject.acf.environment}</p>
           <a id = "fav-button"
      onclick = "pushPost()" >
      <svg xmlns="http://www.w3.org/2000/svg" width="15.969" height="14.184" viewBox="0 0 15.969 14.184">
      <g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="none" stroke="#583953" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>
      </svg>
      </a>
        </div>
        <h2>${postObject.title.rendered}</h2>
        <p>${postObject.acf.description}</p>
        <p>${postObject.acf.how}</p>
        <p>${postObject.acf.needs}</p>
        <p>${postObject.acf.whattodo}</p>
        </article>
    `;
    navigateto("#/detailView");
  }

  // Making favorite tab functional - Marius

  //Appending fav movies to the DOM by looping through _favMovies

  appendFavPosts() {
    let html = "";
    for (const post of this.favposts) {
      console.log(post);
      html += /*html*/ `
       <article >
      <h2 onclick="showDetailView('${post.id}')">${post.title.rendered}</h2>
      <p onclick="showDetailView('${post.id}')">${post.acf.description}</p>
      <div>
      <p>${post.acf.environment}</p>
      ${this.generateFavPostsButton(post.id)}
      </div>
      </article>
    `;
    }
    // if no movies display a default text
    if (this.favposts.length === 0) {
      html = "<p>No activities added to favorites</p>";
    }
    document.querySelector("#section-favorites").innerHTML = html;
  }

  /**
   * Generating the fav button
   */
  generateFavPostsButton(postId) {
    let btnTemplate = `
        <a id = "fav-button" onclick="addToFavourites('${postId}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="15.969" height="14.184" viewBox="0 0 15.969 14.184">
      <g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="none" stroke="#583953" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>
      </svg>
      </a>
    `;
    if (this.isFavPosts(postId)) {
      btnTemplate = `
      <a id = "fav-button" onclick = "removeFromFavourites('${postId}')" >
      <svg xmlns="http://www.w3.org/2000/svg" width="15.969" height="14.184" viewBox="0 0 15.969 14.184">
      <g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
      <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="#583953" stroke="#583953" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </g>
      </svg>
      </a>`;
    }
    return btnTemplate;
  }

  /**
   * Adding movie to favorites by given movieId
   */
  addToFavourites(postId) {
    let favPost = this.filtered.find((post) => post.id == postId);
    this.favposts.push(favPost);
    this.appendPostsByCatAndTag(this.filtered); // update the DOM to display the right button
    this.appendFavPosts(); // update the DOM to display the right items from the _favMovies list
  }

  /**
   * Removing movie from favorites by given movieId
   */
  removeFromFavourites(postId) {
    this.favposts = this.favposts.filter((post) => post.id != postId);
    this.appendPostsByCatAndTag(this.filtered); // update the DOM to display the right button
    this.appendFavPosts(); // update the DOM to display the right items from the _favMovies list
  }

  /**
   * Checking if movie already is added to _favMovies
   */
  isFavPosts(postId) {
    return this.favposts.find((post) => post.id == postId); // checking if _favMovies has the movie with matching id or not
  }
}

export default MoodSelector;
