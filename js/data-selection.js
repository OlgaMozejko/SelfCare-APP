//----------- Olga ---------------

//fetch data from wordpress headless cms
//using it for mood-category selecting

class MoodSelector {
  constructor() {
    this.posts = [];
    this.categories = [];
    this.tags = [];
    this._baseUrl = "https://api.jsonbin.io/v3/b/61521f789548541c29b9949d";
    this._headers = {
      "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
      "Content-Type": "application/json"
    };
  }

  init() {
    this.getPosts();
    this.getCategories();
    this.getTags();
    this.loadJson();
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
    this.appendPostsByCatAndTag(data);
  }

  // Fetching the JSON bin, pushing objects to json bin, updating it - Marius

  async loadJson() {
    const url = this._baseUrl + "/latest";
    const response = await fetch(url, {
      headers: this._headers
    });
    const data = await response.json();
    this.posts = data.record;
    this.appendFavorites(this.posts);
  }

  async pushPost() {
    const newPost = {
      title: this.title.rendered,
      description: this.acf.description,
      environment: this.acf.environment
    };
    this.posts.push(newPost);
    await updateJSONBIN(this.posts);
  }

  async updateJSONBIN(users) {

    const response = await fetch(this._baseUrl, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(users)
    });
    const result = await response.json();
    console.log(result);
    this.appendFavorites(result.record);
  }

  appendFavorites(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += `
        <article>
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            <p>${post.environment}</p>
        </article>
    `;
    }
    document.querySelector('#section-favorites').innerHTML = htmlTemplate;
  }



  appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += `
        <article>
            <h2>${post.title.rendered}</h2>
            <p>${post.acf.description}</p>
            <p>${post.acf.environment}</p>
            <p>${post.date}</p>
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
      <article>
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.description}</p>
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
  //using this finction for mood selection : moods = categories

  appendPostsByCatAndTag(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += `
      <article>
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.description}</p>
      <div>
      <p>${post.acf.environment}</p>
      <a id="fav-button" onclick="DoSomething()">
      <svg xmlns="http://www.w3.org/2000/svg" width="15.969" height="14.184" viewBox="0 0 15.969 14.184">
  <g id="Icon_feather-heart" data-name="Icon feather-heart" transform="translate(1 1)">
    <path id="Icon_feather-heart-2" data-name="Icon feather-heart" d="M15.215,5.574a3.675,3.675,0,0,0-5.2,0l-.708.708L8.6,5.574a3.676,3.676,0,1,0-5.2,5.2l.708.708,5.2,5.2,5.2-5.2.708-.708a3.675,3.675,0,0,0,0-5.2Z" transform="translate(-2.323 -4.497)" fill="none" stroke="#583953" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg>
      </a>
      </div>
      </article>
    `;
    }

    if (posts.length === 0) {
      htmlTemplate = `
        <h5>No Activities</h5><br>
        <h5>try again ❤</h5>
      `;
    }

    document.querySelector("#activities-container").innerHTML = htmlTemplate;
  }

  appendPostsByCategory(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
      <article>
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.description}</p>
      <h5 class="tag-info" id="tag-info">${post.tags}</h5>
      <p>${post.acf.environment}</p>
            <p>${post.date}</p>
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

    //document.querySelector("#section-favorites").innerHTML = htmlTemplate;
  }
  /*
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
      }
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
      this.posts.sort((activity1, activity2) => {
        return activity1.acf.environment.localeCompare(activity2.acf.environment);
      });
      this.appendPosts(this.posts);
    }

    // order by latest activities function - Marius
    orderByLatest() {
      this.posts.sort((activity1, activity2) => {
        return activity2.date.localeCompare(activity1.date);
      });
      this.appendPosts(this.posts);
    }

    // order by oldest activities function - Marius
    orderByOldest() {
      this.posts.sort((activity1, activity2) => {
        return activity1.date.localeCompare(activity2.date);
      });
      this.appendPosts(this.posts);
    }

    */
}

export default MoodSelector;