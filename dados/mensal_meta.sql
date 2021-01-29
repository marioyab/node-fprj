CREATE TABLE public.mensal (
  	id integer NOT NULL,
		id_academia integer NOT NULL,  
    ano smallint NOT NULL,
  	pago01 smallint,
  	valor01 varchar(20),
  	pago02 smallint,
  	valor02 varchar(20),
  	pago03 smallint,
  	valor03 varchar(20),
  	pago04 smallint,
  	valor04 varchar(20),
  	pago05 smallint,
  	valor05 varchar(20),
  	pago06 smallint,
  	valor06 varchar(20),
  	pago07 smallint,
  	valor07 varchar(20),
  	pago08 smallint,
  	valor08 varchar(20),
  	pago09 smallint,
  	valor09 varchar(20),
  	pago10 smallint,
  	valor10 varchar(20),
  	pago11 smallint,
  	valor11 varchar(20),
  	pago12 smallint,
  	valor12 varchar(20)
);

create sequence mensalidades_id_seq;

