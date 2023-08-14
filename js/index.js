const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const elementosCarrito = document.getElementById("modalContent");
const productos = [{
        id: 1,
        nombre: "Hill's",
        precio: 200,
        imagen: "https://www.turacion.com/images/thumbs/0013620_hills-gatitos-kitten-healthy-development-16-kg_600.jpeg",
        kg: "10kg",
        enCarrito: 0
    },
    {
        id: 2,
        nombre: "Purina",
        precio: 250,
        imagen: "https://geant.vteximg.com.br/arquivos/ids/275687-1000-1000/652909.jpg?v=637598818280400000",
        kg: "8kg",
        enCarrito: 0
    },
    {
        id: 3,
        nombre: "Equilibrio",
        precio: 300,
        imagen: "https://preprod.br.equilibrio-petfood.com/wp-content/uploads/2023/06/7896588944545_0.png",
        kg: "9,5kg",
        enCarrito: 0
    },
    {
        id: 4,
        nombre: "Whiskas",
        precio: 350,
        imagen: "https://geant.vteximg.com.br/arquivos/ids/338914-1000-1000/345239.jpg?v=638176964509700000",
        kg: "2kg",
        enCarrito: 0
    }
];
localStorage.setItem("productos", JSON.stringify(productos));

let carrito = [];

let productosEnCarrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p class="price">$ ${product.precio}</p>
    `;
    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "🛒 Agregar al carrito";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
        let productoActual = {
            id: product.id,
            img: product.imagen,
            nombre: product.nombre,
            precio: product.precio,
            enCarrito: product.enCarrito
        };
        
        productos[product.id - 1].enCarrito += 1;

        Toastify({
            text: "Producto añadido con éxito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();

        let encontre = productosEnCarrito.some(item => item.id === productoActual.id);

        if (!encontre) {
            productosEnCarrito.push(productoActual);
            carrito.push(productoActual);
        }
        verCarrito.click();
    });
});

const storedCart = localStorage.getItem("cart");
if (storedCart) {
    carrito = JSON.parse(storedCart);
}

verCarrito.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    modalContainer.innerHTML = "";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.prepend(modalHeader);

    const modalbutton = document.createElement("h2");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);
    
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src = "${product.img}">
            <h3>${product.nombre}</h3>
            <p>Qty: ${productos[product.id-1].enCarrito}</p>
            <p>${product.precio} $</p>
    `;
        modalContainer.append(carritoContent);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalBuying = document.createElement("div");

    const guardarCarrito = document.createElement("button");
    guardarCarrito.id = "guardar";
    guardarCarrito.textContent = "💾 Guardar carrito";
    const finalizarButton = document.createElement("button");
    finalizarButton.id = "finalizar";
    finalizarButton.textContent = "Finalizar compra";

    totalBuying.className = "total-pagar";
    totalBuying.innerHTML = `Total a pagar: $${total} </br>`;
    totalBuying.appendChild(guardarCarrito);
    totalBuying.appendChild(finalizarButton);
    modalContainer.append(totalBuying);

    finalizarButton.addEventListener("click", () => {
        finalizarButton.innerHTML = "⏳Finalizando..."
        setTimeout(() => {
            finalizarButton.innerHTML = "✅ Compra exitosa"
        }, 3000)
        localStorage.removeItem("cart");
    });

    guardarCarrito.addEventListener("click", () => {
        guardarCarrito.innerHTML = "⏳Guardando..."
        setTimeout(() => {
            guardarCarrito.innerHTML = "✅ Carrito guardado"
        }, 1000)
        localStorage.setItem("cart", JSON.stringify(carrito));
    });
});



function masInfo() {
    return new Promise((resolve, reject) => {
        document.querySelector("#info").innerHTML = "⏳ Cargando info..."
        setTimeout(() => {
            resolve(productos);
            document.querySelector("#info").innerHTML = "✅ Info cargada"
        }, 1500)
        
    })
}

document.querySelector("#info").addEventListener("click", () => {
    masInfo()
        .then((productos) => mostrarInfo(productos))
});

function mostrarInfo(productos) {
    let contenedor = document.querySelector("#productInfo");
    let resultado = "";

    for (let producto of productos) {
        resultado += 
        
       `<span class="item"> <strong>Nombre:</strong> ${producto.nombre}<br>
       <strong>Precio:</strong> ${producto.precio}<br>
       <strong>Peso:</strong> ${producto.kg}</span><br><br>
      `
    }
    contenedor.innerHTML = resultado;

}