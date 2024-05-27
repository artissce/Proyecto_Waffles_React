-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2024 at 08:28 PM
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
(1, 'Chocolate', 3),
(2, 'Mermelada de Fresa', 3),
(3, 'Sprinkles', 2),
(4, 'Fresas', 2),
(5, 'Oreo', 2),
(6, 'Platano', 2),
(7, 'Lechera', 3),
(8, 'Maple', 3),
(9, 'Cajeta', 3),
(11, 'NULO', 3),
(21, 'NULO', 2);

-- --------------------------------------------------------

--
-- Table structure for table `paquetes`
--

CREATE TABLE `paquetes` (
  `idPaquete` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float(10,2) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `cantidadProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paquetes`
--

INSERT INTO `paquetes` (`idPaquete`, `nombre`, `precio`, `descripcion`, `cantidadProducto`) VALUES
(34, 'Paquete 1 Waffles', 25.00, 'Incluye 2 waffles\n1 Topping\n2 Jarabe', 1),
(35, 'Paquete 2 Waffles', 30.00, 'Incluye 2 waffles\n2 toppings\n1 jarabe', 1),
(36, 'Paquete 3 Waffles', 35.00, 'Incluye 3 waffles\n2 toppings\n2 jarabes', 1);

-- --------------------------------------------------------

--
-- Table structure for table `paquete_pedido`
--

CREATE TABLE `paquete_pedido` (
  `idPedido` int(11) NOT NULL,
  `idPaquete` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `estado` varchar(255) DEFAULT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `cliente`, `fecha`, `hora`, `paquete`, `estado`, `total`) VALUES
(8, 'Juan Pérez3', '2024-05-19', '19:06:43', 2, 'En proceso', 55),
(9, 'Juan Pérez3', '0000-00-00', '19:08:09', 2, 'En proceso', 55),
(10, 'Juan Pérez3', '2024-05-19', '19:10:03', 2, 'En proceso', 55),
(11, 'Juan Pérez3', '2024-05-18', '19:10:25', 2, 'En proceso', 55);

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
(33, 'Waffles', '10.00', 'Postre', 'Muy ricos waffles, recien hechos', 9);

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
(33, 1),
(33, 2),
(33, 3),
(33, 4),
(33, 5),
(33, 6),
(33, 7),
(33, 8),
(33, 9);

-- --------------------------------------------------------

--
-- Table structure for table `producto_paquetes`
--

CREATE TABLE `producto_paquetes` (
  `idProducto` int(11) NOT NULL,
  `idPaquete` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `producto_paquetes`
--

INSERT INTO `producto_paquetes` (`idProducto`, `idPaquete`, `cantidad`) VALUES
(33, 34, 2),
(33, 35, 2),
(33, 36, 3);

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
(2, 'Topping'),
(3, 'Jarabe');

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
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 21),
(3, 1),
(3, 2),
(3, 7),
(3, 8),
(3, 9),
(3, 11);

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
(31, 'Giova', 'giova@gmail.com', 'giova123', 2),
(38, 'Manchas', 'manchas@gmail.com', 'manchas123', 2);

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
  ADD PRIMARY KEY (`idPaquete`);

--
-- Indexes for table `paquete_pedido`
--
ALTER TABLE `paquete_pedido`
  ADD PRIMARY KEY (`idPedido`,`idPaquete`),
  ADD KEY `idPaquete` (`idPaquete`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`);

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
-- Indexes for table `producto_paquetes`
--
ALTER TABLE `producto_paquetes`
  ADD PRIMARY KEY (`idProducto`,`idPaquete`),
  ADD UNIQUE KEY `producto_paquetes_idPaquete_idProducto_unique` (`idProducto`,`idPaquete`),
  ADD KEY `idPaquete` (`idPaquete`);

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
  MODIFY `idIng` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `paquetes`
--
ALTER TABLE `paquetes`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tiposingredientes`
--
ALTER TABLE `tiposingredientes`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD CONSTRAINT `ingredientes_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tiposingredientes` (`idTipo`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `paquete_pedido`
--
ALTER TABLE `paquete_pedido`
  ADD CONSTRAINT `paquete_pedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paquete_pedido_ibfk_2` FOREIGN KEY (`idPaquete`) REFERENCES `paquetes` (`idPaquete`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `producto_ingredientes`
--
ALTER TABLE `producto_ingredientes`
  ADD CONSTRAINT `producto_ingredientes_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_ingredientes_ibfk_2` FOREIGN KEY (`idIng`) REFERENCES `ingredientes` (`idIng`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `producto_paquetes`
--
ALTER TABLE `producto_paquetes`
  ADD CONSTRAINT `producto_paquetes_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_paquetes_ibfk_2` FOREIGN KEY (`idPaquete`) REFERENCES `paquetes` (`idPaquete`) ON DELETE CASCADE ON UPDATE CASCADE;

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
