/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/8/7 20:02:18                            */
/*==============================================================*/


drop table if exists Administrator;

drop table if exists BlogDetail;

drop table if exists blogCategoryTable;

drop table if exists blogLabelTable;

drop table if exists blogTagsTable;

drop table if exists likeRecord;

/*==============================================================*/
/* Table: Administrator                                         */
/*==============================================================*/
create table Administrator
(
   adminID              varchar(8) not null,
   adminName            varchar(50),
   adminContact         varchar(50) not null,
   adminRoot            bigint not null,
   primary key (adminID)
);

/*==============================================================*/
/* Table: BlogDetail                                            */
/*==============================================================*/
create table BlogDetail
(
   blogID               bigint not null,
   classID              int default 0,
   blogTitle            varchar(50) not null,
   blogAuthor           varchar(50) not null,
   blogEditTIme         datetime,
   blogModifyTime       datetime,
   blogContent          text,
   blogLikeNum          bigint default 0,
   blogPageviews        bigint default 0,
   blogCommentsNum      bigint default 0,
   blogIntroduction     longtext,
   blogCover            longtext,
   blogStar             int not null default 0,
   primary key (blogID)
);

/*==============================================================*/
/* Table: blogCategoryTable                                     */
/*==============================================================*/
create table blogCategoryTable
(
   classID              int not null default 0,
   className            varchar(50),
   primary key (classID)
);

/*==============================================================*/
/* Table: blogLabelTable                                        */
/*==============================================================*/
create table blogLabelTable
(
   corresID             int not null default 0,
   blogID               bigint,
   tagID                int,
   primary key (corresID)
);

/*==============================================================*/
/* Table: blogTagsTable                                         */
/*==============================================================*/
create table blogTagsTable
(
   tagID                int not null,
   tagName              varchar(10) not null,
   primary key (tagID)
);

/*==============================================================*/
/* Table: likeRecord                                            */
/*==============================================================*/
create table likeRecord
(
   recordID             int not null,
   likeIP               varchar(30),
   likeTime             datetime,
   primary key (recordID)
);

alter table BlogDetail add constraint FK_Reference_3 foreign key (classID)
      references blogCategoryTable (classID) on delete restrict on update restrict;

alter table blogLabelTable add constraint FK_Reference_1 foreign key (blogID)
      references BlogDetail (blogID) on delete restrict on update restrict;

alter table blogLabelTable add constraint FK_Reference_2 foreign key (tagID)
      references blogTagsTable (tagID) on delete restrict on update restrict;

