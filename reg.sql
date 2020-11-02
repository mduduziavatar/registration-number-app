create table towns(
	id serial not null primary key,
	townName text not null,
	startsWith text not null
);

create table registrations(
	id serial not null primary key,
	description varchar not null,
	towns_id int,
	foreign key (towns_id) references towns(id)
);

insert into towns (townName, startsWith) values ('Cape Town', 'CA');
insert into towns (townName, startsWith) values ('Paarl', 'CJ');
insert into towns (townName, startsWith) values ('Bellville', 'CY');