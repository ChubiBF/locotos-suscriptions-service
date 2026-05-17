-- Módulo: Suscripciones y Facturación

CREATE DATABASE IF NOT EXISTS StreamingDB_Payments;
USE StreamingDB_Payments;

-- 1. Tabla de Planes de Suscripción
-- Define las ofertas comerciales
CREATE TABLE IF NOT EXISTS Plan_Suscripcion (
    id_plan INT AUTO_INCREMENT PRIMARY KEY,
    nombre_plan VARCHAR(50) NOT NULL, -- Ej: 'Básico', 'Estándar', 'Premium'
    precio DECIMAL(10,2) NOT NULL, --
    max_pantallas INT DEFAULT 1,
    calidad_video VARCHAR(20) DEFAULT 'HD',
    descripcion TEXT
) ENGINE=InnoDB;

-- 2. Tabla de Suscripción de Usuario
-- Rastrea el estado actual de la membresía del cliente
CREATE TABLE IF NOT EXISTS Suscripcion_Usuario (
    id_suscripcion INT AUTO_INCREMENT PRIMARY KEY, --
    id_usuario INT NOT NULL, -- FK referencial al sistema de identidad
    id_plan INT NOT NULL,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    estado ENUM('activo', 'cancelado', 'expirado', 'pendiente') DEFAULT 'pendiente', --
    renovacion_automatica BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_suscripcion_plan FOREIGN KEY (id_plan) 
        REFERENCES Plan_Suscripcion(id_plan)
) ENGINE=InnoDB;

-- 3. Tabla de Métodos de Pago
-- Registro de método de pago
CREATE TABLE IF NOT EXISTS Metodo_Pago (
    id_metodo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_metodo VARCHAR(50) NOT NULL, -- Ej: 'Tarjeta de Crédito', 'PayPal', 'QR'
    proveedor VARCHAR(50), -- Ej: 'Visa', 'Mastercard'
    token_pago VARCHAR(255), -- Por seguridad, no guardamos datos reales de tarjeta
    es_predeterminado BOOLEAN DEFAULT FALSE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Tabla de Pagos e Historial de Facturación
-- Historial de facturación y transacciones
CREATE TABLE IF NOT EXISTS Pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY, --
    id_usuario INT NOT NULL, --
    id_suscripcion INT,
    id_metodo INT,
    monto DECIMAL(10,2) NOT NULL, --
    moneda VARCHAR(3) DEFAULT 'BOB',
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP, --
    estado_transaccion ENUM('exitoso', 'fallido', 'reembolsado') DEFAULT 'exitoso',
    codigo_transaccion_externo VARCHAR(100) DEFAULT 'SIM-000000', -- ID de la pasarela de pago
    CONSTRAINT fk_pago_suscripcion FOREIGN KEY (id_suscripcion) 
        REFERENCES Suscripcion_Usuario(id_suscripcion),
    CONSTRAINT fk_pago_metodo FOREIGN KEY (id_metodo) 
        REFERENCES Metodo_Pago(id_metodo)
) ENGINE=InnoDB;

-- Datos iniciales para pruebas del catálogo de planes
INSERT INTO Plan_Suscripcion (nombre_plan, precio, max_pantallas, calidad_video) VALUES 
('Básico', 35.00, 1, 'SD'),
('Estándar', 55.00, 2, 'Full HD'),
('Premium', 75.00, 4, '4K + HDR');