// lấy dữ liệu từ link api và hiển thị ra giao diện
fetch('https://69df0839d6de26e1192874ad.mockapi.io/product')
  .then(response => response.json())
//  nhấp vào xem chi tiết sản phẩm nào, thì chỉ render ra sản phẩm đó, lấy các thông tin như img, name, screen, frontCamera, backCamera từ api và hiển thị ra giao diện
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = data.find(item => item.id === productId);
        if (product) {
            const productDetail = document.getElementById('detail');
            productDetail.innerHTML = `
                <div style="margin-top: 100px; margin-bottom: 200px" class="container-fluid d-flex align-items-center justify-content-around gap-4">
                    <div class="row">
                        <div class="w-50">
                            <img src="${product.img}" class="img-fluid rounded-start" alt="${product.name}">
                        </div>
                        <div class="col-4">
                            <div class="card-body d-flex flex-column align-items-start gap-1">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.desc}</p>
                                <p class="card-text">Screen: ${product.screen}</p>
                                <p class="card-text">Front camera: ${product.frontCamera}</p>
                                <p class="card-text"> Back camera: ${product.backCamera}</p>
                                <p class="card-text">Price: $${product.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });