--
-- PostgreSQL database dump
--

\restrict ysZG5aQ6p8Mk5HfnRLlhGiTCh2QdV5wGkFZlWduQMkVxRWdoaudeZ7E9Ehal4QB

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-10 22:51:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 16918)
-- Name: bilhete; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bilhete (
    id_bilhete integer NOT NULL,
    id_pessoa integer NOT NULL,
    id_evento integer NOT NULL,
    tipo character varying(255) NOT NULL,
    matricula_carro character varying(10),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.bilhete OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16917)
-- Name: bilhete_id_bilhete_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bilhete_id_bilhete_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bilhete_id_bilhete_seq OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 226
-- Name: bilhete_id_bilhete_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bilhete_id_bilhete_seq OWNED BY public.bilhete.id_bilhete;


--
-- TOC entry 225 (class 1259 OID 16899)
-- Name: carro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carro (
    matricula character varying(10) NOT NULL,
    marca character varying(50) NOT NULL,
    modelo character varying(50) NOT NULL,
    ano smallint,
    img_url text,
    id_pessoa integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.carro OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16847)
-- Name: evento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evento (
    id_evento integer NOT NULL,
    nome character varying(150) NOT NULL,
    data date NOT NULL,
    local_evento character varying(255) NOT NULL,
    preco_visitante numeric(8,2),
    preco_participante numeric(8,2),
    limite_participantes integer NOT NULL,
    user_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    descricao text,
    imagem character varying(255)
);


ALTER TABLE public.evento OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16846)
-- Name: evento_id_evento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evento_id_evento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evento_id_evento_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 219
-- Name: evento_id_evento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evento_id_evento_seq OWNED BY public.evento.id_evento;


--
-- TOC entry 229 (class 1259 OID 16947)
-- Name: pagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagamento (
    id_pagamento integer NOT NULL,
    iban character varying(34) NOT NULL,
    preco numeric(8,2) NOT NULL,
    estado boolean NOT NULL,
    id_bilhete integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.pagamento OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16946)
-- Name: pagamento_id_pagamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagamento_id_pagamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagamento_id_pagamento_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 228
-- Name: pagamento_id_pagamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagamento_id_pagamento_seq OWNED BY public.pagamento.id_pagamento;


--
-- TOC entry 224 (class 1259 OID 16880)
-- Name: pessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa (
    id_pessoa integer NOT NULL,
    nif integer,
    nome character varying(100),
    email character varying(100),
    telemovel character varying(15),
    data_nascimento date,
    user_id integer NOT NULL
);


ALTER TABLE public.pessoa OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16879)
-- Name: pessoa_id_pessoa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pessoa_id_pessoa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pessoa_id_pessoa_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 223
-- Name: pessoa_id_pessoa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pessoa_id_pessoa_seq OWNED BY public.pessoa.id_pessoa;


--
-- TOC entry 222 (class 1259 OID 16862)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'cliente'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16861)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4884 (class 2604 OID 16921)
-- Name: bilhete id_bilhete; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilhete ALTER COLUMN id_bilhete SET DEFAULT nextval('public.bilhete_id_bilhete_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 16850)
-- Name: evento id_evento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento ALTER COLUMN id_evento SET DEFAULT nextval('public.evento_id_evento_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 16950)
-- Name: pagamento id_pagamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento ALTER COLUMN id_pagamento SET DEFAULT nextval('public.pagamento_id_pagamento_seq'::regclass);


--
-- TOC entry 4883 (class 2604 OID 16883)
-- Name: pessoa id_pessoa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa ALTER COLUMN id_pessoa SET DEFAULT nextval('public.pessoa_id_pessoa_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 16865)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 5069 (class 0 OID 16918)
-- Dependencies: 227
-- Data for Name: bilhete; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bilhete (id_bilhete, id_pessoa, id_evento, tipo, matricula_carro, "createdAt", "updatedAt") FROM stdin;
3	1	1	participante	AA-11-AA	2026-04-11 20:15:27.314+01	2026-04-11 20:15:27.314+01
4	7	3	visitante	\N	2026-05-09 02:47:39.13+01	2026-05-09 02:47:39.13+01
6	7	1	visitante	\N	2026-05-10 00:23:02.926+01	2026-05-10 00:23:02.926+01
7	7	2	participante	AB-11-23	2026-05-10 00:23:24.874+01	2026-05-10 00:23:24.874+01
\.


--
-- TOC entry 5067 (class 0 OID 16899)
-- Dependencies: 225
-- Data for Name: carro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carro (matricula, marca, modelo, ano, img_url, id_pessoa, "createdAt", "updatedAt") FROM stdin;
BB-22-BB	Audi	RS3	2021	img2.jpg	2	2026-04-11 19:47:25.374+01	2026-04-11 19:47:25.374+01
CC-33-CC	Mercedes	A45 AMG	2022	img3.jpg	2	2026-04-11 19:47:33.145+01	2026-04-11 19:47:33.145+01
AA-11-AA	BMW	M3	2020	img1.jpg	1	2026-04-11 19:46:40.682+01	2026-04-11 19:53:40.174+01
DD-11-DD	BMW	M3	2020	img1.jpg	3	2026-04-11 20:05:46.706+01	2026-04-11 20:05:46.706+01
23-AV-11	Audi	A4	2010	/uploads/images/1778367510125-2V4A8389-removebg-preview.png	7	2026-05-09 23:58:30.149+01	2026-05-09 23:58:30.149+01
AB-11-23	BMW	E38	1996	/uploads/images/1778370699864-IMG_7656-removebg-preview.png	7	2026-05-09 14:46:19.747+01	2026-05-10 00:51:39.929+01
\.


--
-- TOC entry 5062 (class 0 OID 16847)
-- Dependencies: 220
-- Data for Name: evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evento (id_evento, nome, data, local_evento, preco_visitante, preco_participante, limite_participantes, user_id, "createdAt", "updatedAt", descricao, imagem) FROM stdin;
1	Car Meet Porto	2026-10-10	Porto	20.00	10.00	2	2	2026-04-11 19:24:51.473+01	2026-04-11 19:35:39.611+01	\N	\N
2	Drift Night Lisboa	2026-11-15	Lisboa	25.00	15.00	2	3	2026-04-11 19:26:25.686+01	2026-05-09 16:35:45.881+01	\N	\N
3	Classic Cars Braga	2026-12-01	Braga	18.00	8.00	3	4	2026-04-11 19:27:06.947+01	2026-05-10 00:18:10.802+01	Este é um teste de evento e descriçao ..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................	/uploads/images/1778368690715-1.png
\.


--
-- TOC entry 5071 (class 0 OID 16947)
-- Dependencies: 229
-- Data for Name: pagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamento (id_pagamento, iban, preco, estado, id_bilhete, "createdAt", "updatedAt") FROM stdin;
3	PT50000000000000000000000	10.00	t	3	2026-04-11 22:28:16.884+01	2026-04-11 22:28:16.884+01
4	PT50000201231234567890154	18.00	t	4	2026-05-09 02:51:07.659+01	2026-05-09 02:51:07.659+01
5	PT50000201231234567890154	20.00	t	6	2026-05-10 00:23:42.294+01	2026-05-10 00:23:42.294+01
\.


--
-- TOC entry 5066 (class 0 OID 16880)
-- Dependencies: 224
-- Data for Name: pessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pessoa (id_pessoa, nif, nome, email, telemovel, data_nascimento, user_id) FROM stdin;
4	\N	\N	tiago.cli@gmail.com	\N	\N	8
5	\N	\N	luis.cli@gmail.com	\N	\N	9
6	\N	\N	carol.cli@gmail.com	\N	\N	10
7	\N	\N	isa.cli@gmail.com	\N	\N	11
1	\N	João	joao.cli@gmail.com	911111111	2000-01-01	5
2	\N	Rita Simões	rita.cli@gmail.com	987562145	2000-07-12	6
3	\N	Raquel	raquel.cli@gmail.com	968762876	2001-12-06	7
\.


--
-- TOC entry 5064 (class 0 OID 16862)
-- Dependencies: 222
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, role, "createdAt", "updatedAt") FROM stdin;
2	jose.org@gmail.com	$2b$10$0H.cT0sQsj1JSS/wOgmQK.XSoxRxBCkT9q65PggKK6hI0XmBRHi2G	organizador	2026-04-11 19:09:29.973+01	2026-04-11 19:09:29.973+01
3	ana.org@gmail.com	$2b$10$PBy9MBayactnvW3u9phRwOOlzaZmth7mMHibMShxWZl6KC/RzI3XS	organizador	2026-04-11 19:09:50.536+01	2026-04-11 19:09:50.536+01
4	ricardo.org@gmail.com	$2b$10$mU344DoRCNYKOQ5C.bLneOI9Bvpq76tJK2lbKrzHBw0jEeUI0CsX6	organizador	2026-04-11 19:10:03.444+01	2026-04-11 19:10:03.444+01
5	joao.cli@gmail.com	$2b$10$mKtdYrF0lPA3gC2Q.1IymeBDMlEIVykduayQd6rduzEDxMao9ORU2	cliente	2026-04-11 19:11:20.136+01	2026-04-11 19:11:20.136+01
6	rita.cli@gmail.com	$2b$10$4lqYhTdt7zTB0g64lB0rbeGWDgP4/DHURveE2xONeRDDqLcgvhb9G	cliente	2026-04-11 19:11:39.293+01	2026-04-11 19:11:39.293+01
7	raquel.cli@gmail.com	$2b$10$PyJFzdESVxfRAJB6nnXfJOQv2Sc7XDIPgGD3N3RLsy2SCRKjQqkT.	cliente	2026-04-11 19:11:49.637+01	2026-04-11 19:11:49.637+01
8	tiago.cli@gmail.com	$2b$10$hCOFHNoQOznpmj/KAzInP.HQQUgCXC3rHBY4LUJlHPdCHhV6OFoVC	cliente	2026-04-11 19:12:00.975+01	2026-04-11 19:12:00.975+01
9	luis.cli@gmail.com	$2b$10$Xm.d/BgA/3pLxGnBss.Reu8QOMbBk6e7wKFJ1MKiTNYC34FFhLYpy	cliente	2026-04-11 19:12:09.746+01	2026-04-11 19:12:09.746+01
10	carol.cli@gmail.com	$2b$10$xvqTwxMV9gi8sAkTctjOX.Ro5ZuWNsr39pDfCui0MHBIDGYnxdLr.	cliente	2026-04-11 19:12:19.479+01	2026-04-11 19:12:19.479+01
11	isa.cli@gmail.com	$2b$10$mPt/1Ys.oCyTF8aa2iCl8OvQXBdNkfPMKEJD.MD9cI/Sb0uiPkDKS	cliente	2026-04-11 19:12:27.701+01	2026-04-11 19:12:27.701+01
1	admin@gmail.com	$2b$10$eCSCFI8Hdjm9aW7w5jbNFeGDsHvSZU05.O6g0RlLMD/Cfp2mkpT9i	admin	2026-04-11 19:09:23.89+01	2026-05-09 17:02:36.949+01
\.


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 226
-- Name: bilhete_id_bilhete_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bilhete_id_bilhete_seq', 7, true);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 219
-- Name: evento_id_evento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evento_id_evento_seq', 9, true);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 228
-- Name: pagamento_id_pagamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamento_id_pagamento_seq', 5, true);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 223
-- Name: pessoa_id_pessoa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pessoa_id_pessoa_seq', 7, true);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 11, true);


--
-- TOC entry 4903 (class 2606 OID 16930)
-- Name: bilhete bilhete_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilhete
    ADD CONSTRAINT bilhete_pkey PRIMARY KEY (id_bilhete);


--
-- TOC entry 4901 (class 2606 OID 16911)
-- Name: carro carro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carro
    ADD CONSTRAINT carro_pkey PRIMARY KEY (matricula);


--
-- TOC entry 4887 (class 2606 OID 16860)
-- Name: evento evento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evento
    ADD CONSTRAINT evento_pkey PRIMARY KEY (id_evento);


--
-- TOC entry 4905 (class 2606 OID 16961)
-- Name: pagamento pagamento_id_bilhete_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_id_bilhete_key UNIQUE (id_bilhete);


--
-- TOC entry 4907 (class 2606 OID 16959)
-- Name: pagamento pagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_pkey PRIMARY KEY (id_pagamento);


--
-- TOC entry 4893 (class 2606 OID 16891)
-- Name: pessoa pessoa_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_email_key UNIQUE (email);


--
-- TOC entry 4895 (class 2606 OID 16889)
-- Name: pessoa pessoa_nif_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_nif_key UNIQUE (nif);


--
-- TOC entry 4897 (class 2606 OID 16887)
-- Name: pessoa pessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id_pessoa);


--
-- TOC entry 4899 (class 2606 OID 16893)
-- Name: pessoa pessoa_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_user_id_key UNIQUE (user_id);


--
-- TOC entry 4889 (class 2606 OID 16878)
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- TOC entry 4891 (class 2606 OID 16876)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 4910 (class 2606 OID 16936)
-- Name: bilhete bilhete_id_evento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilhete
    ADD CONSTRAINT bilhete_id_evento_fkey FOREIGN KEY (id_evento) REFERENCES public.evento(id_evento) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4911 (class 2606 OID 16931)
-- Name: bilhete bilhete_id_pessoa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilhete
    ADD CONSTRAINT bilhete_id_pessoa_fkey FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id_pessoa) ON UPDATE CASCADE;


--
-- TOC entry 4912 (class 2606 OID 16941)
-- Name: bilhete bilhete_matricula_carro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilhete
    ADD CONSTRAINT bilhete_matricula_carro_fkey FOREIGN KEY (matricula_carro) REFERENCES public.carro(matricula) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4909 (class 2606 OID 16912)
-- Name: carro carro_id_pessoa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carro
    ADD CONSTRAINT carro_id_pessoa_fkey FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id_pessoa) ON UPDATE CASCADE;


--
-- TOC entry 4913 (class 2606 OID 16962)
-- Name: pagamento pagamento_id_bilhete_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_id_bilhete_fkey FOREIGN KEY (id_bilhete) REFERENCES public.bilhete(id_bilhete) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4908 (class 2606 OID 16894)
-- Name: pessoa pessoa_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-05-10 22:51:21

--
-- PostgreSQL database dump complete
--

\unrestrict ysZG5aQ6p8Mk5HfnRLlhGiTCh2QdV5wGkFZlWduQMkVxRWdoaudeZ7E9Ehal4QB

