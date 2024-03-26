-- Creación de la tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla de inventario
CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- Creación de la tabla de proveedores
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);

-- Creación de la tabla de pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    id_proveedor INT,
    cantidad_pedida INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id)
);

-- Inserción de datos en la tabla de usuarios
INSERT INTO usuarios (nombre, email, contrasena) VALUES
('Juan Pérez', 'juan@example.com', 'contrasena123'),
('María García', 'maria@example.com', 'segura456'),
('Pedro López', 'pedro@example.com', 'clave789'),
('Ana Martínez', 'ana@example.com', 'secreta321'),
('Luis Rodríguez', 'luis@example.com', 'password543');

-- Inserción de datos en la tabla de productos
INSERT INTO productos (nombre, descripcion, precio) VALUES
('Producto A', 'Descripción del Producto A', 10.50),
('Producto B', 'Descripción del Producto B', 20.75),
('Producto C', 'Descripción del Producto C', 15.99),
('Producto D', 'Descripción del Producto D', 12.25),
('Producto E', 'Descripción del Producto E', 8.75);

-- Inserción de datos en la tabla de inventario
INSERT INTO inventario (id_producto, cantidad) VALUES
(1, 100),
(2, 75),
(3, 50),
(4, 200),
(5, 150);

-- Inserción de datos en la tabla de proveedores
INSERT INTO proveedores (nombre, telefono, direccion) VALUES
('Proveedor X', '123-456-7890', 'Calle Principal 123'),
('Proveedor Y', '987-654-3210', 'Avenida Central 456'),
('Proveedor Z', '555-123-4567', 'Boulevard Secundario 789'),
('Proveedor W', '111-222-3333', 'Plaza Independencia 101'),
('Proveedor V', '999-888-7777', 'Paseo del Sol 505');

-- Inserción de datos en la tabla de pedidos
INSERT INTO pedidos (id_producto, id_proveedor, cantidad_pedida) VALUES
(1, 1, 20),
(2, 2, 15),
(3, 3, 10),
(4, 4, 30),
(5, 5, 25);
