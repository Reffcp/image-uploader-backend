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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `imagen_id` bigint(20) NOT NULL,
  `imagen_url` varchar(255) NOT NULL,
  `fecha_hora_creacion` datetime DEFAULT current_timestamp(),
  `fecha_hora_borrar` datetime DEFAULT NULL,
  `imagen_tamanio` double DEFAULT 0,
  `ip_origen` varchar(15) DEFAULT '0.0.0.0',
  `registro_activo` bit(1) DEFAULT b'1'
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

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`imagen_id`);

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `imagen_id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
