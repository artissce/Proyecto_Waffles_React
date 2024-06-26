-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 01:27 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbventa`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingredientes`
--

CREATE TABLE `ingredientes` (
  `idIng` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `idTipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredientes`
--

INSERT INTO `ingredientes` (`idIng`, `nombre`, `idTipo`) VALUES
(1, 'Chocolate', 1),
(2, 'Mermelada de Fresa', 1),
(3, 'Sprinkles', 2),
(4, 'Fresas', 2),
(5, 'Oreo', 2),
(6, 'Platano', 2),
(7, 'Lechera', 1),
(8, 'Maple', 1),
(9, 'Cajeta', 1),
(11, 'NULO', 1),
(12, 'NULO', 2),
(18, 'prueba3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `paquetes`
--

CREATE TABLE `paquetes` (
  `idPaquete` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidadProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paquetes`
--

INSERT INTO `paquetes` (`idPaquete`, `nombre`, `precio`, `descripcion`, `idProducto`, `cantidadProducto`) VALUES
(1, 'Paquete 1', '25.00', '2 mini waffles\r\n1 jarabe\r\n1 topping', 1, 2),
(2, 'Paquete 2', '30.00', '2 mini waffles\r\n1 jarabe\r\n2 topping', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `cliente` varchar(255) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `paquete` int(11) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `cliente`, `fecha`, `hora`, `paquete`, `estado`) VALUES
(5, 'laura', '2024-04-12', '02:46:37', 2, 'En proceso'),
(7, 'Pablo', '2024-11-04', '23:28:38', 1, 'En proceso');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `cantIng` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`idProducto`, `nombre`, `precio`, `categoria`, `descripcion`, `cantIng`) VALUES
(1, 'Waffle', '15.00', 'postre', 'si', 5),
(13, 'Producto de prueba', '10.99', 'Categoría de prueba', 'Descripción de prueba', 3),
(14, 'Producto de prueba', '10.99', 'Categoría de prueba', 'Descripción de prueba', 3),
(15, 'Producto de prueba', '10.99', 'Categoría de prueba', 'Descripción de prueba', 3),
(20, 'Producto de prueba2', '10.99', 'Categoría de prueba', 'Descripción de prueba', 3);

-- --------------------------------------------------------

--
-- Table structure for table `producto_ingredientes`
--

CREATE TABLE `producto_ingredientes` (
  `idProducto` int(11) NOT NULL,
  `idIng` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `producto_ingredientes`
--

INSERT INTO `producto_ingredientes` (`idProducto`, `idIng`) VALUES
(14, 1),
(14, 2),
(14, 3),
(15, 1),
(15, 2),
(15, 3),
(20, 1),
(20, 2),
(20, 3);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`) VALUES
(1, 'Administrador'),
(2, 'Cajero');

-- --------------------------------------------------------

--
-- Table structure for table `tiposingredientes`
--

CREATE TABLE `tiposingredientes` (
  `idTipo` int(11) NOT NULL,
  `nombreTipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tiposingredientes`
--

INSERT INTO `tiposingredientes` (`idTipo`, `nombreTipo`) VALUES
(1, 'Jarabe'),
(2, 'Topping');

-- --------------------------------------------------------

--
-- Table structure for table `ti_i`
--

CREATE TABLE `ti_i` (
  `idTipo` int(11) NOT NULL,
  `idIng` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ti_i`
--

INSERT INTO `ti_i` (`idTipo`, `idIng`) VALUES
(1, 18);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `correo`, `contrasena`, `idRol`) VALUES
(1, 'Ana', 'ana@gmail.com', 'manchas123', 1),
(2, 'Saúl Cervantes Candia', 'saul@gmail.com', 'saul123', 2),
(31, 'Giova', 'giova@gmail.com', 'giova123', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`idIng`),
  ADD KEY `idTipo` (`idTipo`);

--
-- Indexes for table `paquetes`
--
ALTER TABLE `paquetes`
  ADD PRIMARY KEY (`idPaquete`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `paquete` (`paquete`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indexes for table `producto_ingredientes`
--
ALTER TABLE `producto_ingredientes`
  ADD PRIMARY KEY (`idProducto`,`idIng`),
  ADD UNIQUE KEY `producto_ingredientes_idProducto_idIng_unique` (`idProducto`,`idIng`),
  ADD KEY `idIng` (`idIng`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indexes for table `tiposingredientes`
--
ALTER TABLE `tiposingredientes`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indexes for table `ti_i`
--
ALTER TABLE `ti_i`
  ADD PRIMARY KEY (`idTipo`,`idIng`),
  ADD KEY `idIng` (`idIng`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `idIng` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `paquetes`
--
ALTER TABLE `paquetes`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tiposingredientes`
--
ALTER TABLE `tiposingredientes`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD CONSTRAINT `ingredientes_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tiposingredientes` (`idTipo`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `paquetes`
--
ALTER TABLE `paquetes`
  ADD CONSTRAINT `paquetes_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`paquete`) REFERENCES `paquetes` (`idPaquete`);

--
-- Constraints for table `producto_ingredientes`
--
ALTER TABLE `producto_ingredientes`
  ADD CONSTRAINT `producto_ingredientes_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_ingredientes_ibfk_2` FOREIGN KEY (`idIng`) REFERENCES `ingredientes` (`idIng`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ti_i`
--
ALTER TABLE `ti_i`
  ADD CONSTRAINT `ti_i_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tiposingredientes` (`idTipo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ti_i_ibfk_2` FOREIGN KEY (`idIng`) REFERENCES `ingredientes` (`idIng`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
