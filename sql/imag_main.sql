-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-06-2024 a las 14:23:43
-- Versión del servidor: 10.11.7-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `imag_main`
--
CREATE DATABASE IF NOT EXISTS `imag_main` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `imag_main`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE IF NOT EXISTS `imagenes` (
  `imagen_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `imagen_url` varchar(255) NOT NULL,
  `imagen_meta_s3` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`imagen_meta_s3`)),
  `fecha_hora_creacion` datetime DEFAULT current_timestamp(),
  `fecha_hora_borrar` datetime DEFAULT NULL,
  `imagen_tamanio` double DEFAULT 0,
  `ip_origen` varchar(15) DEFAULT '0.0.0.0',
  `registro_activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`imagen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Disparadores `imagenes`
--
DELIMITER $$
CREATE TRIGGER `set_fecha_hora_borrar` BEFORE INSERT ON `imagenes` FOR EACH ROW BEGIN
  IF NEW.fecha_hora_borrar IS NULL THEN
    SET NEW.fecha_hora_borrar = DATE_ADD(NEW.fecha_hora_creacion, INTERVAL 15 DAY);
  END IF;
END
$$
DELIMITER ;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `desactivar_registros_vencidos` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-10 14:21:33' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  UPDATE imagenes
  SET registro_activo = 0
  WHERE fecha_hora_borrar <= NOW() AND fecha_hora_borrar IS NOT NULL;
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
