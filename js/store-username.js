// Get form, item, and wishlist
var addToWishList = document.querySelector('#add-to-wishlist');
var wishlistItem = document.querySelector('#wishlist-item');
var wishlist = document.querySelector('#user-name');

export addToWishList.addEventListener('submit', function (event) {

    // Don't submit the form
    event.preventDefault();

    // Ignore it if the wishlist item is empty
    if (wishlistItem.value.length < 1) return;

    // Add item to wishlist
    wishlist.innerHTML = wishlistItem.value;

    // Clear input
    wishlistItem.value = '';

    // Save the list to localStorage
    localStorage.setItem('wishlistItems', wishlist.innerHTML);

}, false);

// Check for saved wishlist items
var saved = localStorage.getItem('wishlistItems');

// If there are any saved items, update our list
if (saved) {
    wishlist.innerHTML = saved;
}