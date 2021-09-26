//Olga

//fetch data from wordpress headless cms


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
    console.log(data);
    this.posts = data;
    this.appendPosts(this.posts);
  }

  async getCategories() {
    let data = await fetch('http://appcontent.omozejko.com/wp-json/wp/v2/categories').then(res => res.json());
    console.log(data);
    this.categories = data;
    this.appendCategories();
  }

  async getTags() {
    let data = await fetch('http://appcontent.omozejko.com/wp-json/wp/v2/tags').then(res => res.json());
    console.log(data);
    this.tags = data;
    this.appendTags();
  }

  async getPostsByCategory(categoryId) {
    console.log(categoryId);
    let data = await fetch(`http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}`).then(res => res.json());
    this.appendPostsByCategory(data);
  }

  async getPostsByTags(tagId) {
    console.log(tagId);
    let data = await fetch(`http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&tags=${categoryId}`).then(res => res.json());
    this.appendPostsByTags(data);
  }

  appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
        <article>
            <h2>${post.title.rendered}</h2>
            <p>${post.acf.description}</p>
        </article>
    `;
    }
    document.querySelector('#activities-container').innerHTML = htmlTemplate;
  }

  appendCategories() {
    let htmlTemplate = "";
    for (let category of this.categories) {
      htmlTemplate += `
        <option value="${category.id}">${category.name}</option>
      `;
    }

    //document.querySelector('#select-category').innerHTML += htmlTemplate;
  } 

  appendTags() {
    let htmlTemplate = "";
    for (let tag of this.tags) {
      htmlTemplate += `
        <option value="${tag.id}">${tag.name}</option>
      `;
    }
    //document.querySelector('#activities-container').innerHTML = htmlTemplate;
  }

  appendPostsByCategory(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
      <article>
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.description}</p>
      </article>
    `;
    }
    // if no movies, display feedback to the user
    if (movies.length === 0) {
      htmlTemplate = /*html*/`
        <p>No Activities</p>
      `;
    }

    //document.querySelector('#movies-by-category-container').innerHTML = htmlTemplate;
  }


}

export default MoodSelector;