# Sistema de Usuarios y Roles con NestJS

Sistema de autenticación y autorización con JWT, TypeORM y PostgreSQL.

## Características

- Autenticación JWT con Passport
- Autorización por roles
- Guards y decoradores personalizados
- Endpoints protegidos
- Validaciones con class-validator
- Hash de contraseñas con bcrypt
- Base de datos PostgreSQL

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=parcialfinal
JWT_SECRET=mi-clave-secreta-jwt-2025
PORT=3000
```

## Iniciar

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Base de Datos

Crear base de datos:
```sql
CREATE DATABASE parcialfinal;
```

Inicializar roles:
```bash
psql -U postgres -d parcialfinal -f init-roles.sql
```

## API

### Autenticación (público)
- `POST /auth/register` - Registro
- `POST /auth/login` - Login

### Usuarios (protegido)
- `POST /users` - Crear (admin)
- `GET /users` - Listar (admin, user)
- `GET /users/:id` - Ver (admin, user)
- `PATCH /users/:id` - Actualizar (admin)
- `DELETE /users/:id` - Eliminar (admin)

### Roles (protegido)
- `POST /roles` - Crear (admin)
- `GET /roles` - Listar (admin, user)
- `GET /roles/:id` - Ver (admin, user)
- `PATCH /roles/:id` - Actualizar (admin)
- `DELETE /roles/:id` - Eliminar (admin)

## Uso

Registro:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456","name":"Test"}'
```

Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

Usar token:
```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer <token>"
```

## Tecnologías

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Passport JWT
- bcrypt


```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
