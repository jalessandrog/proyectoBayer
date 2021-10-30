-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2021 a las 22:38:57
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proy_bayer`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteMuestra` (IN `m_idMuestra` TINYINT(3))  DELETE FROM muestras WHERE muestras.idMuestra = m_idMuestra$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateMuestra` (IN `m_idMuestra` TINYINT(3), IN `m_NombreMuestra` VARCHAR(100) CHARSET utf8mb4, IN `m_CodigoMuestra` TINYTEXT CHARSET utf8mb4, IN `m_SP` BIGINT(12), IN `m_HojaSeguridad` VARCHAR(800) CHARSET utf8mb4, IN `m_UsoMuestra` ENUM('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') CHARSET utf8mb4, IN `m_Lote` VARCHAR(20) CHARSET utf8mb4, IN `m_Concentracion` FLOAT(2) UNSIGNED, IN `m_UnidadMedida` ENUM('Litros','Kilogramos') CHARSET utf8mb4, IN `m_Cantidad` FLOAT(2) UNSIGNED, IN `m_FechaFabricacion` DATE, IN `m_FechaCaducidad` DATE, IN `m_idTipoDeMuestra` TINYINT(3), IN `m_CodigoFormulacion` CHAR(2) CHARSET utf8mb4, IN `m_Status` TINYINT(1), IN `m_idContenedor` TINYINT(3))  BEGIN

UPDATE muestras SET muestras.NombreMuestra = m_NombreMuestra, muestras.CodigoMuestra = m_CodigoMuestra, muestras.SP = m_SP, muestras.HojaSeguridad = m_HojaSeguridad, muestras.UsoMuestra = m_UsoMuestra, muestras.Lote = m_Lote, muestras.Concentracion = m_Concentracion, muestras.UnidadMedida = m_UnidadMedida, muestras.Cantidad = m_Cantidad, muestras.FechaFabricacion = m_FechaFabricacion, muestras.FechaCaducidad = m_FechaCaducidad, muestras.idTipoDeMuestra = m_idTipoDeMuestra, muestras.CodigoFormulacion = m_CodigoFormulacion, muestras.Status = m_Status, muestras.idContenedor = m_idContenedor WHERE muestras.idMuestra = m_idMuestra;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `idAlerta` tinyint(3) NOT NULL,
  `NombreAlerta` varchar(60) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Color` varchar(7) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Condición` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `alertas`
--

INSERT INTO `alertas` (`idAlerta`, `NombreAlerta`, `Color`, `Condición`) VALUES
(1, 'Próxima a caducar (30 días)', 'ff0000', 30),
(2, 'Próxima a caducar (60 días)', 'a8bf35', 60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenedores`
--

CREATE TABLE `contenedores` (
  `idContenedor` tinyint(3) NOT NULL,
  `NoContenedor` tinyint(3) DEFAULT NULL,
  `Clasificacion` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `contenedores`
--

INSERT INTO `contenedores` (`idContenedor`, `NoContenedor`, `Clasificacion`) VALUES
(1, 1, 'Estante'),
(2, 2, 'Estante'),
(3, 3, 'Estante'),
(4, 4, 'Estante'),
(5, 5, 'Estante'),
(6, NULL, 'Refrigerador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadomuestra`
--

CREATE TABLE `estadomuestra` (
  `Status` tinyint(1) NOT NULL,
  `DescripcionStatus` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `estadomuestra`
--

INSERT INTO `estadomuestra` (`Status`, `DescripcionStatus`) VALUES
(1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manipulan`
--

CREATE TABLE `manipulan` (
  `idMuestra` tinyint(3) NOT NULL,
  `idEmpleado` char(6) COLLATE utf8mb4_spanish_ci NOT NULL,
  `idMuestras_usuarios` tinyint(3) NOT NULL,
  `Sobrante` float NOT NULL,
  `Descarga` float NOT NULL,
  `FechaDeUso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `manipulan`
--

INSERT INTO `manipulan` (`idMuestra`, `idEmpleado`, `idMuestras_usuarios`, `Sobrante`, `Descarga`, `FechaDeUso`) VALUES
(12, 'MEAIM', 1, 20.5, 3, '2021-10-06'),
(1, 'MEAIM', 2, 1900, 100, '2021-10-21'),
(2, 'MEAIM', 3, 0, 1000, '2021-10-21'),
(67, 'MEAIM', 4, 1, 1, '2021-10-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `idMuestra` tinyint(3) NOT NULL,
  `NombreMuestra` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CodigoMuestra` tinytext COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `SP` bigint(12) DEFAULT NULL,
  `HojaSeguridad` varchar(800) COLLATE utf8mb4_spanish_ci DEFAULT NULL COMMENT 'url de donde estará guardado el archivo',
  `UsoMuestra` enum('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Lote` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Concentracion` float UNSIGNED NOT NULL,
  `UnidadMedida` enum('Litros','Kilogramos') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Cantidad` float UNSIGNED NOT NULL,
  `FechaIngreso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `FechaFabricacion` date NOT NULL,
  `FechaCaducidad` date NOT NULL,
  `idTipoDeMuestra` tinyint(3) NOT NULL,
  `CodigoFormulacion` char(2) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `idContenedor` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `muestras`
--

INSERT INTO `muestras` (`idMuestra`, `NombreMuestra`, `CodigoMuestra`, `SP`, `HojaSeguridad`, `UsoMuestra`, `Lote`, `Concentracion`, `UnidadMedida`, `Cantidad`, `FechaIngreso`, `FechaFabricacion`, `FechaCaducidad`, `idTipoDeMuestra`, `CodigoFormulacion`, `Status`, `idContenedor`) VALUES
(1, 'cLAVIS', '', 0, '', 'Tratamiento de Semilla', '1111', 10.06, 'Kilogramos', 10.66, '2021-10-23 17:53:27', '2021-01-01', '2021-01-01', 1, 'SC', 1, 1),
(2, 'ADENGO', '', 0, 'https://github.com/jalessandrog/proyectoBayer.git', 'Herbicida', '1', 55.33, 'Kilogramos', 1.33, '2021-10-23 18:03:09', '0000-00-00', '0000-00-00', 2, 'CL', 1, 1),
(4, 'ALIETTE', '', NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Fungicida', '2', 80, 'Litros', 1000, '2021-10-19 06:14:48', '0000-00-00', '0000-00-00', 1, 'WG', 1, 1),
(5, 'ALION\r\n', NULL, NULL, NULL, 'Fungicida', '3', 50, 'Litros', 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(8, 'ANTRACOL', NULL, NULL, NULL, 'Fungicida', '4', 70, 'Litros', 1000, '2021-10-17 04:30:53', '2021-01-10', '2023-01-10', 1, 'WP', 1, 2),
(9, 'BELT', NULL, NULL, NULL, 'Fungicida', '5', 48, 'Litros', 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(12, 'CALYPSO', NULL, NULL, NULL, 'Fungicida', '6', 48, 'Litros', 1000, '2021-10-06 19:25:13', '2021-01-10', '2021-10-22', 1, 'SC', 1, 1),
(13, 'CLAVIS', NULL, NULL, NULL, 'Fungicida', '7', 48, 'Litros', 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(16, 'CONFIDOR', NULL, NULL, NULL, 'Fungicida', '8', 35, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(17, 'CONSIST MAX', NULL, NULL, NULL, 'Fungicida', '9', 52, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(18, 'CUPRAVIT HYDRO', NULL, NULL, NULL, 'Fungicida', '10', 50, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'WP', 1, 1),
(19, 'CURBIX', NULL, NULL, NULL, 'Fungicida', '11', 20, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(20, 'DECIS FORTE', NULL, NULL, NULL, 'Fungicida', '12', 10, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SE', 1, 1),
(21, 'EMESTO PRIME', NULL, NULL, NULL, 'Tratamiento de Semilla', '13', 24, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SP', 1, 1),
(22, 'FLINT', NULL, NULL, NULL, 'Fungicida', '14', 50, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'WG', 1, 1),
(23, 'FOLICUR', NULL, NULL, NULL, 'Fungicida', '15', 25, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'EW', 1, 1),
(24, 'INFINITO', NULL, NULL, NULL, 'Fungicida', '16', 69, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(25, 'JADE', NULL, NULL, NULL, 'Fungicida', '17', 8, 'Litros', 1000, '2021-10-03 05:00:00', '2021-01-10', '2023-01-10', 1, 'SG', 1, 1),
(26, 'LAUDIS', NULL, NULL, NULL, 'Fungicida', '18', 42, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(27, 'LUNA EXPERIENCE', NULL, NULL, NULL, 'Fungicida', '19', 40, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(28, 'MOVENTO', NULL, NULL, NULL, 'Fungicida', '20', 15, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'DC', 1, 1),
(29, 'NEW LEVERAGE', NULL, NULL, NULL, 'Fungicida', '21', 9, 'Litros', 1000, '2021-10-17 04:31:13', '2021-01-10', '2023-01-10', 1, 'DC', 1, 4),
(30, 'OBERON SPEED', NULL, NULL, NULL, 'Fungicida', '22', 24, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(31, 'OBERON', NULL, NULL, NULL, 'Fungicida', '23', 24, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(32, 'PREVICUR ENERGY', NULL, NULL, NULL, 'Fungicida', '24', 84, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(33, 'PUMA SUPER', NULL, NULL, NULL, 'Fungicida', '25', 7, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'EO', 1, 1),
(34, 'REQUIEM PRIME', NULL, NULL, NULL, 'Fungicida', '26', 16, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'DC', 1, 1),
(35, 'SCALA', NULL, NULL, NULL, 'Fungicida', '27', 60, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SE', 1, 1),
(36, 'SEMEVIN', NULL, NULL, NULL, 'Fungicida', '28', 35, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(37, 'SENCOR', NULL, NULL, NULL, 'Fungicida', '29', 48, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(38, 'SERENADE ASO', NULL, NULL, NULL, 'Fungicida', '30', 14, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(39, 'SERENADE OPTI', NULL, NULL, NULL, 'Fungicida', '31', 26, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'WG', 1, 1),
(40, 'SERENADE SOIL', NULL, NULL, NULL, 'Fungicida', '32', 14, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(41, 'SIGANEX 60 SC', NULL, NULL, NULL, 'Fungicida', '33', 60, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(42, 'SIGMA FORTE', NULL, NULL, NULL, 'Fungicida', '34', 1, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'EC', 1, 1),
(45, 'SIVANTO PRIME', NULL, NULL, NULL, 'Fungicida', '35', 24, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SL', 1, 1),
(46, 'TEGA', NULL, NULL, NULL, 'Fungicida', '36', 50, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(47, 'VERANGO PRIME', NULL, NULL, NULL, 'Nematicida', '37', 50, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(48, 'Sample', '1', 102000012345, NULL, 'Fungicida', '38', 10, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SC', 1, 1),
(49, 'Sample ', '2', 102000012346, NULL, 'Fungicida', '39', 50, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SL', 1, 1),
(50, 'Sample 3', NULL, 102000012347, NULL, 'Fungicida', '40', 35, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SL', 1, 1),
(51, 'Sample 4', NULL, 102000012348, NULL, 'Fungicida', '41', 20, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'WG', 1, 1),
(52, 'Sample 5', NULL, 102000012349, NULL, 'Fungicida', '42', 20, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'WG', 1, 1),
(53, 'Sample 6', NULL, 102000012350, NULL, 'Fungicida', '43', 5, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'WG', 1, 1),
(54, 'Sample 7', NULL, 102000012351, NULL, 'Fungicida', '44', 15, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'CL', 1, 1),
(55, 'Sample 8', NULL, 102000012352, NULL, 'Fungicida', '45', 20, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'CL', 1, 1),
(56, 'Sample 9', NULL, 102000012353, NULL, 'Fungicida', '46', 50, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'EC', 1, 1),
(57, 'Sample 10', NULL, 102000012354, NULL, 'Fungicida', '47', 70, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'DC', 1, 1),
(58, 'Sample 11', NULL, 102000012355, NULL, 'Fungicida', '48', 25, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SC', 1, 1),
(59, 'Sample 12', NULL, 102000012356, NULL, 'Fungicida', '49', 20, 'Litros', 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SC', 1, 1),
(60, 'Sample 13', NULL, 102000012357, 'https://github.com/jalessandrog/proyectoBayer.git', 'Biológico', '246891', 10, 'Litros', 500, '2021-10-06 05:00:00', '2021-01-01', '2023-01-01', 2, 'SE', 1, 1),
(62, 'Prueba 19 oct store procedure', '', NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Biológico', '555555', 33, 'Litros', 1000, '2021-10-20 06:00:25', '0000-00-00', '0000-00-00', 2, 'CS', 1, 3),
(67, 'Prueba 21', '11111', 0, 'https://github.com/jalessandrog/proyectoBayer.git', 'Fungicida', '555555', 30, 'Litros', 1, '2021-10-21 19:32:19', '2015-01-01', '2030-11-11', 1, 'CS', 1, 5),
(69, 'Prueba 23 oct', '', 0, 'https://github.com/jalessandrog/proyectoBayer.git', 'Biológico', '124578', 12, 'Litros', 2, '2021-10-23 16:32:10', '2020-12-10', '2023-12-12', 2, 'EC', 1, 5),
(70, 'Prueba 23 oct', '', 0, 'https://github.com/jalessandrog/proyectoBayer.git', 'Insecticida', '124578', 10, 'Kilogramos', 2, '2021-10-23 16:43:51', '2021-10-03', '2021-11-06', 2, 'TB', 1, 6),
(71, 'lLl', '', 0, 'https://github.com/jalessandrog/proyectoBayer.git', 'Herbicida', '124578', 11, 'Kilogramos', 10.2, '2021-10-23 16:49:50', '2021-10-03', '2021-11-06', 2, 'CS', 1, 1),
(72, 'help', '', 0, 'https://github.com/jalessandrog/proyectoBayer.git', 'Insecticida', '124578', 12, 'Kilogramos', 10.2, '2021-10-23 16:53:51', '2021-09-26', '2021-10-22', 2, 'SE', 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoformulacion`
--

CREATE TABLE `tipoformulacion` (
  `CodigoFormulacion` char(2) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Formulacion` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `DescripcionFormulacion` longtext COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipoformulacion`
--

INSERT INTO `tipoformulacion` (`CodigoFormulacion`, `Formulacion`, `DescripcionFormulacion`) VALUES
('BR', 'BRIQUETAS', 'Bloques sólidos, diseñados para la liberación lenta del activo en el agua'),
('CL', 'LIQUIDO O GEL DE CONTACTO', 'Formulación rodenticida o insecticida en la forma de un líquido/gel, para aplicación directa o después de dilución en caso de gel.'),
('CS', 'SUSPENSION DE ENCAPSULADO', 'Suspensión estable de cápsulas conteniendo sustancia(s) activa(s), en \r\nlíquido, para aplicar diluida en agua.'),
('DC', 'CONCENTRADO DISPERSABLE', 'Líquido homogéneo para ser aplicado como dispersión, luego de ser diluido en agua.'),
('EC', 'CONCENTRADO EMULSIONABLE', 'Líquido homogéneo para ser aplicado como emulsión, luego de ser diluido \r\nen agua.'),
('EG', 'GRANULOS EMULSIONABLES', 'Formulación granular para ser aplicada como emulsión aceite en agua del \r\ningrediente activo, después de la desintegración en agua, pudiendo \r\ncontener auxiliares de formulación insolubles.'),
('EO', 'EMULSION AGUA EN ACEITE', 'Fluido heterogéneo por dispersión de finos glóbulos de agua con activo en \r\nfase continua en un líquido orgánico.\r\n'),
('EW', 'EMULSION ACEITE EN AGUA', 'Fluido heterogéneo por dispersión de finos glóbulos de un líquido orgánico \r\ncon activo, en fase continua en agua.'),
('GL', 'GEL EMULSIONABLE', 'Formulación gelatinizada para ser aplicada como una emulsión en agua.'),
('GW', 'GEL SOLUBLE', 'Formulación gelatinizada para ser aplicada como solución acuosa.'),
('KK', 'COMBI-PAK Sólido - Líquido', 'Una formulación sólida y una líquida, contenidas separadamente en un mismo envase exterior, para aplicación simultánea en una mezcla de tanque.'),
('KL', 'COMBI-PAK Líquido - Líquido', 'Dos formulaciones líquidas contenidas separadamente en un mismo envase exterior, para aplicación simultánea en una mezcla de tanque.'),
('ME', 'MICROEMULSION', 'Líquido claro a opalescente, conteniendo aceite y agua, para ser aplicado \r\ndirectamente o diluido en agua, pudiendo formar una microemulsión diluida \r\no una emulsión convencional.\r\n'),
('PC', 'GEL O PASTA CONCENTRADA', 'Fórmula sólida para ser aplicada como gel o pasta luego de su dilución en agua.'),
('SC', 'SUSPENSION CONCENTRADA', 'Líquido con el activo en suspensión estable, para aplicar diluido en agua.'),
('SE', 'SUSPO-EMULSION', 'Formulación heterogénea fluida consistente de una dispersión estable de sustancias activas en la forma de partículas sólidas y glóbulos finos en una fase acuosa continua'),
('SG', 'GRANULADO SOLUBLE', 'Gránulos para aplicación luego de la disolución de la(s) sustancia(s) \r\nactiva(s) en agua, en forma de solución verdadera, pudiendo, sin embargo, \r\ncontener auxiliares de formulación insolubles.\r\n'),
('SL', 'CONCENTRADO SOLUBLE', 'Líquido homogéneo que, al ser diluido en agua, forma una emulsión \r\nverdadera del activo, pudiendo contener auxiliares de formulación \r\ninsolubles'),
('SP', 'POLVO SOLUBLE', 'Polvo para aplicación luego de la dilución de la(s) sustancia(s) activa(s) en \r\nagua, en forma de solución verdadera, pudiendo contener auxiliares de \r\nformulación insolubles.'),
('ST', 'TABLETAS SOLUBLES', 'Formulación en forma de tabletas para ser usadas individualmente para formar una solución del ingrediente activo después de su desintegración en agua. La formulación puede contener auxiliares de formulación insolubles'),
('TB', 'TABLETAS', 'Producto sólido en forma de tabletas pequeñas, para aplicar en forma \r\ndirecta luego de su disolución o dispersión en agua.\r\n'),
('TC', 'ACTIVO GRADO TECNICO ', 'Sustancia biológicamente activa obtenida directamente de las materias primas, \r\npor un proceso de manufactura (químico, físico o biológico), cuya composición \r\ncontiene porcentajes definidos de ingrediente activo puro, impurezas y \r\naditivos'),
('TK', 'TECNICO CONCENTRADO', 'Pre-mezcla de sustancia activa grado técnico y auxiliares de formulación, \r\nutilizada únicamente para la preparación de productos formulados.'),
('WG', 'GRANULADO DISPERSABLE', 'Gránulos para aplicación en forma de suspensión, luego de su desintegración y dispersión en agua.'),
('WP', 'POLVO MOJABLE', 'Polvo para aplicar como suspensión, luego de ser dispersado en agua.'),
('WT', 'TABLETAS DISPERSABLES', 'Formulación en forma de tabletas para ser usadas individualmente para formar una suspensión del ingrediente activo después de su desintegración en agua.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomuestra`
--

CREATE TABLE `tipomuestra` (
  `idTipoDeMuestra` tinyint(3) NOT NULL,
  `Tipo` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipomuestra`
--

INSERT INTO `tipomuestra` (`idTipoDeMuestra`, `Tipo`) VALUES
(1, 'Comercial'),
(2, 'Experimental'),
(3, 'Estándar comercial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idEmpleado` char(6) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Nombres` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Apellidos` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `CorreoElectronico` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Rol` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idEmpleado`, `Nombres`, `Apellidos`, `password`, `CorreoElectronico`, `Rol`) VALUES
('GKXOK', 'Vianey', 'Urias', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'Vianey.Urias@bayer.mx', 'Empleado Normal'),
('MEAIM', 'Miguel', 'Reyes', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'Miguel.Reyes@bayer.mx', 'Empleado Normal'),
('MEZJI', 'Eduwigis', 'Jimenez', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'Eduwigis.Jimenez@bayer.mx', 'Administrador'),
('PRUEBA', 'Pruebas', 'Bayer', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'pruebas@gmail.com', 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`idAlerta`);

--
-- Indices de la tabla `contenedores`
--
ALTER TABLE `contenedores`
  ADD PRIMARY KEY (`idContenedor`);

--
-- Indices de la tabla `estadomuestra`
--
ALTER TABLE `estadomuestra`
  ADD PRIMARY KEY (`Status`);

--
-- Indices de la tabla `manipulan`
--
ALTER TABLE `manipulan`
  ADD PRIMARY KEY (`idMuestras_usuarios`),
  ADD KEY `index_idEmpleado` (`idEmpleado`),
  ADD KEY `index_idMuestra` (`idMuestra`);

--
-- Indices de la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD PRIMARY KEY (`idMuestra`),
  ADD KEY `idTipoDeMuestra_index` (`idTipoDeMuestra`),
  ADD KEY `Codigo_index` (`CodigoFormulacion`),
  ADD KEY `Status_index` (`Status`),
  ADD KEY `idContenedor_index` (`idContenedor`);

--
-- Indices de la tabla `tipoformulacion`
--
ALTER TABLE `tipoformulacion`
  ADD PRIMARY KEY (`CodigoFormulacion`);

--
-- Indices de la tabla `tipomuestra`
--
ALTER TABLE `tipomuestra`
  ADD PRIMARY KEY (`idTipoDeMuestra`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idEmpleado`),
  ADD UNIQUE KEY `password` (`password`,`CorreoElectronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alertas`
--
ALTER TABLE `alertas`
  MODIFY `idAlerta` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `contenedores`
--
ALTER TABLE `contenedores`
  MODIFY `idContenedor` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `manipulan`
--
ALTER TABLE `manipulan`
  MODIFY `idMuestras_usuarios` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `idMuestra` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `tipomuestra`
--
ALTER TABLE `tipomuestra`
  MODIFY `idTipoDeMuestra` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `manipulan`
--
ALTER TABLE `manipulan`
  ADD CONSTRAINT `manipulan_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `usuarios` (`idEmpleado`),
  ADD CONSTRAINT `manipulan_ibfk_2` FOREIGN KEY (`idMuestra`) REFERENCES `muestras` (`idMuestra`);

--
-- Filtros para la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD CONSTRAINT `muestras_ibfk_1` FOREIGN KEY (`Status`) REFERENCES `estadomuestra` (`Status`),
  ADD CONSTRAINT `muestras_ibfk_2` FOREIGN KEY (`idTipoDeMuestra`) REFERENCES `tipomuestra` (`idTipoDeMuestra`),
  ADD CONSTRAINT `muestras_ibfk_3` FOREIGN KEY (`CodigoFormulacion`) REFERENCES `tipoformulacion` (`CodigoFormulacion`),
  ADD CONSTRAINT `muestras_ibfk_4` FOREIGN KEY (`idContenedor`) REFERENCES `contenedores` (`idContenedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
