# STUDENTbook

SQL: 

create table Users (
	userId int identity(1,1) primary key,
	nick varchar(64) not null,
	firstName varchar(64),
	lastName varchar(64),
	email varchar(128) not null,
	password varchar(128) not null,
	createdAt datetime not null,
	lastLogginIn datetime
)

create table Posts (
	postId int identity(1,1) primary key,
	userId int,
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