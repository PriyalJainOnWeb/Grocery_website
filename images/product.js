let itemsel=document.querySelector(".elements")
let cartitemsel=document.querySelector(".offcanvas-body");
let subtotalel=document.querySelector(".subtotal");
let itemsincartel=document.querySelector(".btn-white sup");
const products=[
    {
        id:1,
        name:"Haladiram's Sev Bhujiya",
        desc:"Snack & Munchies",
        grade:"4.5(149)",
        price:18,
        discount:24,
        stock:15,
        qty:0
    },
    {
        id:2,
        name:"NutriChoice Digestive",
        desc:"Bakery & Biscuits",
        grade:"4.5(25)",
        price:24,
        discount:null,
        stock:10,
        qty:0
    },
    {
        id:3,
        name:"Cadbury % Star",
        desc:"Bakery & Biscuits",
        grade:"5(469)",
        price:32,
        discount:35,
        stock:8,
        qty:0
    },
    {
        id:4,
        name:"Onion Flavour Potato",
        desc:"Snack & Munchies",
        grade:"3.5(456)",
        price:3,
        discount:5,
        stock:5,
        qty:0
    },
    {
        id:5,
        name:"Salted Instant Popcorn",
        desc:"Instant Food",
        grade:"4.5(39)",
        price:13,
        discount:18,
        stock:11,
        qty:0
    },
    {
        id:6,
        name:"Blueberry Greek Yogurt",
        desc:"Dairy, Bread & Eggs",
        grade:"4.5(189)",
        price:18,
        discount:24,
        stock:12,
        qty:0
    },
    {
        id:7,
        name:"Britania Cheese Slices",
        desc:"Dairy, Bread & Eggs",
        grade:"5(345)",
        price:24,
        discount:null,
        stock:9,
        qty:0
    },
    {
        id:8,
        name:"Kellogg's Original Cereals",
        desc:"Instant Food",
        grade:"4(90)",
        price:32,
        discount:35,
        stock:10,
        qty:0
    },
    {
        id:9,
        name:"Slurrp Millet Chocolate",
        desc:"Snack & Munchies",
        grade:"4.5(67)",
        price:3,
        discount:5,
        stock:8,
        qty:0
    },
    {
        id:10,
        name:"Amul Butter-500g",
        desc:"Dairy,Bread & Eggs",
        grade:"3.5(89)",
        price:13,
        discount:18,
        stock:13,
        qty:0
    }
]
function displayproducts()
{
    products.map((item,index)=>{
        itemsel.innerHTML+= `<div class="col">
        <a href="details.html"><div class="card h-100 drop">
          <div class="position-relative">
          <img src="images/${item.id}.jpg" class="card-img-top" alt="...">
          <div class="text-center position-absolute top-50 start-50 translate-middle hide">
            <div class="d-flex gap-2">
            <a href="#"><button type="button" class="btn btn-sm btn-outline-success bg-white text-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Quick View">
              <i class="fa-regular fa-eye"></i>
            </button></a>
            <a href="#"><button type="button" class="btn btn-sm btn-outline-success bg-white text-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wishlist">
              <i class="fa-regular fa-heart"></i>
            </button></a>
            <a href="#"><button type="button" class="btn btn-sm btn-outline-success bg-white text-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Compare">
              <i class="fa-solid fa-arrow-right-arrow-left"></i>
            </button></a>
            </div>
          </div>
          </div>
          <div class="card-body">
            <p class="card-text">${item.desc}</p>
            <h6 class="card-title">${item.name}</h6>
           <p class="card-text fs-6"><small>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star-half-stroke text-warning"></i>
            <span class="text-secondary fs-6">${item.grade}</span></small>
          </p>
          <p>$${item.price} <s>$${item.discount}</s>
          <span><button type="button" class="btn btn-success float-end" onclick=addtocart(${item.id})>+Add</button></span></p>
          </div>
        </div></a>
      </div>`
    })
}
displayproducts()
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let cart=JSON.parse(localStorage.getItem("CART")) || [];
updatecart();
function addtocart(id)
{
  // chack if product already exist
  if(cart.some((item)=>item.id===id))
  {
    changeqty("plus",id);
  }
  else
  {
    const item=products.find((product)=>product.id===id);
    cart.push({
      ...item,
      qty:1
    });

  }
  updatecart();
}
function updatecart()
{
  rendercartitems();
  rendersubtotal();
  localStorage.setItem("CART",JSON.stringify(cart));
}
function rendercartitems()
{
  cartitemsel.innerHTML="";
  cart.forEach((item)=>{
    cartitemsel.innerHTML+=`
    <table class="table w-100">
    <tbody>
    <tr><td><img src="images/${item.id}.jpg" height=50 width=50></td>
    <td><p style="font-size:13px;">${item.name}</p></td>
    <td>$${item.price}</td>
    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16" onclick="changeqty('minus',${item.id})">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
    </svg>${item.qty} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" onclick="changeqty('plus',${item.id})">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg></td>
  <td><i class="fa-solid fa-trash text-primary" onclick="removeitem(${item.id})"></i></td>
  </tr></tbody></table> 
    `
  })
}
function changeqty(action,id)
{
  cart=cart.map((item)=>{
    let qty=item.qty;
    if(item.id===id)
    {
      if(action==="minus" && qty>1)
      {
        qty--;
      }
      else if(action==="plus" && qty<item.stock)
      {
        qty++;
      }
    }
    return {
      ...item,
      qty,
    };
  })
  updatecart();
}
function rendersubtotal()
{
  let totalprice=0,totalitems=0;
  cart.forEach((item)=>{
    totalprice+=item.price*item.qty;
    totalitems+=item.qty;
  });
  subtotalel.innerHTML=`Subtotal(${totalitems} items):$${totalprice.toFixed(2)}`
  itemsincartel.innerHTML=totalitems;
}
function removeitem(id)
{
  cart=cart.filter((item)=>item.id!==id);
  updatecart();
}