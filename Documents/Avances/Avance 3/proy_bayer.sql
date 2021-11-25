-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2021 a las 21:36:29
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `addMuestra` (IN `NombreMuestra` VARCHAR(100) CHARSET utf8mb4, IN `CodigoMuestra` TINYTEXT CHARSET utf8mb4, IN `SP` BIGINT(12), IN `HojaSeguridad` VARCHAR(800) CHARSET utf8mb4, IN `UsoMuestra` ENUM('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') CHARSET utf8mb4, IN `Lote` VARCHAR(20) CHARSET utf8mb4, IN `Concentracion` FLOAT UNSIGNED, IN `UnidadMedida` ENUM('Litros','Kilogramos','','') CHARSET utf8mb4, IN `Cantidad` FLOAT UNSIGNED, IN `FechaFabricacion` DATE, IN `FechaCaducidad` DATE, IN `idTipoDeMuestra` INT(3), IN `CodigoFormulacion` CHAR(2) CHARSET utf8mb4, IN `Status` ENUM('1','0') CHARSET utf8mb4, IN `idContenedor` INT(3))  INSERT INTO muestras (NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor) 
VALUES (NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addTipoMuestra` (IN `Tipo` VARCHAR(50) CHARSET utf8mb4)  INSERT INTO tipomuestra (Tipo)
VALUES (Tipo)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteMuestra` (IN `m_idMuestra` INT(3))  DELETE FROM muestras WHERE muestras.idMuestra = m_idMuestra$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `retirar` (IN `idMuestra_i` INT(3), IN `idUsuario_i` CHAR(6), IN `descarga` FLOAT)  BEGIN
DECLARE restante FLOAT DEFAULT 0.0;
UPDATE muestras SET Cantidad = Cantidad-descarga WHERE idMuestra = idMuestra_i;
SELECT Cantidad INTO restante FROM muestras WHERE idMuestra = idMuestra_i;
INSERT INTO manipulan (idMuestra,idEmpleado,Sobrante,Descarga,FechaDeUso) VALUES (idMuestra_i,idUsuario_i,restante,descarga,NOW());
IF restante <= 0 THEN 
UPDATE muestras SET muestras.Status = 0 WHERE idMuestra = idMuestra_i;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAlerta` (IN `a_idAlerta` INT(3), IN `a_NombreAlerta` VARCHAR(60) CHARSET utf8mb4, IN `a_Color` ENUM('Rojo','Amarillo','Naranja','Azul') CHARSET utf8mb4, IN `a_Condicion` INT(5))  BEGIN

UPDATE alertas SET alertas.NombreAlerta = a_NombreAlerta, alertas.Color = a_Color, alertas.Condicion = a_Condicion WHERE alertas.idAlerta = a_idAlerta;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateMuestra` (IN `m_idMuestra` INT(3), IN `m_NombreMuestra` VARCHAR(100) CHARSET utf8mb4, IN `m_CodigoMuestra` TINYTEXT CHARSET utf8mb4, IN `m_SP` BIGINT(12), IN `m_HojaSeguridad` VARCHAR(800) CHARSET utf8mb4, IN `m_UsoMuestra` ENUM('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') CHARSET utf8mb4, IN `m_Lote` VARCHAR(20) CHARSET utf8mb4, IN `m_Concentracion` FLOAT(2) UNSIGNED, IN `m_UnidadMedida` ENUM('Litros','Kilogramos') CHARSET utf8mb4, IN `m_Cantidad` FLOAT(2) UNSIGNED, IN `m_FechaFabricacion` DATE, IN `m_FechaCaducidad` DATE, IN `m_idTipoDeMuestra` INT(3), IN `m_CodigoFormulacion` CHAR(2) CHARSET utf8mb4, IN `m_Status` ENUM('1','0') CHARSET utf8mb4, IN `m_idContenedor` INT(3))  BEGIN

UPDATE muestras SET muestras.NombreMuestra = m_NombreMuestra, muestras.CodigoMuestra = m_CodigoMuestra, muestras.SP = m_SP, muestras.HojaSeguridad = m_HojaSeguridad, muestras.UsoMuestra = m_UsoMuestra, muestras.Lote = m_Lote, muestras.Concentracion = m_Concentracion, muestras.UnidadMedida = m_UnidadMedida, muestras.Cantidad = m_Cantidad, muestras.FechaFabricacion = m_FechaFabricacion, muestras.FechaCaducidad = m_FechaCaducidad, muestras.idTipoDeMuestra = m_idTipoDeMuestra, muestras.CodigoFormulacion = m_CodigoFormulacion, muestras.Status = m_Status, muestras.idContenedor = m_idContenedor WHERE muestras.idMuestra = m_idMuestra;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateMuestraSinHoja` (IN `m_idMuestra` INT(3), IN `m_NombreMuestra` VARCHAR(100) CHARSET utf8mb4, IN `m_CodigoMuestra` TINYTEXT CHARSET utf8mb4, IN `m_SP` BIGINT(12), IN `m_UsoMuestra` ENUM('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') CHARSET utf8mb4, IN `m_Lote` VARCHAR(20) CHARSET utf8mb4, IN `m_Concentracion` FLOAT(2) UNSIGNED, IN `m_UnidadMedida` ENUM('Litros','Kilogramos') CHARSET utf8mb4, IN `m_Cantidad` FLOAT(2) UNSIGNED, IN `m_FechaFabricacion` DATE, IN `m_FechaCaducidad` DATE, IN `m_idTipoDeMuestra` INT(3), IN `m_CodigoFormulacion` CHAR(2) CHARSET utf8mb4, IN `m_Status` ENUM('1','0') CHARSET utf8mb4, IN `m_idContenedor` INT(3))  BEGIN

UPDATE muestras SET muestras.NombreMuestra = m_NombreMuestra, muestras.CodigoMuestra = m_CodigoMuestra, muestras.SP = m_SP,  muestras.UsoMuestra = m_UsoMuestra, muestras.Lote = m_Lote, muestras.Concentracion = m_Concentracion, muestras.UnidadMedida = m_UnidadMedida, muestras.Cantidad = m_Cantidad, muestras.FechaFabricacion = m_FechaFabricacion, muestras.FechaCaducidad = m_FechaCaducidad, muestras.idTipoDeMuestra = m_idTipoDeMuestra, muestras.CodigoFormulacion = m_CodigoFormulacion, muestras.Status = m_Status, muestras.idContenedor = m_idContenedor WHERE muestras.idMuestra = m_idMuestra;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `alerta1`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `alerta1` (
`NombreMuestra` varchar(100)
,`Cantidad` float unsigned
,`Color` enum('Rojo','Amarillo','Naranja','Azul','Verde')
,`NombreAlerta` varchar(60)
,`Dias_restantes` int(7)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `alerta2`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `alerta2` (
`NombreMuestra` varchar(100)
,`Cantidad` float unsigned
,`Color` enum('Rojo','Amarillo','Naranja','Azul','Verde')
,`NombreAlerta` varchar(60)
,`Dias_restantes` int(7)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `alerta3`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `alerta3` (
`NombreMuestra` varchar(100)
,`Cantidad` float unsigned
,`Color` enum('Rojo','Amarillo','Naranja','Azul','Verde')
,`NombreAlerta` varchar(60)
,`Dias_restantes` int(7)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `idAlerta` int(3) NOT NULL,
  `NombreAlerta` varchar(60) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Color` enum('Rojo','Amarillo','Naranja','Azul','Verde') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Condicion` int(5) NOT NULL,
  `Activa` enum('1','0') COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '1' COMMENT '''1'' = True, ''0''=False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `alertas`
--

INSERT INTO `alertas` (`idAlerta`, `NombreAlerta`, `Color`, `Condicion`, `Activa`) VALUES
(1, 'Proxima a Caducar (30 días)', 'Rojo', 30, '1'),
(2, 'Próxima a caducar (60 días)', 'Amarillo', 60, '1'),
(3, 'Alerta de prueba desactivada', 'Verde', 120, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenedores`
--

CREATE TABLE `contenedores` (
  `idContenedor` int(3) NOT NULL,
  `NoContenedor` int(3) DEFAULT NULL,
  `Clasificacion` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Activa` enum('1','0') COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '1' COMMENT '''1'' = True, ''0''=False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `contenedores`
--

INSERT INTO `contenedores` (`idContenedor`, `NoContenedor`, `Clasificacion`, `Activa`) VALUES
(1, 1, 'Estante', '1'),
(2, 2, 'Estante', '1'),
(3, 3, 'Estante', '1'),
(4, 4, 'Estante', '1'),
(5, 5, 'Estante', '1'),
(6, NULL, 'Refrigerador', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manipulan`
--

CREATE TABLE `manipulan` (
  `idMuestra` int(3) NOT NULL,
  `idEmpleado` char(6) COLLATE utf8mb4_spanish_ci NOT NULL,
  `idMuestras_usuarios` int(3) NOT NULL,
  `Sobrante` float NOT NULL,
  `Descarga` float NOT NULL,
  `FechaDeUso` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `manipulan`
--

INSERT INTO `manipulan` (`idMuestra`, `idEmpleado`, `idMuestras_usuarios`, `Sobrante`, `Descarga`, `FechaDeUso`) VALUES
(12, 'MEAIM', 1, 20.5, 3, '2021-10-06 00:00:00'),
(1, 'MEAIM', 2, 1900, 100, '2021-10-21 00:00:00'),
(2, 'MEAIM', 3, 0, 1000, '2021-10-21 00:00:00'),
(67, 'MEAIM', 4, 1, 1, '2021-10-21 00:00:00'),
(4, 'MEAIM', 5, 0.5, 1, '2021-11-06 00:00:00'),
(5, 'MEAIM', 6, 0.5, 1, '2021-11-06 00:00:00'),
(4, 'MEAIM', 7, 1.4, 0.1, '2021-11-15 00:00:00'),
(5, 'MEAIM', 8, 1.4, 0.1, '2021-11-15 00:00:00'),
(8, 'MEAIM', 9, 0, 1.5, '2021-11-15 00:00:00'),
(4, 'MEAIM', 10, 1.3, 0.1, '2021-11-15 00:00:00'),
(13, 'MEAIM', 11, 1.3, 0.2, '2021-11-15 00:00:00'),
(4, '5', 12, 0.0999999, 1.2, '2021-11-16 00:00:00'),
(4, '5', 13, 0, 0.1, '2021-11-16 00:00:00'),
(5, '5', 14, 0, 1.4, '2021-11-16 00:00:00'),
(9, '5', 15, 0, 1.5, '2021-11-16 00:00:00'),
(12, '5', 16, 0, 1.5, '2021-11-20 00:00:00'),
(13, '5', 17, 0, 1.3, '2021-11-20 00:00:00'),
(16, '5', 18, 0, 1.5, '2021-11-20 00:00:00'),
(17, '5', 19, 0, 1.5, '2021-11-20 00:00:00'),
(2, '5', 20, 0, 1.5, '2021-11-20 00:00:00'),
(1, '5', 21, 0, 1.5, '2021-11-22 14:12:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `idMuestra` int(3) NOT NULL,
  `NombreMuestra` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CodigoMuestra` tinytext COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `SP` bigint(12) DEFAULT NULL,
  `HojaSeguridad` varchar(800) COLLATE utf8mb4_spanish_ci DEFAULT NULL COMMENT 'url de donde estará guardado el archivo',
  `UsoMuestra` enum('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Lote` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Concentracion` float UNSIGNED NOT NULL,
  `UnidadMedida` enum('Litros','Kilogramos') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Cantidad` float UNSIGNED NOT NULL,
  `FechaIngreso` timestamp NOT NULL DEFAULT current_timestamp(),
  `FechaFabricacion` date NOT NULL,
  `FechaCaducidad` date NOT NULL,
  `idTipoDeMuestra` int(3) NOT NULL,
  `CodigoFormulacion` char(2) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Status` enum('1','0') COLLATE utf8mb4_spanish_ci NOT NULL COMMENT '1 = Activa, 0 = Inactiva',
  `idContenedor` int(3) NOT NULL,
  `Activa` enum('1','0') COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '1' COMMENT '1 = True, 0 = False',
  `Reporte` varchar(1024) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `muestras`
--

INSERT INTO `muestras` (`idMuestra`, `NombreMuestra`, `CodigoMuestra`, `SP`, `HojaSeguridad`, `UsoMuestra`, `Lote`, `Concentracion`, `UnidadMedida`, `Cantidad`, `FechaIngreso`, `FechaFabricacion`, `FechaCaducidad`, `idTipoDeMuestra`, `CodigoFormulacion`, `Status`, `idContenedor`, `Activa`, `Reporte`) VALUES
(1, 'CLAVISSSS', '', NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Tratamiento de Semilla', '1111', 10, 'Litros', 0, '2021-11-03 20:49:27', '2020-08-01', '2021-11-30', 1, 'DC', '', 3, '1', 'dasdasdas'),
(2, 'ADENGO', '', NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Herbicida', '1', 10, 'Kilogramos', 0, '2021-11-03 20:49:27', '2020-08-01', '2021-11-09', 2, 'CL', '0', 1, '0', 'dsadas'),
(4, 'ALIETTE', NULL, NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Insecticida', '2', 11.5, 'Litros', 1, '2021-11-03 20:50:38', '2021-10-30', '2021-12-10', 2, 'SP', '1', 1, '0', 'Caida en gran cantidad'),
(5, 'ALIONNN', NULL, NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Herbicida', '55555', 3, 'Litros', 2, '2021-11-03 20:49:27', '2021-10-30', '2021-12-10', 2, 'CL', '0', 3, '1', 'Como estas mal'),
(8, 'ANTRACOL', NULL, NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Fungicida', '4', 10, 'Kilogramos', 0, '2021-11-03 20:49:27', '2021-10-31', '2021-12-11', 1, 'CS', '1', 2, '1', 'das'),
(9, 'BELT', NULL, NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Fungicida', '5', 10, 'Litros', 0, '2021-11-03 20:49:27', '2021-10-04', '2021-12-11', 1, 'SE', '1', 1, '1', ''),
(12, 'CALYPSO', NULL, NULL, NULL, 'Fungicida', '6', 10, 'Litros', 0, '2021-11-03 20:49:27', '2020-08-01', '2021-11-15', 1, 'SC', '1', 1, '1', 'dawdwa'),
(13, 'CLAVIS', NULL, NULL, '906-Clavis.pdf', 'Fungicida', '7', 48, 'Litros', 0, '2021-11-03 20:49:27', '2021-10-30', '2021-12-10', 1, 'SC', '1', 1, '1', NULL),
(16, 'CONFIDOR', NULL, NULL, NULL, 'Fungicida', '8', 10, 'Litros', 0, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(17, 'CONSIST MAX', NULL, NULL, NULL, 'Fungicida', '9', 10, 'Litros', 0, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', 'sadasdsa'),
(18, 'CUPRAVIT HYDRO', NULL, NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Insecticida', '10', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2021-11-09', '2022-02-05', 1, 'SG', '1', 2, '1', 'dasdas'),
(19, 'CURBIX', NULL, NULL, NULL, 'Fungicida', '11', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', 'ay no'),
(20, 'DECIS FORTE', NULL, NULL, NULL, 'Fungicida', '12', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SE', '1', 1, '1', NULL),
(21, 'EMESTO PRIME', NULL, NULL, NULL, 'Tratamiento de Semilla', '13', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SP', '1', 1, '1', NULL),
(22, 'FLINT', NULL, NULL, NULL, 'Fungicida', '14', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2022-01-06', 1, 'WG', '1', 1, '1', NULL),
(23, 'FOLICUR', NULL, NULL, NULL, 'Fungicida', '15', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'EW', '1', 1, '1', NULL),
(24, 'INFINITO', NULL, NULL, NULL, 'Fungicida', '16', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(25, 'JADE', NULL, NULL, NULL, 'Fungicida', '17', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SG', '1', 1, '1', NULL),
(26, 'LAUDIS', NULL, NULL, NULL, 'Fungicida', '18', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(27, 'LUNA EXPERIENCE', NULL, NULL, NULL, 'Fungicida', '19', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(28, 'MOVENTO', NULL, NULL, NULL, 'Fungicida', '20', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'DC', '1', 1, '1', NULL),
(29, 'NEW LEVERAGE', NULL, NULL, NULL, 'Fungicida', '21', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'DC', '1', 4, '1', NULL),
(30, 'OBERON SPEED', NULL, NULL, NULL, 'Fungicida', '22', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-02-02', 1, 'SC', '1', 1, '1', NULL),
(31, 'OBERON', NULL, NULL, NULL, 'Fungicida', '23', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(32, 'PREVICUR ENERGY', NULL, NULL, NULL, 'Fungicida', '24', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(33, 'PUMA SUPER', NULL, NULL, NULL, 'Fungicida', '25', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'EO', '1', 1, '1', NULL),
(34, 'REQUIEM PRIME', NULL, NULL, NULL, 'Fungicida', '26', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'DC', '1', 1, '1', NULL),
(35, 'SCALA', NULL, NULL, NULL, 'Fungicida', '27', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SE', '1', 1, '1', NULL),
(36, 'SEMEVIN', NULL, NULL, NULL, 'Fungicida', '28', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(37, 'SENCOR', NULL, NULL, NULL, 'Fungicida', '29', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(38, 'SERENADE ASO', NULL, NULL, NULL, 'Fungicida', '30', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(39, 'SERENADE OPTI', NULL, NULL, NULL, 'Fungicida', '31', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'WG', '1', 1, '1', NULL),
(40, 'SERENADE SOIL', NULL, NULL, NULL, 'Fungicida', '32', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(41, 'SIGANEX 60 SC', NULL, NULL, NULL, 'Fungicida', '33', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(42, 'SIGMA FORTE', NULL, NULL, NULL, 'Fungicida', '34', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'EC', '1', 1, '1', NULL),
(45, 'SIVANTO PRIME', NULL, NULL, NULL, 'Fungicida', '35', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SL', '1', 1, '1', NULL),
(46, 'TEGA', NULL, NULL, NULL, 'Fungicida', '36', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(47, 'VERANGO PRIME', NULL, NULL, NULL, 'Nematicida', '37', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 1, 'SC', '1', 1, '1', NULL),
(48, 'Sample', '1', 102000012345, NULL, 'Fungicida', '38', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'SC', '1', 1, '1', NULL),
(49, 'Sample ', '2', 102000012346, NULL, 'Fungicida', '39', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'SL', '1', 1, '1', NULL),
(50, 'Sample 3', NULL, 102000012347, NULL, 'Fungicida', '40', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'SL', '1', 1, '1', NULL),
(51, 'Sample 4', NULL, 102000012348, NULL, 'Fungicida', '41', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'WG', '1', 1, '1', NULL),
(52, 'Sample 5', NULL, 102000012349, NULL, 'Fungicida', '42', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'WG', '1', 1, '1', NULL),
(53, 'Sample 6', NULL, 102000012350, NULL, 'Fungicida', '43', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'WG', '1', 1, '1', NULL),
(54, 'Sample 7', NULL, 102000012351, NULL, 'Fungicida', '44', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'CL', '1', 1, '1', NULL),
(55, 'Sample 8', NULL, 102000012352, NULL, 'Fungicida', '45', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'CL', '1', 1, '1', NULL),
(56, 'Sample 9', NULL, 102000012353, NULL, 'Fungicida', '46', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'EC', '1', 1, '1', NULL),
(57, 'Sample 10', NULL, 102000012354, NULL, 'Fungicida', '47', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'DC', '1', 1, '1', NULL),
(58, 'Sample 11', NULL, 102000012355, NULL, 'Fungicida', '48', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'SC', '1', 1, '1', NULL),
(59, 'Sample 12', NULL, 102000012356, NULL, 'Fungicida', '49', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'SC', '1', 1, '1', NULL),
(60, 'Sample 13', NULL, 102000012357, 'https://github.com/jalessandrog/proyectoBayer.git', 'Biológico', '246891', 10, 'Litros', 1.5, '2021-11-03 20:49:27', '2020-08-01', '2023-11-01', 2, 'SE', '1', 1, '1', NULL),
(84, 'Prueba de status', '76158', NULL, '', 'Insecticida', '124578', 32.66, 'Litros', 11.3, '2021-11-22 05:07:19', '2021-11-06', '2021-12-09', 1, 'BR', '0', 1, '1', 'Prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoformulacion`
--

CREATE TABLE `tipoformulacion` (
  `CodigoFormulacion` char(2) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Formulacion` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `DescripcionFormulacion` longtext COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Activa` enum('1','0') COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '1' COMMENT '''1'' = True, ''0''=False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipoformulacion`
--

INSERT INTO `tipoformulacion` (`CodigoFormulacion`, `Formulacion`, `DescripcionFormulacion`, `Activa`) VALUES
('BR', 'BRIQUETAS', 'Bloques sólidos, diseñados para la liberación lenta del activo en el agua', '1'),
('CL', 'LIQUIDO O GEL DE CONTACTO', 'Formulación rodenticida o insecticida en la forma de un líquido/gel, para aplicación directa o después de dilución en caso de gel.', '1'),
('CS', 'SUSPENSION DE ENCAPSULADO', 'Suspensión estable de cápsulas conteniendo sustancia(s) activa(s), en \r\nlíquido, para aplicar diluida en agua.', '1'),
('DC', 'CONCENTRADO DISPERSABLE', 'Líquido homogéneo para ser aplicado como dispersión, luego de ser diluido en agua.', '1'),
('EC', 'CONCENTRADO EMULSIONABLE', 'Líquido homogéneo para ser aplicado como emulsión, luego de ser diluido \r\nen agua.', '1'),
('EG', 'GRANULOS EMULSIONABLES', 'Formulación granular para ser aplicada como emulsión aceite en agua del \r\ningrediente activo, después de la desintegración en agua, pudiendo \r\ncontener auxiliares de formulación insolubles.', '1'),
('EO', 'EMULSION AGUA EN ACEITE', 'Fluido heterogéneo por dispersión de finos glóbulos de agua con activo en \r\nfase continua en un líquido orgánico.\r\n', '1'),
('EW', 'EMULSION ACEITE EN AGUA', 'Fluido heterogéneo por dispersión de finos glóbulos de un líquido orgánico \r\ncon activo, en fase continua en agua.', '1'),
('GL', 'GEL EMULSIONABLE', 'Formulación gelatinizada para ser aplicada como una emulsión en agua.', '1'),
('GW', 'GEL SOLUBLE', 'Formulación gelatinizada para ser aplicada como solución acuosa.', '1'),
('KK', 'COMBI-PAK Sólido - Líquido', 'Una formulación sólida y una líquida, contenidas separadamente en un mismo envase exterior, para aplicación simultánea en una mezcla de tanque.', '1'),
('KL', 'COMBI-PAK Líquido - Líquido', 'Dos formulaciones líquidas contenidas separadamente en un mismo envase exterior, para aplicación simultánea en una mezcla de tanque.', '1'),
('ME', 'MICROEMULSION', 'Líquido claro a opalescente, conteniendo aceite y agua, para ser aplicado \r\ndirectamente o diluido en agua, pudiendo formar una microemulsión diluida \r\no una emulsión convencional.\r\n', '1'),
('PC', 'GEL O PASTA CONCENTRADA', 'Fórmula sólida para ser aplicada como gel o pasta luego de su dilución en agua.', '1'),
('SC', 'SUSPENSION CONCENTRADA', 'Líquido con el activo en suspensión estable, para aplicar diluido en agua.', '1'),
('SE', 'SUSPO-EMULSION', 'Formulación heterogénea fluida consistente de una dispersión estable de sustancias activas en la forma de partículas sólidas y glóbulos finos en una fase acuosa continua', '1'),
('SG', 'GRANULADO SOLUBLE', 'Gránulos para aplicación luego de la disolución de la(s) sustancia(s) \r\nactiva(s) en agua, en forma de solución verdadera, pudiendo, sin embargo, \r\ncontener auxiliares de formulación insolubles.\r\n', '1'),
('SL', 'CONCENTRADO SOLUBLE', 'Líquido homogéneo que, al ser diluido en agua, forma una emulsión \r\nverdadera del activo, pudiendo contener auxiliares de formulación \r\ninsolubles', '1'),
('SP', 'POLVO SOLUBLE', 'Polvo para aplicación luego de la dilución de la(s) sustancia(s) activa(s) en \r\nagua, en forma de solución verdadera, pudiendo contener auxiliares de \r\nformulación insolubles.', '1'),
('ST', 'TABLETAS SOLUBLES', 'Formulación en forma de tabletas para ser usadas individualmente para formar una solución del ingrediente activo después de su desintegración en agua. La formulación puede contener auxiliares de formulación insolubles', '1'),
('TB', 'TABLETAS', 'Producto sólido en forma de tabletas pequeñas, para aplicar en forma \r\ndirecta luego de su disolución o dispersión en agua.\r\n', '1'),
('TC', 'ACTIVO GRADO TECNICO ', 'Sustancia biológicamente activa obtenida directamente de las materias primas, \r\npor un proceso de manufactura (químico, físico o biológico), cuya composición \r\ncontiene porcentajes definidos de ingrediente activo puro, impurezas y \r\naditivos', '1'),
('TK', 'TECNICO CONCENTRADO', 'Pre-mezcla de sustancia activa grado técnico y auxiliares de formulación, \r\nutilizada únicamente para la preparación de productos formulados.', '1'),
('WG', 'GRANULADO DISPERSABLE', 'Gránulos para aplicación en forma de suspensión, luego de su desintegración y dispersión en agua.', '1'),
('WP', 'POLVO MOJABLE', 'Polvo para aplicar como suspensión, luego de ser dispersado en agua.', '1'),
('WT', 'TABLETAS DISPERSABLES', 'Formulación en forma de tabletas para ser usadas individualmente para formar una suspensión del ingrediente activo después de su desintegración en agua.', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomuestra`
--

CREATE TABLE `tipomuestra` (
  `idTipoDeMuestra` int(3) NOT NULL,
  `Tipo` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Activa` enum('1','0') COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '1' COMMENT '''1'' = True, ''0''=False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipomuestra`
--

INSERT INTO `tipomuestra` (`idTipoDeMuestra`, `Tipo`, `Activa`) VALUES
(1, 'Comercial', '1'),
(2, 'Experimental', '1'),
(3, 'Estándar comercial', '1');

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
  `Rol` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idEmpleado`, `Nombres`, `Apellidos`, `password`, `CorreoElectronico`, `Rol`, `token`, `Status`) VALUES
('1', 'Eduwigis', 'Jimenez', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'Eduwigis.Jimenez@bayer.mx', 'Administrador', '0', 1),
('10', 'Michelita<3', 'daw', '$2a$12$zzU08DplH1Bq89if7khloey5IfyflveVqRaNmk1xmk6Cfw5/k8AV2', 'dwa  ', 'Administrador', NULL, 0),
('11', 'das123', 'daw', '$2a$12$1ViK1wdXwvGacOtYvXup0eAKZTCnEj9cSZctb/KnvYeSFWbYlwQQO', 'dwa', 'Administrador', NULL, 1),
('12', 'Michell', 'Tena Ortega', '$2a$12$5jwLv8b61yGUAw5RsaETFOc1dyIgJP1GPz9QQqqKlob/zatNGdYNG', 'A01700396@bayer.com', 'Administrador', NULL, 1),
('13', 'Michell', 'Tena Ortega', '$2a$12$8qF5foeSztGyl7xHyRHaquY3ExIym8JJs6Cd.QX02.ax77IGn6fUC', 'A01700396@bayer.com', 'Administrador', NULL, 1),
('14', 'Michell', 'Tena Ortega', '$2a$12$qXrausq1hv4BHkGrUKrF4u1KGgtnGsJVfqlBGFgA7vofnqSmVnyYu', 'A01700396@bayer.com', 'Administrador', NULL, 1),
('15', 'Emmanuel', 'Kant', '$2a$12$1eGxJhvCYu4WolcAD23fuO5j3CrjimVRxaUQ1Xgj8pzCdJObZly4.', 'emmanuel@bayer.com', 'Empleado Normal', NULL, 1),
('2', 'Pruebas', 'Bayer', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'pruebas@gmail.com', 'Administrador', '0', 1),
('3', 'Vianey', 'Urias', '$2a$12$sGqSRBC9Q.F2bEcq00Maz.5J6uq9UcVVEz8Lk8ISlVg3C8/wYXPP.', 'Vianey.Urias@bayer.mx', 'Empleado Normal', '0dsadas', 1),
('4', 'Joseph Alessandro', 'García García', '$2a$12$e816GzlyeH5rwA.xIUFzQ.yzQXRs.Zgk7tAyvep2TuxzxoZoxIOYa', 'a01701434@tec.mx', 'Administrador', '4nyxgwngphcgmpx2s35gv', 1),
('5', 'Miguel', 'Reyes', '$2a$12$Me/Yz4LXokqOc3NEqAOuh.wviaax2.hr6/SfdAiNMA8iDeYZWxRHW', 'fernando.to2005@yahoo.com ', 'Administrador', 'aa9sg8hfs1a08owtervgz0i', 1),
('6', 'test', 'asd', 'das', 'dsa', 'das', NULL, 1),
('8', 'test', 'asd', 'dazs', 'dsa', 'das', NULL, 1),
('dasdas', 'dawdawdaw', 'dwadaw', '$2a$12$FYlqmhiaMqxKupXbZ9y1m.Do1DjQhbXeZvaUd0wPcr6lScFQ1Fflm', 'daw@das.com', 'Administrador', NULL, 1),
('PRUEB3', 'PRUEB3', 'PRUEB3', '$2a$12$PRpH6QTV3ZXNCTIpBtgeGu/9rl0AZeuVrCQnOmdArR7yg2tycpKuq', 'PRUEB3@PRUEB3.com', 'Empleado Normal', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura para la vista `alerta1`
--
DROP TABLE IF EXISTS `alerta1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `alerta1`  AS SELECT `m`.`NombreMuestra` AS `NombreMuestra`, `m`.`Cantidad` AS `Cantidad`, `a`.`Color` AS `Color`, `a`.`NombreAlerta` AS `NombreAlerta`, to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) AS `Dias_restantes` FROM (`muestras` `m` join `alertas` `a`) WHERE `a`.`Activa` = 1 AND to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) between 0 and (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 1) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 2)) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 3)) AND `m`.`NombreMuestra` in (select `muestras`.`NombreMuestra` from `muestras` where `muestras`.`Activa` = '1') ;

-- --------------------------------------------------------

--
-- Estructura para la vista `alerta2`
--
DROP TABLE IF EXISTS `alerta2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `alerta2`  AS SELECT `m`.`NombreMuestra` AS `NombreMuestra`, `m`.`Cantidad` AS `Cantidad`, `a`.`Color` AS `Color`, `a`.`NombreAlerta` AS `NombreAlerta`, to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) AS `Dias_restantes` FROM (`muestras` `m` join `alertas` `a`) WHERE `a`.`Activa` = 1 AND to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) between (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 1) and (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 2) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 1)) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 3)) AND `m`.`NombreMuestra` in (select `muestras`.`NombreMuestra` from `muestras` where `muestras`.`Activa` = '1') ;

-- --------------------------------------------------------

--
-- Estructura para la vista `alerta3`
--
DROP TABLE IF EXISTS `alerta3`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `alerta3`  AS SELECT `m`.`NombreMuestra` AS `NombreMuestra`, `m`.`Cantidad` AS `Cantidad`, `a`.`Color` AS `Color`, `a`.`NombreAlerta` AS `NombreAlerta`, to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) AS `Dias_restantes` FROM (`muestras` `m` join `alertas` `a`) WHERE `a`.`Activa` = 1 AND to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) between (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 2) and (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 3) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 1)) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 2)) AND `m`.`NombreMuestra` in (select `muestras`.`NombreMuestra` from `muestras` where `muestras`.`Activa` = '1') ;

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
  MODIFY `idAlerta` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `contenedores`
--
ALTER TABLE `contenedores`
  MODIFY `idContenedor` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `manipulan`
--
ALTER TABLE `manipulan`
  MODIFY `idMuestras_usuarios` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `idMuestra` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `tipomuestra`
--
ALTER TABLE `tipomuestra`
  MODIFY `idTipoDeMuestra` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD CONSTRAINT `muestras_ibfk_2` FOREIGN KEY (`idTipoDeMuestra`) REFERENCES `tipomuestra` (`idTipoDeMuestra`),
  ADD CONSTRAINT `muestras_ibfk_3` FOREIGN KEY (`CodigoFormulacion`) REFERENCES `tipoformulacion` (`CodigoFormulacion`),
  ADD CONSTRAINT `muestras_ibfk_4` FOREIGN KEY (`idContenedor`) REFERENCES `contenedores` (`idContenedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
