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

 

  appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += `
        <article>
            <h2>${post.title.rendered}</h2>
            <p>${post.acf.description}</p>
        </article>
    `;
    }
    //document.querySelector('#activities-container').innerHTML = htmlTemplate;
  }

  appendCategories() {
    let htmlTemplate = "";
    for (let category of this.categories) {
      htmlTemplate += `
        <option value="${category.id}">${category.name}</option>
      `;
    }


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
      htmlTemplate = /*html*/`
        <p>No Activities</p>
      `;
    }

   // document.querySelector('#activities-container').innerHTML = htmlTemplate;
  }

// --------------------- Olga & someone ---------
//using this finction for mood selection : moods = categories

  appendPostsByCategory(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
      htmlTemplate += /*html*/ `
      <article>
      <h2>${post.title.rendered}</h2>
      <p>${post.acf.description}</p>
      <h5 class="tag-info" id="tag-info">${post.tags}</h5>
      </article>
    `;
    }
    // if no movies, display feedback to the user
    if (posts.length === 0) {
      htmlTemplate = /*html*/`
        <h5>No Activities</h5><br>
        <h5>try again ❤</h5>
      `;
    }

    document.querySelector('#activities-container').innerHTML = htmlTemplate;
  }

  //changeUrl(notag) {
   // url = `http://appcontent.omozejko.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&tags=${notag}`;
  //}

//---------------- Olga -----------------------
//this function to pick time for the activity : times = tags
/*
search(value) {
  let searchValue = value.toLowerCase();
  let filteredPosts = this.posts.filter(post => post.tags.name.toLowerCase().includes(searchValue));
  this.getPostsByCategory(filteredPosts);
}
*/

}

export default MoodSelector;
