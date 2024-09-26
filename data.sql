create database if not exists escolaAPI;
use escolaAPI;

create table if not exists salasdeaula (
    id int primary key auto_increment,
    descricao varchar(100) not null,
    localizacao varchar(100) not null,
    capacidade int not null,
    removido boolean not null default false
);
