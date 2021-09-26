-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-09-2021 a las 03:10:58
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
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

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
  ADD CONSTRAINT `muestras_ibfk_1` FOREIGN KEY (`Status`) REFERENCES `estadomuestra` (`Status`);

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
