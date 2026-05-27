// get api từ đường dẫn https://69df0839d6de26e1192874ad.mockapi.io/product
fetch('https://69df0839d6de26e1192874ad.mockapi.io/product')
  .then(response => response.json())
  .then(data => {
    const productList = document.querySelector('.product_list');
    productList.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
  // lấy các thông tin như name, img, desc, price từ api và hiển thị ra giao diện
    data.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product_item', 'card');
      productItem.style.width = '22rem';
      productItem.style.height = '35rem';
      productItem.style.padding = '1rem';
      productItem.style.borderColor = 'black';
      productItem.innerHTML = `
        <img src="${product.img}" class="card-img-top" style="width: 100%; height: 100%; object-fit: cover;" alt="${product.name}">
        <div class="card-body d-flex flex-column align-items-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.desc}</p>
          <p class="card-text">Price: ${product.price}</p>
          <div class="d-flex gap-2">
            <a class="btn btn-secondary" href="/customer/detail.html?id=${product.id}">Xem chi tiết</a>
            <button class="btn btn-primary addToCartBtn">Thêm vào giỏ hàng</button>
          </div>
        </div>
      `;
      productList.appendChild(productItem);
    });
  })
  .catch(error => console.error('Error fetching products:', error));
// khi chọn id tatca1 thì sẽ hiển thị tất cả sản phẩm
document.getElementById('tatca1').addEventListener('click', function() {
  fetch('https://69df0839d6de26e1192874ad.mockapi.io/product')
    .then(response => response.json())
    .then(data => {
      const productList = document.querySelector('.product_list');
      productList.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
      data.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product_item', 'card');
        productItem.style.width = '22rem';
        productItem.style.height = '35rem';
        productItem.style.padding = '1rem';
        productItem.style.borderColor = 'black';
        productItem.innerHTML = `
          <img src="${product.img}" class="card-img-top" style="width: 100%; height: 100%; object-fit: cover;" alt="${product.name}">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.desc}</p>
            <p class="card-text">Price: ${product.price}</p>
            <div class="d-flex gap-2">
              <a class="btn btn-secondary" href="/customer/detail.html?id=${product.id}">Xem chi tiết</a>
              <button class="btn btn-primary addToCartBtn">Thêm vào giỏ hàng</button>
            </div>
          </div>
        `;
        productList.appendChild(productItem);
      });
      document.getElementById('tatca').textContent = 'Tất cả sản phẩm';
    });
});



// lọc dropdown
document.getElementById('iphone').addEventListener('click', function() {
  fetch('https://69df0839d6de26e1192874ad.mockapi.io/product')
  // lấy các sản phẩm có "type" là "iphone"
    .then(response => response.json())
    .then(data => {
      const productList = document.querySelector('.product_list');
      productList.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
      const filteredProducts = data.filter(product => product.type === 'iphone');
      filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product_item', 'card');
        productItem.style.width = '22rem';
        productItem.style.height = '35rem';
        productItem.style.padding = '1rem';
        productItem.style.borderColor = 'black';
        productItem.innerHTML = `
          <img src="${product.img}" class="card-img-top" style="width: 100%; height: 100%; object-fit: cover;" alt="${product.name}">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.desc}</p>
            <p class="card-text">Price: ${product.price}</p>
            <div class="d-flex gap-2">
              <a class="btn btn-secondary" href="/customer/detail.html?id=${product.id}">Xem chi tiết</a>
              <button class="btn btn-primary addToCartBtn">Thêm vào giỏ hàng</button>
            </div>
          </div>
        `;
        productList.appendChild(productItem);
      });
    });
    // chuyển chữ ở id tatca thành chữ iphone
    document.getElementById('tatca').textContent = 'Iphone';
});
document.getElementById('samsung').addEventListener('click', function() {
  fetch('https://69df0839d6de26e1192874ad.mockapi.io/product')
    .then(response => response.json())
    .then(data => {
      const productList = document.querySelector('.product_list');
      productList.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới
      const filteredProducts = data.filter(product => product.type === 'Samsung');
      filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product_item', 'card');
        productItem.style.width = '22rem';
        productItem.style.height = '35rem';
        productItem.style.padding = '1rem';
        productItem.style.borderColor = 'black';
        productItem.innerHTML = `
          <img src="${product.img}" class="card-img-top" style="width: 100%; height: 100%; object-fit: cover;" alt="${product.name}">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.desc}</p>
            <p class="card-text">Price: ${product.price}</p>
            <div class="d-flex gap-2">
              <a class="btn btn-secondary" href="/customer/detail.html?id=${product.id}">Xem chi tiết</a>
              <button class="btn btn-primary addToCartBtn">Thêm vào giỏ hàng</button>
            </div>
          </div>
        `;
        productList.appendChild(productItem);
      });
    });
    document.getElementById('tatca').textContent = 'Samsung';
});


