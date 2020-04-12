use cinema;
select * from films;
select * from admines;
select * from users;
select * from cinemas;
select * from halls;
select * from cinemashalls;
select * from sessions;


delete from halls where HallsNumber = 'МолодечноРодина1';
delete from sessions where idCinema = 2;
update cinemas set title = 'Родина' where idCinema = 2;

SELECT Sessions.idSessions, Sessions.Date, Sessions.Start, Sessions.End, Sessions.Cost, Sessions.VideoFormat, Sessions.AudioFormat, Films.Title as Film, Halls.HallsNumber, Cinemas.Title as Cinema FROM Sessions
INNER JOIN Films 
ON Sessions.idFilm = Films.idFilms
INNER JOIN Halls
ON Sessions.idHall = Halls.idHall
INNER JOIN cinemashalls
ON Halls.idHall = cinemashalls.idHall
INNER JOIN Cinemas
ON Cinemas.idCinema = cinemashalls.idCinema;


INSERT INTO Sessions (idHall, Date, Start, End, Cost, VideoFormat, AudioFormat, idFilm) 
	VALUES (
		(SELECT halls.idHall AS idHall FROM Cinemas 
	    INNER JOIN CinemasHalls 
	    ON Cinemas.idCinema = CinemasHalls.idCinema
		INNER JOIN Halls ON CinemasHalls.idHall = Halls.idHall
	    WHERE Cinemas.title = 'октябрь' AND Halls.hallsNumber = 'минскокт1'), 
        '2020-10-12', '12:00:00', '14:00:00', '12.5', 'super', 'puper', 2); 


alter table cinemas drop column street;
alter table cinemas drop column HouseNumber;
alter table halls add column HallsNumber varchar(30);

alter table Cinemas change Tile Title varchar(45);

INSERT INTO Cinemas (Title, City, Address, HallsNumber) VALUES ('Октябрь', 'Миснк', 'Независимоти 73', '1');









SELECT distinct Sessions.idSessions,
	   Sessions.Date, 
       Sessions.Start, 
       Sessions.End, 
       Sessions.Cost, 
       Sessions.VideoFormat, 
       Sessions.AudioFormat, 
       Films.Title as Film, 
       Halls.HallsNumber, 
       Cinemas.Title as Cinema 
       FROM Sessions
					   INNER JOIN Films 
					   ON Sessions.idFilm = Films.idFilms
					   INNER JOIN Halls
					   ON Sessions.idHall = Halls.idHall
					   INNER JOIN cinemashalls
					   ON Halls.idHall = cinemashalls.idHall
					   INNER JOIN Cinemas
					   ON Cinemas.idCinema = cinemashalls.idCinema;
                       
                       
SELECT Films.* FROM Films 
			  INNER JOIN Sessions ON Films.idFilms = Sessions.idFilm
			  INNER JOIN Cinemas ON Sessions.idCinema = Cinemas.idCinema
			  WHERE Cinemas.Title = 'родина';                       