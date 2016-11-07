# Crea un schema "inf236"
CREATE database inf236;

# Define al schema "inf236" como activo
USE inf236;


# Generadores de tablas
CREATE TABLE perfiles_eda
(
	id_perfil INT,
	nombre_perfil VARCHAR(20),
	descripcion VARCHAR(200),
	PRIMARY KEY(id_perfil)
);

CREATE TABLE usuarios
(
	rut VARCHAR(20),
	rol VARCHAR(20),
	id_perfil_usuario INT DEFAULT 0, -- Cuando es 0, no se ha contestado la encuesta
	nombre VARCHAR(50),
	#fecha VARCHAR(20),
	#paralelo VARCHAR(10),
	#tipo INT,
	email VARCHAR(50),
	password VARCHAR(30),
	es_moderador BOOLEAN DEFAULT false,
	es_administrador BOOLEAN DEFAULT false,
	PRIMARY KEY(rut),
	FOREIGN KEY(id_perfil_usuario) REFERENCES perfiles_eda(id_perfil) ON DELETE CASCADE
);
create table filtro
(
	id_filtro integer, 
	rut varchar(20),
    nombre varchar(20), 
    criterio varchar(20), 
    PRIMARY KEY(id_filtro), 
    FOREIGN KEY(rut) REFERENCES usuarios(rut) ON DELETE CASCADE
    );
    
CREATE TABLE contenido
(
	id_contenido INT,
	link VARCHAR(50),
	PRIMARY KEY(id_contenido)
);

CREATE TABLE vistas
(
	id_vista INT,
	id_perfil_vista INT,
	link VARCHAR(50),
	PRIMARY KEY(id_vista),
	FOREIGN KEY (id_perfil_vista) REFERENCES perfiles_eda(id_perfil) ON DELETE CASCADE
);

CREATE TABLE asignaciones
(
	id_contenido_asignacion INT,
	id_vista_asignacion INT,
	FOREIGN KEY(id_contenido_asignacion) REFERENCES contenido(id_contenido) ON DELETE CASCADE,
	FOREIGN KEY(id_vista_asignacion) REFERENCES vistas(id_vista) ON DELETE CASCADE
);

# Inserciones base
# perfiles_eda: id_perfil, nombre_perfil, descripcion
INSERT INTO perfiles_eda VALUES (0, "NULL", "NULL");
INSERT INTO perfiles_eda VALUES (1, "Convergente", "dar un uso práctico a la teoría.");
INSERT INTO perfiles_eda VALUES (2, "Adaptador", "aprender de la experiencia y la ejecución.");
INSERT INTO perfiles_eda VALUES (3, "Asimilador", "organizar la información de forma lógica y concisa.");
INSERT INTO perfiles_eda VALUES (4, "Divergente", "percibir situaciones desde distintas fuentes y perspectivas.");

# usuarios: rut, rol, id_perfil_usuario, nombre, email, password, es_moderador, es_administrador
INSERT INTO usuarios VALUES (1, 1, DEFAULT, "a", "a@a.a", "a", DEFAULT, DEFAULT);

/*
# Regeneracion de la BD
DROP TABLE asignaciones;
DROP TABLE vistas;
DROP TABLE contenido;
DROP TABLE usuarios;
DROP TABLE perfiles_eda;
*/

