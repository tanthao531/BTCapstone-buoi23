// Hàm cập nhật số lượng trên icon giỏ hàng
function updateCartQuantity() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
  });

  document.querySelector('.cart_quantity').textContent = totalQuantity;
}


// Thêm vào giỏ hàng
document.addEventListener('click', function (event) {

  if (event.target.classList.contains('addToCartBtn')) {

    const productItem = event.target.closest('.product_item');

    const name = productItem.querySelector('.card-title').textContent;

    const img = productItem.querySelector('.card-img-top').src;

    const price = productItem
      .querySelector('.card-text:nth-child(3)')
      .textContent.replace('Price: ', '');

    const cartItem = {
      name,
      img,
      price,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(
      item => item.name === name
    );

    if (existingItemIndex !== -1) {

      cart[existingItemIndex].quantity += 1;

    } else {

      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật số lượng trên icon
    updateCartQuantity();
  }
});


// Khi load trang vẫn hiển thị đúng số lượng
document.addEventListener('DOMContentLoaded', function () {
  updateCartQuantity();
});

function renderCart() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartList = document.querySelector('.cart_list');

  const totalPriceElement = document.querySelector('.total_price');

  cartList.innerHTML = '';

  let totalCartPrice = 0;

  cart.forEach((item, index) => {

    const itemTotal = item.quantity * item.price;

    totalCartPrice += itemTotal;

    const tr = document.createElement('tr');

    tr.innerHTML = `
    
      <td>
        <img 
          src="${item.img}" 
          alt="${item.name}" 
          width="80"
        >
      </td>

      <td>${item.name}</td>

      <td>${item.price}</td>

      <td>
        <button 
          class="btn btn-danger decreaseBtn"
          data-index="${index}"
        >
          -
        </button>

        <span class="mx-2">
          ${item.quantity}
        </span>

        <button 
          class="btn btn-success increaseBtn"
          data-index="${index}"
        >
          +
        </button>
      </td>

      <td>${itemTotal}</td>
    `;

    cartList.appendChild(tr);
  });

  totalPriceElement.textContent = totalCartPrice;
}

document.addEventListener('click', function (event) {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Tăng số lượng
  if (event.target.classList.contains('increaseBtn')) {

    const index = event.target.dataset.index;

    cart[index].quantity++;

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();
  }

  // Giảm số lượng
  if (event.target.classList.contains('decreaseBtn')) {

    const index = event.target.dataset.index;

    cart[index].quantity--;

    // Nếu quantity = 0 thì xoá sản phẩm
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();
  }

  // Thanh toán
  if (event.target.classList.contains('checkoutBtn')) {

    localStorage.setItem('cart', JSON.stringify([]));

    renderCart();

    alert('Thanh toán thành công!');
  }
});

document.addEventListener('DOMContentLoaded', renderCart);