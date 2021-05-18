# STUDENTbook

Model Content Entity Data -> EF Designer from database
SQL:

create table Users (
	userId int identity(1,1) primary key,
	universityId int,
	nick varchar(64) not null,
	firstName varchar(64),
	lastName varchar(64),
	email varchar(128) not null,
	password varchar(128) not null,
	createdAt datetime not null,
	lastLogginIn datetime
	foreign key (universityId) references University(universityId)

)

create table Posts (
	postId int identity(1,1) primary key,
	userId int,
	tag varchar(64),
	content text,
	createdAt datetime,
	editedAt datetime
	foreign key (userId) references Users(userId)
)

create table PostAnswers (
	answerId int identity(1,1) primary key,
	postId int not null,
	userId int not null,
	content text not null,
	createdAt datetime not null,
	editedAt datetime,
	foreign key (userId) references Users(userId),
	foreign key (postId) references Posts(postId)
)

create table University (
	universityId int identity(1,1) primary key,
	name varchar(128),
	city varchar(64)
)