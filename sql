-- EVENTO
CREATE TABLE evento (
    id_evento SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    data DATE NOT NULL,
    local_evento VARCHAR(255) NOT NULL,
    preco_visitante NUMERIC(8,2) CHECK (preco_visitante >= 0),
    preco_participante NUMERIC(8,2) CHECK (preco_participante >= 0)
);

-- CARRO
CREATE TABLE carro (
    matricula VARCHAR(10) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano SMALLINT CHECK (ano > 1900),
    img_url TEXT,
	pessoa_nif INT NOT NULL,
    FOREIGN KEY (pessoa_nif) REFERENCES pessoa(nif)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- PESSOA
CREATE TABLE pessoa (
    nif INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telemovel VARCHAR(15),
    data_nascimento DATE NOT NULL,
);

-- BILHETE
-- UNIQUE (pessoa_nif, id_evento, ano_bilhete) para uma pessoa ter um só bilhete por ano de evento
CREATE TABLE bilhete (
    id_bilhete SERIAL PRIMARY KEY,
    ano_bilhete INTEGER NOT NULL,
    pessoa_nif INTEGER NOT NULL,
    id_evento INTEGER NOT NULL,
	UNIQUE (pessoa_nif, id_evento, ano_bilhete),
    FOREIGN KEY (pessoa_nif) REFERENCES pessoa(nif)
		ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
		ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- PAGAMENTO
CREATE TABLE pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    iban VARCHAR(34) NOT NULL,
    preco NUMERIC(8,2) NOT NULL CHECK (preco >= 0),
    estado BOOLEAN NOT NULL,
    id_bilhete INTEGER UNIQUE,
    FOREIGN KEY (id_bilhete) REFERENCES bilhete(id_bilhete)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- RELAÇÃO EVENTO-PESSOA (participação)
CREATE TABLE evento_pessoa (
    evento_id_evento INTEGER,
    pessoa_nif INTEGER,
    PRIMARY KEY (evento_id_evento, pessoa_nif),
    FOREIGN KEY (evento_id_evento) REFERENCES evento(id_evento)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (pessoa_nif) REFERENCES pessoa(nif)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);