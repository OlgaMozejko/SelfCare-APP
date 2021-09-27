//----------- Olga ---------------

//fetch data from wordpress headless cms
//using it for mood-category selecting 


class MoodSelector {

  constructor() {
    this.posts = [];
    this.categories = [];
    this.tags = [];
  }

  init() {
    this.getPosts();
    this.getCategories();
    this.getTags();
  }

  async getPosts() {
    let data = await fetch('http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed').then(res => res.json());
    this.posts = data;
    this.appendPosts(this.posts);
  }

  async getCategories() {
    let data = await fetch('http://appcontent.omozejko.com/wp-json/wp/v2/categories').then(res => res.json());
    this.categories = data;
    this.appendCategories();
  }

  async getTags() {
    let data = await fetch('http://appcontent.omozejko.com/wp-json/wp/v2/tags').then(res => res.json());
    this.tags = data;
    this.appendTags();
  }

  async getPostsByCategory(categoryId) {
    let url = `http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}`;
    let data = await fetch(url).then(res => res.json());
    this.appendPostsByCategory(data);
  }

  async getPostsByTags(tagId) {
    let data = await fetch(`http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&tags=${tagId}`).then(res => res.json());
    this.appendPostsByTags(data);
  }

  async getPostsByCatAndTag(catId, tagId) {
    let data = await fetch(`http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${catId}&tags=${tagId}`).then(res => res.json());
    this.appendPostsByCatAndTag(data);
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
    document.querySelector('#section-favorites').innerHTML = htmlTemplate;
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
    document.querySelector('#time-select').innerHTML += htmlTemplate;
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
      </article>
    `;
    }

    if (posts.length === 0) {
      htmlTemplate = `
        <h5>No Activities</h5><br>
        <h5>try again ❤</h5>
      `;

    }

    document.querySelector('#activities-container').innerHTML = htmlTemplate;

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

    document.querySelector('#section-favorites').innerHTML = htmlTemplate;
  }

  // filter by emotions function - Marius
  filterByEmotions(value) {
    const buttons = document.querySelectorAll(".filter-container .filterByEmotions");
    for (const button of buttons)
      if (value === button.getAttribute("id")) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
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



}

export default MoodSelector;