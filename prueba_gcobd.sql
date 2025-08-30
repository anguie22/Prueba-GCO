CREATE DATABASE prueba_gcobd;
USE prueba_gcobd;

-- Tabla de tipos de identificación
CREATE TABLE tipo_identificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de países
CREATE TABLE pais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de departamentos
CREATE TABLE departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais_id INT NOT NULL,
    FOREIGN KEY (pais_id) REFERENCES pais(id)
);

-- Tabla de ciudades
CREATE TABLE ciudad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    departamento_id INT NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES departamento(id)
);

-- Tabla de marcas
CREATE TABLE marca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de clientes
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_identificacion_id INT NOT NULL,
    numero_identificacion VARCHAR(50) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    ciudad_id INT NOT NULL,
    departamento_id INT NOT NULL,
    pais_id INT NOT NULL,
    marca_id INT NOT NULL,
    
    FOREIGN KEY (tipo_identificacion_id) REFERENCES tipo_identificacion(id),
    FOREIGN KEY (ciudad_id) REFERENCES ciudad(id),
    FOREIGN KEY (departamento_id) REFERENCES departamento(id),
    FOREIGN KEY (pais_id) REFERENCES pais(id),
    FOREIGN KEY (marca_id) REFERENCES marca(id)
);

INSERT INTO tipo_identificacion (nombre) VALUES 
('Cédula de ciudadanía'),
('Cédula de extranjería'),
('Pasaporte'),
('NIT');

-- País
INSERT INTO pais (nombre) VALUES ('Colombia');

-- Departamentos
INSERT INTO departamento (nombre, pais_id) VALUES
('Amazonas', 1),
('Antioquia', 1),
('Arauca', 1),
('Atlántico', 1),
('Bolívar', 1),
('Boyacá', 1),
('Caldas', 1),
('Caquetá', 1),
('Casanare', 1),
('Cauca', 1),
('Cesar', 1),
('Chocó', 1),
('Córdoba', 1),
('Cundinamarca', 1),
('Guainía', 1),
('Guaviare', 1),
('Huila', 1),
('La Guajira', 1),
('Magdalena', 1),
('Meta', 1),
('Nariño', 1),
('Norte de Santander', 1),
('Putumayo', 1),
('Quindío', 1),
('Risaralda', 1),
('San Andrés y Providencia', 1),
('Santander', 1),
('Sucre', 1),
('Tolima', 1),
('Valle del Cauca', 1),
('Vaupés', 1),
('Vichada', 1),
('Bogotá D.C.', 1);

-- Ciudades capitales (1 ciudad por departamento, en el mismo orden que arriba)
INSERT INTO ciudad (nombre, departamento_id) VALUES
('Leticia', 1),
('Medellín', 2),
('Arauca', 3),
('Barranquilla', 4),
('Cartagena de Indias', 5),
('Tunja', 6),
('Manizales', 7),
('Florencia', 8),
('Yopal', 9),
('Popayán', 10),
('Valledupar', 11),
('Quibdó', 12),
('Montería', 13),
('Facatativá', 14), 
('Inírida', 15),
('San José del Guaviare', 16),
('Neiva', 17),
('Riohacha', 18),
('Santa Marta', 19),
('Villavicencio', 20),
('Pasto', 21),
('Cúcuta', 22),
('Mocoa', 23),
('Armenia', 24),
('Pereira', 25),
('San Andrés', 26),
('Bucaramanga', 27),
('Sincelejo', 28),
('Ibagué', 29),
('Cali', 30),
('Mitú', 31),
('Puerto Carreño', 32),
('Bogotá', 33);

INSERT INTO marca (nombre) VALUES
('Americanino'),
('American Eagle'),
('Chevignon'),
('Esprit'),
('Naf Naf'),
('Rifle');

select * from marca;
