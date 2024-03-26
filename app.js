class Supermercado {
    constructor() {
        this.empleados = this.cargarEmpleadosDesdeJSON();
        this.productos = this.cargarProductosDesdeJSON();
    }

    cargarEmpleadosDesdeJSON() {
        const request = new XMLHttpRequest();
        request.open("GET", "empleados.json", false);
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText);
        } else {
            console.error("Error al cargar los empleados.");
            return [];
        }
    }

    // Método para cargar los productos desde el archivo JSON
    cargarProductosDesdeJSON() {
        // Realizar la solicitud para obtener el archivo JSON
        const request = new XMLHttpRequest();
        request.open("GET", "productos.json", false);
        request.send(null);

        // Verificar si la solicitud fue exitosa
        if (request.status === 200) {
            // Parsear el JSON y devolver los productos
            return JSON.parse(request.responseText);
        } else {
            console.error("Error al cargar los productos.");
            return [];
        }
    }

    validarInicioSesion(idEmpleado, contrasena) {
        const empleado = this.empleados.find(emp => emp.id === parseInt(idEmpleado));
        if (empleado && empleado.contrasena === contrasena) {
            return true; // Autenticación exitosa
        } else {
            return false; // Autenticación fallida
        }
    }

    obtenerProductoPorCodigo(codigoProducto) {
        return this.productos.find(prod => prod.codigo === parseInt(codigoProducto));
    }

    cargarListaProductos() {
        const productListElement = document.getElementById("product-list");
        
        // Limpiar la lista antes de agregar productos
        productListElement.innerHTML = "";
    
        // Iterar sobre la lista de productos y crear filas para cada uno
        this.productos.forEach(producto => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.proveedor}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.categoria}</td>
                <td>${producto.existencia}</td>
            `;

            // Agregar la clase 'low-stock' si el inventario es menor a 5
            if (producto.existencia < 5) {
                row.classList.add('low-stock');
            }

            productListElement.appendChild(row);
        });                     

        console.log(this.productos);
    
        // Llamar a la función agregarBotones para agregar los botones a cada fila
        this.agregarBotones();
    }
    
    agregarBotones() {
        // Obtener todas las filas de la tabla
        const rows = document.querySelectorAll("#product-list tr");
    
        // Iterar sobre cada fila y agregar los botones
        rows.forEach(row => {
            // Crear los botones
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.classList.add("edit-button");
            const orderButton = document.createElement("button");
            orderButton.textContent = "Pedido";
            orderButton.classList.add("order-button");
    
            // Agregar eventos a los botones (por ejemplo, abrir un modal para editar)
            editButton.addEventListener("click", () => {
                // Obtener el código del producto de la primera celda de la fila
                const productCode = row.cells[0].textContent;
            
                // Redirigir a la página de pedido con el código del producto como parámetro
                window.location.href = `edit_product.html?id=${productCode}`;
            });
            orderButton.addEventListener("click", () => {
                // Obtener el código del producto de la primera celda de la fila
                const productCode = row.cells[0].textContent;
            
                // Redirigir a la página de pedido con el código del producto como parámetro
                window.location.href = `orders.html?id=${productCode}`;
            });
            
    
            // Agregar los botones a la fila
            row.appendChild(editButton);
            row.appendChild(orderButton);
        });
    }
    

    // Función para realizar el pedido
    realizarPedido(codigoProducto, cantidad) {
        // Validar que la cantidad sea un número válido y mayor que 0
        if (isNaN(cantidad) || cantidad <= 0) {
            return "La cantidad debe ser un número válido y mayor que 0";
        }
    
        // Buscar el producto por su código
        const producto = this.productos.find(prod => prod.codigo === parseInt(codigoProducto));
        
        // Verificar si el producto existe
        if (!producto) {
            return "El producto seleccionado no existe";
        }

        const productoIndex = this.productos.findIndex(prod => prod.codigo === parseInt(codigoProducto));
    
        // Restar la cantidad pedida del inventario del producto
        this.productos[productoIndex].existencia = this.productos[productoIndex].existencia + cantidad;
    
        // Retornar mensaje de éxito y las existencias actualizadas
        return `Pedido de ${cantidad} ${producto.nombre} realizado con éxito.
        Existencias actualizadas: ${this.productos[productoIndex].existencia}
        Existencias agregadas: ${cantidad}`;
    }

    editarProducto(codigoProducto, nombre, proveedor, descripcion, categoria, existencia) {
        // Buscar el índice del producto en el array de productos
        const index = this.productos.findIndex(prod => prod.codigo === parseInt(codigoProducto));
    
        // Verificar si se encontró el producto
        if (index !== -1) {
            // Actualizar los valores del producto
            this.productos[index].nombre = nombre;
            this.productos[index].proveedor = proveedor;
            this.productos[index].descripcion = descripcion;
            this.productos[index].categoria = categoria;
            this.productos[index].existencia = parseInt(existencia);
    
            return `Producto ${codigoProducto} actualizado exitosamente.`;
        } else {
            return `El producto ${codigoProducto} no se encontró.`;
        }
    }
    
    

}

// Instanciar el supermercado
const supermercado = new Supermercado();

// Manejo del formulario de inicio de sesión
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const empleadoId = document.getElementById("employee-id").value;
    const contrasena = document.getElementById("password").value;

    if (supermercado.validarInicioSesion(empleadoId, contrasena)) {
        console.log("Inicio de sesión exitoso. Mostrando lista de productos...");
        window.location.href = 'product_list.html';
    } else {
        alert("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
    }
});
