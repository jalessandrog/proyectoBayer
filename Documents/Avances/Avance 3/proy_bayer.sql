-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2021 a las 08:31:33
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
(12, 'MEAIM', 1, 20.5, 3, '2021-10-06');

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
  `Concentracion` tinyint(3) NOT NULL,
  `Cantidad` float NOT NULL,
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

INSERT INTO `muestras` (`idMuestra`, `NombreMuestra`, `CodigoMuestra`, `SP`, `HojaSeguridad`, `UsoMuestra`, `Lote`, `Concentracion`, `Cantidad`, `FechaIngreso`, `FechaFabricacion`, `FechaCaducidad`, `idTipoDeMuestra`, `CodigoFormulacion`, `Status`, `idContenedor`) VALUES
(1, 'CLAVIS', NULL, 102000012345, 'https://github.com/jalessandrog/proyectoBayer.git', 'Insecticida', '123456', 48, 1000, '2021-10-15 03:03:19', '2021-01-01', '2023-01-01', 1, 'SC', 1, 1),
(2, 'ADENGO\r\n', NULL, NULL, NULL, 'Herbicida', '1', 32, 1000, '2021-10-15 04:27:23', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(4, 'ALIETTE\r\n', NULL, NULL, NULL, 'Fungicida', '2', 80, 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'WG', 1, 1),
(5, 'ALION\r\n', NULL, NULL, NULL, 'Fungicida', '3', 50, 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(8, 'ANTRACOL', NULL, NULL, NULL, 'Fungicida', '4', 70, 1000, '2021-10-17 04:30:53', '2021-01-10', '2023-01-10', 1, 'WP', 1, 2),
(9, 'BELT', NULL, NULL, NULL, 'Fungicida', '5', 48, 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(12, 'CALYPSO', NULL, NULL, NULL, 'Fungicida', '6', 48, 1000, '2021-10-06 19:25:13', '2021-01-10', '2021-10-22', 1, 'SC', 1, 1),
(13, 'CLAVIS', NULL, NULL, NULL, 'Fungicida', '7', 48, 1000, '2021-09-30 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(16, 'CONFIDOR', NULL, NULL, NULL, 'Fungicida', '8', 35, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(17, 'CONSIST MAX', NULL, NULL, NULL, 'Fungicida', '9', 52, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(18, 'CUPRAVIT HYDRO', NULL, NULL, NULL, 'Fungicida', '10', 50, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'WP', 1, 1),
(19, 'CURBIX', NULL, NULL, NULL, 'Fungicida', '11', 20, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(20, 'DECIS FORTE', NULL, NULL, NULL, 'Fungicida', '12', 10, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SE', 1, 1),
(21, 'EMESTO PRIME', NULL, NULL, NULL, 'Tratamiento de Semilla', '13', 24, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SP', 1, 1),
(22, 'FLINT', NULL, NULL, NULL, 'Fungicida', '14', 50, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'WG', 1, 1),
(23, 'FOLICUR', NULL, NULL, NULL, 'Fungicida', '15', 25, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'EW', 1, 1),
(24, 'INFINITO', NULL, NULL, NULL, 'Fungicida', '16', 69, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(25, 'JADE', NULL, NULL, NULL, 'Fungicida', '17', 8, 1000, '2021-10-03 05:00:00', '2021-01-10', '2023-01-10', 1, 'SG', 1, 1),
(26, 'LAUDIS', NULL, NULL, NULL, 'Fungicida', '18', 42, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(27, 'LUNA EXPERIENCE', NULL, NULL, NULL, 'Fungicida', '19', 40, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(28, 'MOVENTO', NULL, NULL, NULL, 'Fungicida', '20', 15, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'DC', 1, 1),
(29, 'NEW LEVERAGE', NULL, NULL, NULL, 'Fungicida', '21', 9, 1000, '2021-10-17 04:31:13', '2021-01-10', '2023-01-10', 1, 'DC', 1, 4),
(30, 'OBERON SPEED', NULL, NULL, NULL, 'Fungicida', '22', 24, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(31, 'OBERON', NULL, NULL, NULL, 'Fungicida', '23', 24, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(32, 'PREVICUR ENERGY', NULL, NULL, NULL, 'Fungicida', '24', 84, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(33, 'PUMA SUPER', NULL, NULL, NULL, 'Fungicida', '25', 7, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'EO', 1, 1),
(34, 'REQUIEM PRIME', NULL, NULL, NULL, 'Fungicida', '26', 16, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'DC', 1, 1),
(35, 'SCALA', NULL, NULL, NULL, 'Fungicida', '27', 60, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SE', 1, 1),
(36, 'SEMEVIN', NULL, NULL, NULL, 'Fungicida', '28', 35, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(37, 'SENCOR', NULL, NULL, NULL, 'Fungicida', '29', 48, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(38, 'SERENADE ASO', NULL, NULL, NULL, 'Fungicida', '30', 14, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(39, 'SERENADE OPTI', NULL, NULL, NULL, 'Fungicida', '31', 26, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'WG', 1, 1),
(40, 'SERENADE SOIL', NULL, NULL, NULL, 'Fungicida', '32', 14, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(41, 'SIGANEX 60 SC', NULL, NULL, NULL, 'Fungicida', '33', 60, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(42, 'SIGMA FORTE', NULL, NULL, NULL, 'Fungicida', '34', 1, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'EC', 1, 1),
(45, 'SIVANTO PRIME', NULL, NULL, NULL, 'Fungicida', '35', 24, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SL', 1, 1),
(46, 'TEGA', NULL, NULL, NULL, 'Fungicida', '36', 50, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(47, 'VERANGO PRIME', NULL, NULL, NULL, 'Nematicida', '37', 50, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 1, 'SC', 1, 1),
(48, 'Sample', '1', 102000012345, NULL, 'Fungicida', '38', 10, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SC', 1, 1),
(49, 'Sample ', '2', 102000012346, NULL, 'Fungicida', '39', 50, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SL', 1, 1),
(50, 'Sample 3', NULL, 102000012347, NULL, 'Fungicida', '40', 35, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SL', 1, 1),
(51, 'Sample 4', NULL, 102000012348, NULL, 'Fungicida', '41', 20, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'WG', 1, 1),
(52, 'Sample 5', NULL, 102000012349, NULL, 'Fungicida', '42', 20, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'WG', 1, 1),
(53, 'Sample 6', NULL, 102000012350, NULL, 'Fungicida', '43', 5, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'WG', 1, 1),
(54, 'Sample 7', NULL, 102000012351, NULL, 'Fungicida', '44', 15, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'CL', 1, 1),
(55, 'Sample 8', NULL, 102000012352, NULL, 'Fungicida', '45', 20, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'CL', 1, 1),
(56, 'Sample 9', NULL, 102000012353, NULL, 'Fungicida', '46', 50, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'EC', 1, 1),
(57, 'Sample 10', NULL, 102000012354, NULL, 'Fungicida', '47', 70, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'DC', 1, 1),
(58, 'Sample 11', NULL, 102000012355, NULL, 'Fungicida', '48', 25, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SC', 1, 1),
(59, 'Sample 12', NULL, 102000012356, NULL, 'Fungicida', '49', 20, 1000, '2021-10-04 05:00:00', '2021-01-10', '2023-01-10', 2, 'SC', 1, 1),
(60, 'Sample 13', NULL, 102000012357, 'https://github.com/jalessandrog/proyectoBayer.git', 'Biológico', '246891', 10, 500, '2021-10-06 05:00:00', '2021-01-01', '2023-01-01', 2, 'SE', 1, 1),
(62, 'Prueba', '', NULL, 'https://github.com/jalessandrog/proyectoBayer.git', 'Nematicida', '555555', 33, 2, '2021-10-15 05:04:37', '2021-10-06', '2024-06-14', 2, 'SP', 1, 1),
(66, 'Prueba 2 Octubre 17', '76158', 102000011111, 'https://github.com/jalessandrog/proyectoBayer.git', 'Biológico', '555599', 23, 2222, '2021-10-17 05:27:34', '2005-10-14', '2030-05-31', 2, 'WG', 1, 6);

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
  MODIFY `idMuestras_usuarios` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `idMuestra` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

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
