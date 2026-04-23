*** Datos precargados
1. Los Paises participantes seran precargados 
	1.1 La tabla "Pais" tendra los campos Id, Nombre, Abreviatura 
2. Los grupos de la Fase de Grupos seran precargados
	2.1 La tabla "Grupo" tendra los campos Id,Inicial
	2.2 La tabla "GrupoPais" representará que paises conforman cada grupo, los campos seran Id, GrupoId,PaisId
3. Se debe tener en cuenta que los paises anfitriones son 3 Estados Unidos, México y Canadá. 
	3.1 se tendra una tabla de PaisAnfitrion con los  campos Id, Nombre, color, mascota
	3.2 se tendra una tabla de Sedes con los campos Id, EstadioNombre, Ciudad, IdPaisAnfitrion
4. Se tendra una  tabla de Puesto que refiere a las posiciones que ocupan en la cancha los jugadores los campos seran Id, Posicion
4. Se tendra una tabla de SeleccionJugador, cuyos campos seran Id,PaisId, JugadorNombre, numero, PuestoId
5. Los partidos de esta fase se precargan, debe existir una tabla Partido con los campos Id, FechaDeJuego, SedeId, TipoDeDefinicion
	5.1 Existira una tabla PartidoSeleccion con los datos Id, PartidoId, PaisId, Ganador
	5.2 Existira una tabla donde se registren los Goles por partido con los campos Id, IdSelecionJugador, MinutoDelPartido, Comentarios

*** Actualizaciones
6. Tanto la fase de grupo como la fase de eliminación directalos partidos seran cargados a mano por el administrador
7. Los resultados del los partidos cargados seran cargados por el administrador