-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2021 a las 09:05:36
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`idAlerta`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alertas`
--
ALTER TABLE `alertas`
  MODIFY `idAlerta` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo de muestra`
--
ALTER TABLE `tipo de muestra`
  MODIFY `idTipoDeMuestra` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
