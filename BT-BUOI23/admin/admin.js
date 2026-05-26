const BASE_URL =
  "https://69df0839d6de26e1192874ad.mockapi.io/product";

const productList = document.getElementById("productList");

let isEdit = false;

let productsData = [];


// GET PRODUCTS

const getProducts = async () => {
  try {

    const response = await axios.get(BASE_URL);

    productsData = response.data;

    renderProducts(productsData);

  } catch (error) {
    console.log(error);
  }
};


// RENDER PRODUCTS

const renderProducts = (products) => {

  let html = "";

  products.forEach((product) => {

    html += `
      <tr>

        <td>${product.id}</td>

        <td>
          <img
            src="${product.img}"
            alt="${product.name}"
            width="100"
            height="100"
            style="object-fit: cover"
          />
        </td>

        <td>${product.name}</td>

        <td>$${product.price}</td>

        <td>${product.screen}</td>

        <td>${product.frontCamera}</td>

        <td>${product.backCamera}</td>

        <td>${product.desc}</td>

        <td>${product.type}</td>

        <td>
          <button
            class="btn btn-warning btn-sm mb-2"
            onclick="openEditModal('${product.id}')"
          >
            Sửa
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="deleteProduct('${product.id}')"
          >
            Xóa
          </button>
        </td>

      </tr>
    `;
  });

  productList.innerHTML = html;
};


// RESET FORM

const resetForm = () => {

  document.getElementById("productId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("price").value = "";

  document.getElementById("img").value = "";

  document.getElementById("screen").value = "";

  document.getElementById("frontCamera").value = "";

  document.getElementById("backCamera").value = "";

  document.getElementById("desc").value = "";

  document.getElementById("type").value = "";
};


// OPEN ADD MODAL

const openAddModal = () => {

  isEdit = false;

  document.getElementById("modalTitle").innerText =
    "Thêm sản phẩm";

  document.getElementById("btnSave").innerText =
    "Thêm";

  resetForm();
};


// GET FORM VALUE

const getFormValue = () => {

  return {

    name:
      document.getElementById("name").value,

    price:
      document.getElementById("price").value,

    img:
      document.getElementById("img").value,

    screen:
      document.getElementById("screen").value,

    frontCamera:
      document.getElementById("frontCamera").value,

    backCamera:
      document.getElementById("backCamera").value,

    desc:
      document.getElementById("desc").value,

    type:
      document.getElementById("type").value,
  };
};


// ADD PRODUCT

const addProduct = async () => {

  try {

    const product = getFormValue();

    // response.data chính là sản phẩm mới
    const response = await axios.post(
      BASE_URL,
      product
    );

    // push sản phẩm mới vào mảng
    productsData.push(response.data);

    renderProducts(productsData);

    // đóng modal
    bootstrap.Modal.getInstance(
      document.getElementById("productModal")
    ).hide();

    resetForm();

  } catch (error) {

    console.log(error);
  }
};


// OPEN EDIT MODAL

const openEditModal = (id) => {

  isEdit = true;

  document.getElementById("modalTitle").innerText =
    "Sửa sản phẩm";

  document.getElementById("btnSave").innerText =
    "Cập nhật";

  // tìm trong mảng local
  const product = productsData.find((item) => {
    return item.id == id;
  });

  if (!product) return;

  document.getElementById("productId").value =
    product.id;

  document.getElementById("name").value =
    product.name;

  document.getElementById("price").value =
    product.price;

  document.getElementById("img").value =
    product.img;

  document.getElementById("screen").value =
    product.screen;

  document.getElementById("frontCamera").value =
    product.frontCamera;

  document.getElementById("backCamera").value =
    product.backCamera;

  document.getElementById("desc").value =
    product.desc;

  document.getElementById("type").value =
    product.type;

  // mở modal
  const modal = new bootstrap.Modal(
    document.getElementById("productModal")
  );

  modal.show();
};


// UPDATE PRODUCT

const updateProduct = async () => {

  try {

    const id =
      document.getElementById("productId").value;

    const product = getFormValue();

    // update API
    const response = await axios.put(
      `${BASE_URL}/${id}`,
      product
    );

    // update lại mảng
    const index = productsData.findIndex((item) => {
      return item.id == id;
    });

    if (index !== -1) {

      // giữ lại id
      productsData[index] = response.data;
    }

    renderProducts(productsData);

    // đóng modal
    bootstrap.Modal.getInstance(
      document.getElementById("productModal")
    ).hide();

    resetForm();

    isEdit = false;

  } catch (error) {

    console.log(error);
  }
};


// DELETE PRODUCT

const deleteProduct = async (id) => {

  const isConfirm = confirm(
    "Bạn có chắc muốn xóa sản phẩm?"
  );

  if (!isConfirm) return;

  try {

    // delete API
    await axios.delete(`${BASE_URL}/${id}`);

    // xóa trong mảng
    productsData = productsData.filter((item) => {
      return item.id != id;
    });

    renderProducts(productsData);

  } catch (error) {

    console.log(error);
  }
};


// SEARCH PRODUCT

document
  .getElementById("searchInput")
  .addEventListener("input", (event) => {

    const keyword =
      event.target.value.toLowerCase();

    const filteredProducts =
      productsData.filter((product) => {

        return product.name
          .toLowerCase()
          .includes(keyword);
      });

    renderProducts(filteredProducts);
  });


// SORT PRODUCT

document
  .getElementById("sortPrice")
  .addEventListener("change", (event) => {

    const value = event.target.value;

    let sortedProducts = [...productsData];

    if (value === "asc") {

      sortedProducts.sort((a, b) => {

        return Number(a.price) - Number(b.price);
      });
    }

    if (value === "desc") {

      sortedProducts.sort((a, b) => {

        return Number(b.price) - Number(a.price);
      });
    }

    renderProducts(sortedProducts);
  });

// BUTTON SAVE

document
  .getElementById("btnSave")
  .addEventListener("click", () => {

    if (isEdit) {

      updateProduct();

    } else {

      addProduct();
    }
  });


getProducts();