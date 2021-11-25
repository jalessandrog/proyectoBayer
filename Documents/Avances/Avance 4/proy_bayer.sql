use proy_bayer;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DROP TABLE IF EXISTS `alerta1`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER SQL SECURITY DEFINER VIEW `alerta1`  AS SELECT `m`.`NombreMuestra` AS `NombreMuestra`, `m`.`Cantidad` AS `Cantidad`, `a`.`Color` AS `Color`, `a`.`NombreAlerta` AS `NombreAlerta`, to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) AS `Dias_restantes` FROM (`muestras` `m` join `alertas` `a`) WHERE `a`.`Activa` = 1 AND to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) between 0 and (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 1) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 2)) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 3)) AND `m`.`NombreMuestra` in (select `muestras`.`NombreMuestra` from `muestras` where `muestras`.`Activa` = '1') ;


DROP TABLE IF EXISTS `alerta2`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER SQL SECURITY DEFINER VIEW `alerta2`  AS SELECT `m`.`NombreMuestra` AS `NombreMuestra`, `m`.`Cantidad` AS `Cantidad`, `a`.`Color` AS `Color`, `a`.`NombreAlerta` AS `NombreAlerta`, to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) AS `Dias_restantes` FROM (`muestras` `m` join `alertas` `a`) WHERE `a`.`Activa` = 1 AND to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) between (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 1) and (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 2) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 1)) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 3)) AND `m`.`NombreMuestra` in (select `muestras`.`NombreMuestra` from `muestras` where `muestras`.`Activa` = '1') ;


DROP TABLE IF EXISTS `alerta3`;

CREATE ALGORITHM=UNDEFINED DEFINER=CURRENT_USER SQL SECURITY DEFINER VIEW `alerta3`  AS SELECT `m`.`NombreMuestra` AS `NombreMuestra`, `m`.`Cantidad` AS `Cantidad`, `a`.`Color` AS `Color`, `a`.`NombreAlerta` AS `NombreAlerta`, to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) AS `Dias_restantes` FROM (`muestras` `m` join `alertas` `a`) WHERE `a`.`Activa` = 1 AND to_days(`m`.`FechaCaducidad`) - to_days(current_timestamp()) between (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 2) and (select `alertas`.`Condicion` from `alertas` where `alertas`.`idAlerta` = 3) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 1)) AND !(`a`.`idAlerta` in (select `alertas`.`idAlerta` from `alertas` where `alertas`.`idAlerta` = 2)) AND `m`.`NombreMuestra` in (select `muestras`.`NombreMuestra` from `muestras` where `muestras`.`Activa` = '1') ;


ALTER TABLE alertas
  ADD PRIMARY KEY (idAlerta);


ALTER TABLE contenedores
  ADD PRIMARY KEY (idContenedor);


ALTER TABLE manipulan
  ADD PRIMARY KEY (idMuestras_usuarios),
  ADD KEY index_idEmpleado (idEmpleado),
  ADD KEY index_idMuestra (idMuestra);


ALTER TABLE muestras
  ADD PRIMARY KEY (idMuestra),
  ADD KEY idTipoDeMuestra_index (idTipoDeMuestra),
  ADD KEY Codigo_index (CodigoFormulacion),
  ADD KEY idContenedor_index (idContenedor);


ALTER TABLE tipoformulacion
  ADD PRIMARY KEY (CodigoFormulacion);


ALTER TABLE tipomuestra
  ADD PRIMARY KEY (idTipoDeMuestra);


ALTER TABLE usuarios
  ADD PRIMARY KEY (idEmpleado),
  ADD UNIQUE KEY password (password,CorreoElectronico);


ALTER TABLE alertas
  MODIFY idAlerta int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE contenedores
  MODIFY idContenedor int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;


ALTER TABLE manipulan
  MODIFY idMuestras_usuarios int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;


ALTER TABLE muestras
  MODIFY idMuestra int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;


ALTER TABLE tipomuestra
  MODIFY idTipoDeMuestra int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


ALTER TABLE muestras
  ADD CONSTRAINT muestras_ibfk_2 FOREIGN KEY (idTipoDeMuestra) REFERENCES tipomuestra (idTipoDeMuestra),
  ADD CONSTRAINT muestras_ibfk_3 FOREIGN KEY (CodigoFormulacion) REFERENCES tipoformulacion (CodigoFormulacion),
  ADD CONSTRAINT muestras_ibfk_4 FOREIGN KEY (idContenedor) REFERENCES contenedores (idContenedor);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
