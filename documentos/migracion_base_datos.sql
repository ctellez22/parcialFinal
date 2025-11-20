

\restrict LOc7RPZfgi8eTnloM5B9ltCvJFqUIt4uPj8USIMLWsCCp5qd6dgQK4YfartGZp9



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


CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;




COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;



CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_name character varying NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;



CREATE TABLE public.user_roles (
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;



CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    phone character varying,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;



COPY public.roles (id, role_name, description, created_at) FROM stdin;
a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d	admin	Administrador del sistema con acceso completo	2025-11-20 10:09:04.113402
b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e	user	Usuario estándar con permisos limitados	2025-11-20 10:09:04.113402
c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f	moderator	Moderador con permisos intermedios	2025-11-20 10:09:04.113402
\.




COPY public.user_roles (user_id, role_id) FROM stdin;
d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a	a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d
e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b	a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d
e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b	c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f
f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c	c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f
a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d	b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e
b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e	b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e
c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f	b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e
d0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a	b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e
d0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a	c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f
e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b	b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e
\.




COPY public.users (id, email, password, name, phone, is_active, created_at) FROM stdin;
d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a	admin@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Carlos Administrador	+57 300 111 2233	t	2025-11-20 10:09:04.118507
e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b	maria@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	María García	+57 301 222 3344	t	2025-11-20 10:09:04.118507
f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c	juan@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Juan Pérez	+57 302 333 4455	t	2025-11-20 10:09:04.118507
a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d	ana@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Ana Martínez	+57 303 444 5566	t	2025-11-20 10:09:04.118507
b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e	pedro@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Pedro López	+57 304 555 6677	t	2025-11-20 10:09:04.118507
c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f	laura@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Laura Rodríguez	+57 305 666 7788	f	2025-11-20 10:09:04.118507
d0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a	diego@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Diego Fernández	+57 306 777 8899	t	2025-11-20 10:09:04.118507
e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b	sofia@sistema.com	$2b$10$ZQXYvz8g8YqZJZw5qY5qY.K5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y	Sofía Gómez	+57 307 888 9900	t	2025-11-20 10:09:04.118507
\.




ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY (user_id, role_id);




ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);



ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);




ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);




ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE (role_name);




CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON public.user_roles USING btree (user_id);




CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON public.user_roles USING btree (role_id);



ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;




ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY (role_id) REFERENCES public.roles(id);




\unrestrict LOc7RPZfgi8eTnloM5B9ltCvJFqUIt4uPj8USIMLWsCCp5qd6dgQK4YfartGZp9

