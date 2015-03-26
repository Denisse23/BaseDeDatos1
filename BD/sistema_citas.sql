-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 25, 2015 at 04:19 PM
-- Server version: 5.5.42
-- PHP Version: 5.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sistema_citas`
--

-- --------------------------------------------------------

--
-- Table structure for table `asesor`
--

CREATE TABLE IF NOT EXISTS `asesor` (
  `id_asesor` bigint(20) unsigned NOT NULL COMMENT 'El id del asesor',
  `primer_nombre` varchar(25) DEFAULT NULL COMMENT 'El primer nombre del asesor',
  `segundo_nombre` varchar(25) DEFAULT NULL COMMENT 'segundo  nombre del asesor',
  `primer_apellido` varchar(25) DEFAULT NULL COMMENT 'El primer del asesor',
  `segundo_apellido` varchar(25) DEFAULT NULL COMMENT 'segundo apellido del asesor',
  `tipo` varchar(8) DEFAULT NULL COMMENT 'Tipo de asesor, asero_jefe o mecanico',
  `telefono` varchar(8) DEFAULT NULL COMMENT 'El teléfono del asesor',
  `id_jefe_asesor` bigint(20) unsigned DEFAULT NULL COMMENT 'El id del jefe del asesor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `automovil`
--

CREATE TABLE IF NOT EXISTS `automovil` (
  `placa` varchar(20) NOT NULL COMMENT 'La placa del automóvil',
  `modelo` varchar(25) DEFAULT NULL COMMENT 'El modelo del automóvil',
  `numero_motor` varchar(15) DEFAULT NULL COMMENT 'El número del motor del automóvil',
  `id_cliente_automovil` bigint(20) unsigned DEFAULT NULL COMMENT 'El id del cliente del automóvil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `automovil`
--

INSERT INTO `automovil` (`placa`, `modelo`, `numero_motor`, `id_cliente_automovil`) VALUES
('HCW-20', 'suzuki', '1G25255D255', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE IF NOT EXISTS `cita` (
  `id_cita` bigint(20) unsigned NOT NULL COMMENT 'id de la cita',
  `tipo_mantenimiento` decimal(10,0) DEFAULT NULL COMMENT 'Costo de mantenimiento que se le realiza al carro ',
  `tipo_reparacion` text COMMENT 'Tipo de reparación que se le debe hacer al carro',
  `fecha_entrega` date DEFAULT NULL COMMENT 'Fecha en la que se entregara el carro',
  `fecha_entrada` date DEFAULT NULL COMMENT 'Fecha en la que se registró en auto en la cita',
  `hora_entrada` varchar(5) DEFAULT NULL COMMENT 'Hora de registro del carro en la cita',
  `estado` varchar(20) DEFAULT NULL COMMENT 'Estado del carro durante la cita',
  `placa_cita` varchar(20) DEFAULT NULL COMMENT 'La placa del carro en la cita',
  `id_jefe_cita` bigint(20) unsigned DEFAULT NULL COMMENT 'El id del asesor encargado de la cita',
  `id_cliente_cita` bigint(20) unsigned DEFAULT NULL COMMENT 'El id del cliente de la cita',
  `confirmada` int(1) DEFAULT '0' COMMENT 'Sera un 1 para cita confirmada y un 0 par cita aún no confirmada'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cita`
--

INSERT INTO `cita` (`id_cita`, `tipo_mantenimiento`, `tipo_reparacion`, `fecha_entrega`, `fecha_entrada`, `hora_entrada`, `estado`, `placa_cita`, `id_jefe_cita`, `id_cliente_cita`, `confirmada`) VALUES
(1, '5000', NULL, NULL, '2015-03-25', '15:00', NULL, 'HCW-20', NULL, 1, NULL),
(2, '5000', 'fallo del motor de arranque', NULL, '2015-03-26', '08:00', NULL, 'HCW-20', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cita_mecanicos`
--

CREATE TABLE IF NOT EXISTS `cita_mecanicos` (
  `id_cita_mecanico` bigint(20) unsigned NOT NULL COMMENT 'Id cita para la tabla mecanicos',
  `id_asesor_mecanico` bigint(20) unsigned NOT NULL COMMENT 'Id del asesor que esta asignado como uno de los mecanicos a está cita'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` bigint(20) unsigned NOT NULL COMMENT 'El id del cliente',
  `primer_nombre` varchar(25) DEFAULT NULL COMMENT 'El primer nombre del cliente',
  `segundo_nombre` varchar(25) DEFAULT NULL COMMENT 'Segundo nombre del cliente',
  `primer_apellido` varchar(25) DEFAULT NULL COMMENT 'El primer del cliente',
  `segundo_apellido` varchar(25) CHARACTER SET utf32 DEFAULT NULL COMMENT 'segundo apellido del cliente',
  `direccion` varchar(40) DEFAULT NULL COMMENT 'Dirección de cliente ',
  `correo` varchar(30) DEFAULT NULL COMMENT 'Correo del cliente'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `direccion`, `correo`) VALUES
(1, 'Denisse', 'Anyell', 'Carbajal', 'Suazo', 'San jose de la peña', 'denisse.suazo@unitec.edu');

-- --------------------------------------------------------

--
-- Table structure for table `cliente_telefonos`
--

CREATE TABLE IF NOT EXISTS `cliente_telefonos` (
  `id_cliente_telefono` bigint(20) unsigned NOT NULL COMMENT 'El id del cliente para los teléfonos',
  `telefono_cliente` varchar(8) NOT NULL COMMENT 'Uno de los teléfonos del cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asesor`
--
ALTER TABLE `asesor`
  ADD PRIMARY KEY (`id_asesor`), ADD UNIQUE KEY `id_asesor` (`id_asesor`), ADD KEY `id_jefe_asesor` (`id_jefe_asesor`);

--
-- Indexes for table `automovil`
--
ALTER TABLE `automovil`
  ADD PRIMARY KEY (`placa`), ADD UNIQUE KEY `placa` (`placa`), ADD UNIQUE KEY `placa_2` (`placa`), ADD KEY `id_cliente_automovil` (`id_cliente_automovil`);

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD UNIQUE KEY `id_cita` (`id_cita`), ADD KEY `placa_cita` (`placa_cita`,`id_jefe_cita`,`id_cliente_cita`), ADD KEY `cliente` (`id_cliente_cita`), ADD KEY `asesor` (`id_jefe_cita`);

--
-- Indexes for table `cita_mecanicos`
--
ALTER TABLE `cita_mecanicos`
  ADD PRIMARY KEY (`id_cita_mecanico`,`id_asesor_mecanico`), ADD KEY `id_cita_mecanico` (`id_cita_mecanico`,`id_asesor_mecanico`), ADD KEY `mecanico` (`id_asesor_mecanico`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`), ADD UNIQUE KEY `id_cliente` (`id_cliente`);

--
-- Indexes for table `cliente_telefonos`
--
ALTER TABLE `cliente_telefonos`
  ADD PRIMARY KEY (`id_cliente_telefono`,`telefono_cliente`), ADD KEY `id_cliente_telefono` (`id_cliente_telefono`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asesor`
--
ALTER TABLE `asesor`
  MODIFY `id_asesor` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'El id del asesor';
--
-- AUTO_INCREMENT for table `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id de la cita',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'El id del cliente',AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `asesor`
--
ALTER TABLE `asesor`
ADD CONSTRAINT `jefe` FOREIGN KEY (`id_jefe_asesor`) REFERENCES `asesor` (`id_asesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `automovil`
--
ALTER TABLE `automovil`
ADD CONSTRAINT `dueño` FOREIGN KEY (`id_cliente_automovil`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cita`
--
ALTER TABLE `cita`
ADD CONSTRAINT `asesor` FOREIGN KEY (`id_jefe_cita`) REFERENCES `asesor` (`id_asesor`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `automovil` FOREIGN KEY (`placa_cita`) REFERENCES `automovil` (`placa`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `cliente` FOREIGN KEY (`id_cliente_cita`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cita_mecanicos`
--
ALTER TABLE `cita_mecanicos`
ADD CONSTRAINT `cita` FOREIGN KEY (`id_cita_mecanico`) REFERENCES `cita` (`id_cita`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `mecanico` FOREIGN KEY (`id_asesor_mecanico`) REFERENCES `asesor` (`id_asesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cliente_telefonos`
--
ALTER TABLE `cliente_telefonos`
ADD CONSTRAINT `teléfono cliente` FOREIGN KEY (`id_cliente_telefono`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
