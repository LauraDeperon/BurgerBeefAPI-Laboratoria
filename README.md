# Burger Queen - Back-end

## Índice

- [1. Prefácio](#1-prefácio)
- [2. Burger Beef API](#2-Burguer-Beef-API)
- [3. Tecnologias Utilizadas](#3-tecnologias-utilizadas)
- [4. Desenvolvimento](#4-desenvolvimento)

## 1. Prefácio

  A interface front-end da aplicação Burger Queen já foi criado [BurgerBeef](https://github.com/LauraDeperon/BurgerBeef-Laboratoria), e agora criamos o back-end para manejar os dados. Neste caso, foi feito através
  de uma _API rest_ que será compatível com as requisições vindas do front a [BurgerBeefAPI](https://burger-queen-database.herokuapp.com/).

## 2. Burger Beef API

### 2.1 API

A API dispõe dos seguintes endpoints:

#### 2.1.1 `/users`

- `GET /users`
- `GET /users/:uid`
- `POST /users`
- `PUT /users/:uid`
- `DELETE /users/:uid`

#### 2.1.2 `/products`

- `GET /products`
- `GET /products/:productid`
- `POST /products`
- `PUT /products/:productid`
- `DELETE /products/:productid`

#### 2.1.3 `/orders`

- `GET /orders`
- `GET /orders/:orderId`
- `POST /orders`
- `PUT /orders/:orderId`
- `DELETE /orders/:orderId`

#### 2.1.4 `/auth`

- `POST /auth`

## 3. Tecnologias Utilizadas:

* `Node.js`
* `Express`
* `Sequelize`
* `JWT Token`
* `PostgreSQL`
* `Dbeaver (visualizar tabelas do banco de dados e suas relações)`
* `Postman (para teste de requisições)`
* `Heroku (deploy da API)`

## 4. Desenvolvimento

[Laura Deperon](https://github.com/LauraDeperon)