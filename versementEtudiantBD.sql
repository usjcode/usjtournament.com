create database if not exists versementEtudiantBD;
use versementEtudiantBD;

drop table if exists versement;
drop table if exists etudiant;

create table if not exists etudiant(
matricule varchar(10) not null,
nom varchar(50) not null,
genre varchar(1) not null default '',
datenaissance date not null,
telephone varchar(10) not null default '0',
email varchar(50) not null default '0',
primary key (matricule)
);

create table if not exists versement(
dateversement date not null,  
matricule varchar(10) not null,
montant int not null,

constraint primary key (dateversement,matricule),
 foreign key (matricule) references etudiant(matricule)
);

insert into etudiant values
('1718L024','SONG','M','2002-04-12','xx','song@gmail.com'),
('1718L005','ONANA','M','1999-05-24','699876540','onana@yahoo.cm'),
('1718L019','LOTCHOUANG','F','2004-09-27','675432345','lotchouang@gmail.cm');

insert into versement values
('2018-10-31','1718L019','250000'),
('2018-10-15','1718L024','650000'),
('2018-11-11','1718L024','30000');