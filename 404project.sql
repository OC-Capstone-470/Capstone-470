--
-- PostgreSQL database cluster dump
--

\restrict iKQWFb1hDIuPmaBEbRJgcjhqBlMGfwegF4znC6gT3SGf3L5urzQnwydkL8C8fwI

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:MZNSo2e0pUhGkwYa782K1w==$5WbxZzIK9MSZugbOGRJ9gT4bJVp4kCHk4n79dmNYz/4=:VRwog0Qy9dAoOSS9dr5ob5LvMNWos0U2KrIGFNDwnBQ=';

--
-- User Configurations
--








\unrestrict iKQWFb1hDIuPmaBEbRJgcjhqBlMGfwegF4znC6gT3SGf3L5urzQnwydkL8C8fwI

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict 3fmVTbhGQE1wsGvTZe6TicyCjazaUd1V5HBCCRPH5wkTVkQLMNmyTt13naW0QsY

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

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

--
-- PostgreSQL database dump complete
--

\unrestrict 3fmVTbhGQE1wsGvTZe6TicyCjazaUd1V5HBCCRPH5wkTVkQLMNmyTt13naW0QsY

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict 7bdT5anTTa53S5EFemxzlhJykxZOcQ9zZQ7gI8DeIHmz3pRubpSj29JtLF0WeIA

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

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
-- Name: Login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Login" (
    "employeeID" character varying(255) NOT NULL,
    password character varying(255),
    class character varying(50)
);


ALTER TABLE public."Login" OWNER TO postgres;

--
-- Name: TABLE "Login"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Login" IS 'The Login table, used for authentication during the sign-in process.';


--
-- Data for Name: Login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Login" ("employeeID", password, class) FROM stdin;
testadmin	letmein	admin
testcoordinator	letmein	coordinator
testvolunteer	letmein	volunteer
\.


--
-- Name: Login Login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "Login_pkey" PRIMARY KEY ("employeeID");


--
-- PostgreSQL database dump complete
--

\unrestrict 7bdT5anTTa53S5EFemxzlhJykxZOcQ9zZQ7gI8DeIHmz3pRubpSj29JtLF0WeIA

--
-- PostgreSQL database cluster dump complete
--

