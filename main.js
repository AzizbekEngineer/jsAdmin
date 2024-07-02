const API_URL = "https://dummyjson.com";
let tbody = document.querySelector(".tbody");
let categoryList = document.querySelector(".category");

async function fetchData(api, category = "") {
  if (category && category !== "All") {
    const data = await fetch(`${api}/products/category/${category}`);
    data
      .json()
      .then((res) => createData(res))
      .catch((err) => console.log(err));
  } else {
    const data = await fetch(`${api}/products`);
    data
      .json()
      .then((res) => createData(res))
      .catch((err) => console.log(err));
  }
}

fetchData(API_URL);

async function fetchCategory(api) {
  const data = await fetch(`${api}/products/category-list`);
  data
    .json()
    .then((res) => createCategory(res))
    .catch((err) => console.log(err));
}
fetchCategory(API_URL);

function createData(data) {
  let item = "";
  data.products.forEach((el) => {
    item += `
        <tr >
            <td class="table__avatar-item df">
                <div class="table__avatar"><img src=${
                  el.images[0]
                } alt=""></div>
                <p class="table_avatar-name">${el.title}</p>
            </td>
            <td>${el.category}</td>
            <td class="firstColor">$${el.price}</td>
            <td class="redColor">${el.stock}</td>
            <td>${el.meta.createdAt.split("T")[0]}</td>
        </tr>
        `;
  });
  tbody.innerHTML = item;
}

function createCategory(data) {
  console.log(data);
  let categoryItem = "<p>All</p>";
  data.forEach((el) => {
    categoryItem += `
    <p>${el}</p>
    `;
  });
  categoryList.innerHTML = categoryItem;
}

categoryList.addEventListener("click", (e) => {
  let category = e.target.innerHTML;
  fetchData(API_URL, category);
});
