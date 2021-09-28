-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-09-2021 a las 02:11:28
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
  `Nombre` varchar(60) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Color` varchar(7) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Condición` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `alertas`
--

INSERT INTO `alertas` (`idAlerta`, `Nombre`, `Color`, `Condición`) VALUES
(1, 'Próxima a caducar (30 días)', 'ff0000', 30),
(2, 'Próxima a caducar (60 días)', 'a8bf35', 60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenedores`
--

CREATE TABLE `contenedores` (
  `idContenedor` tinyint(3) NOT NULL,
  `NoBodega` tinyint(3) NOT NULL,
  `UsoMuestra` enum('Fungicida','Insecticida','Herbicida','Tratamiento de Semilla') COLLATE utf8mb4_spanish_ci NOT NULL,
  `Clasificacion` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadomuestra`
--

CREATE TABLE `estadomuestra` (
  `Status` tinyint(1) NOT NULL,
  `Descripción` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
  `NombreMuestra` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `CodigoMuestra` int(8) NOT NULL,
  `SP` bigint(12) NOT NULL,
  `HojaSeguridad` varchar(800) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'url de donde estará guardado el archivo',
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
-- Estructura de tabla para la tabla `tipo de formulación`
--

CREATE TABLE `tipo de formulación` (
  `Código` char(2) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Formulación` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripción` longtext COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipo de formulación`
--

INSERT INTO `tipo de formulación` (`Código`, `Formulación`, `Descripción`) VALUES
('SC', 'SUSPENSION CONCENTRADA', 'Líquido con el activo en suspensión estable, para aplicar diluido en agua.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo de muestra`
--

CREATE TABLE `tipo de muestra` (
  `idTipoDeMuestra` tinyint(3) NOT NULL,
  `Tipo` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipo de muestra`
--

INSERT INTO `tipo de muestra` (`idTipoDeMuestra`, `Tipo`) VALUES
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
-- Indices de la tabla `tipo de formulación`
--
ALTER TABLE `tipo de formulación`
  ADD PRIMARY KEY (`Código`);

--
-- Indices de la tabla `tipo de muestra`
--
ALTER TABLE `tipo de muestra`
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
  MODIFY `idContenedor` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `manipulan`
--
ALTER TABLE `manipulan`
  MODIFY `idMuestras_usuarios` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `idMuestra` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `muestras_contenedores`
--
ALTER TABLE `muestras_contenedores`
  MODIFY `idMuestras_Contenedores` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo de muestra`
--
ALTER TABLE `tipo de muestra`
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
  ADD CONSTRAINT `muestras_ibfk_2` FOREIGN KEY (`idTipoDeMuestra`) REFERENCES `tipo de muestra` (`idTipoDeMuestra`),
  ADD CONSTRAINT `muestras_ibfk_3` FOREIGN KEY (`Codigo`) REFERENCES `tipo de formulación` (`Código`);

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
