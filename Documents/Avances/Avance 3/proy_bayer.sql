-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2021 a las 19:02:39
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
  `UsoMuestra` enum('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla','Biológico','Nematicida') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Clasificacion` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `contenedores`
--

INSERT INTO `contenedores` (`idContenedor`, `NoContenedor`, `UsoMuestra`, `Clasificacion`) VALUES
(1, 1, 'Fungicida', 'Estante'),
(2, 3, 'Fungicida', 'Estante'),
(3, 5, 'Fungicida', 'Estante'),
(4, 1, 'Herbicida', 'Estante'),
(5, 4, 'Herbicida', 'Estante'),
(6, 5, 'Herbicida', 'Estante'),
(7, 1, 'Insecticida', 'Estante'),
(8, 3, 'Insecticida', 'Estante'),
(9, 5, 'Insecticida', 'Estante'),
(10, 3, 'Nematicida', 'Estante'),
(11, 1, 'Tratamiento de Semilla', 'Estante'),
(12, 2, 'Tratamiento de Semilla', 'Estante'),
(13, 2, 'Biológico', 'Estante'),
(14, 0, 'Biológico', 'Refrigerador');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `idMuestra` tinyint(3) NOT NULL,
  `NombreMuestra` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CodigoMuestra` int(8) DEFAULT NULL,
  `SP` bigint(12) DEFAULT NULL,
  `HojaSeguridad` varchar(800) COLLATE utf8mb4_spanish_ci DEFAULT NULL COMMENT 'url de donde estará guardado el archivo',
  `Lote` mediumint(6) NOT NULL,
  `Concentracion` tinyint(4) NOT NULL,
  `Cantidad` float NOT NULL,
  `FechaIngreso` date NOT NULL,
  `FechaFabricacion` date NOT NULL,
  `FechaCaducidad` date NOT NULL,
  `idTipoDeMuestra` tinyint(3) NOT NULL,
  `Codigo` char(2) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `muestras`
--

INSERT INTO `muestras` (`idMuestra`, `NombreMuestra`, `CodigoMuestra`, `SP`, `HojaSeguridad`, `Lote`, `Concentracion`, `Cantidad`, `FechaIngreso`, `FechaFabricacion`, `FechaCaducidad`, `idTipoDeMuestra`, `Codigo`, `Status`) VALUES
(1, 'CLAVIS', NULL, 102000012345, 'https://github.com/jalessandrog/proyectoBayer.git', 123456, 48, 1000, '2021-08-19', '2021-01-01', '2023-01-01', 1, 'SC', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras_contenedores`
--

CREATE TABLE `muestras_contenedores` (
  `idMuestras_Contenedores` tinyint(3) NOT NULL,
  `idMuestra` tinyint(3) NOT NULL,
  `idContenedor` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
  `Contraseña` varbinary(255) NOT NULL,
  `CorreoElectronico` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Rol` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idEmpleado`, `Nombres`, `Apellidos`, `Contraseña`, `CorreoElectronico`, `Rol`) VALUES
('GKXOK', 'Vianey', 'Urias', 0x4e46dc0969e6621f2d61d2228e3cd91b75cd9edc, 'Vianey.Urias@bayer.mx', 'Empleado Normal'),
('MEAIM', 'Miguel', 'Reyes', 0x4e46dc0969e6621f2d61d2228e3cd91b75cd9edc, 'Miguel.Reyes@bayer.mx', 'Empleado Normal'),
('MEZJI', 'Eduwigis', 'Jimenez', 0x4e46dc0969e6621f2d61d2228e3cd91b75cd9edc, 'Eduwigis.Jimenez@bayer.mx', 'Administrador');

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
  ADD KEY `Codigo_index` (`Codigo`),
  ADD KEY `Status_index` (`Status`);

--
-- Indices de la tabla `muestras_contenedores`
--
ALTER TABLE `muestras_contenedores`
  ADD PRIMARY KEY (`idMuestras_Contenedores`),
  ADD KEY `idMuestra_index` (`idMuestra`),
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
  ADD PRIMARY KEY (`idEmpleado`);

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
  MODIFY `idMuestras_usuarios` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `idMuestra` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `muestras_contenedores`
--
ALTER TABLE `muestras_contenedores`
  MODIFY `idMuestras_Contenedores` tinyint(3) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `muestras_ibfk_3` FOREIGN KEY (`Codigo`) REFERENCES `tipoformulacion` (`CodigoFormulacion`);

--
-- Filtros para la tabla `muestras_contenedores`
--
ALTER TABLE `muestras_contenedores`
  ADD CONSTRAINT `muestras_contenedores_ibfk_1` FOREIGN KEY (`idMuestra`) REFERENCES `muestras` (`idMuestra`),
  ADD CONSTRAINT `muestras_contenedores_ibfk_2` FOREIGN KEY (`idContenedor`) REFERENCES `contenedores` (`idContenedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
