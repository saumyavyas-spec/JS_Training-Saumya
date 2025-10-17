// Cart array to hold selected items
var cart = [];

// Fetch products from FakeStore API
fetch('https://fakestoreapi.com/products')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    displayProducts(data);
  })
  .catch(function(error) {
    console.log("Error fetching products:", error);
  });

// Display products on page
function displayProducts(products) {
  var productsDiv = document.getElementById('products');

  products.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'product';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>Price: $${item.price}</p>
      <button onclick="addToCart(${item.id}, '${item.title.replace(/'/g, "\\'")}', ${item.price})">Add to Cart</button>
    `;

    productsDiv.appendChild(div);
  });
}

// Add product to cart
function addToCart(id, name, price) {
  // Check if item already exists in cart
  var existingItem = cart.find(function(item) {
    return item.id === id;
  });

  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity
  } else {
    cart.push({ id: id, name: name, price: price, quantity: 1 });
  }

  calculateCart();
}

// Calculate subtotal, discounts, and total
function calculateCart() {
  var subtotal = 0;
  var totalQuantity = 0;

  // Calculate subtotal and quantity
  for (var i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].quantity;
    totalQuantity += cart[i].quantity;
  }

  // Apply quantity discount (10% if quantity > 10)
  var quantityDiscount = 0;
  if (totalQuantity > 10) {
    quantityDiscount = subtotal * 0.10;
  }

  // Apply price discount (5% if subtotal > 500)
  var afterQuantityDiscount = subtotal - quantityDiscount;
  var priceDiscount = 0;
  if (subtotal > 500) {
    priceDiscount = afterQuantityDiscount * 0.05;
  }

  // Final total
  var finalTotal = afterQuantityDiscount - priceDiscount;

  // Display cart items
  var cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = "";
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>No items added yet.</p>";
  } else {
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var itemText = document.createElement("p");
      itemText.textContent = item.name + " (x" + item.quantity + ") - $" + item.price;
      cartItemsDiv.appendChild(itemText);
    }
  }

  // Update display
  document.getElementById('subtotal').innerText = "Subtotal: $" + subtotal;
  document.getElementById('quantity-discount').innerText = "Quantity Discount (10%): -$" + quantityDiscount;
  document.getElementById('price-discount').innerText = "Price Discount (5%): -$" + priceDiscount;
  document.getElementById('final-total').innerText = "Final Total: $" + finalTotal;
}
