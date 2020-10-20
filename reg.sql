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

