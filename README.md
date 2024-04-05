# Online BookStore
implemented feature-
1. Crud operations for books ,  including attributes like title, author, genre, publication date, price.
2. Search for books by title, author, or genre.
3. Add books to a shopping cart and place an order. View Order History.
4. Add books to a shopping cart and place an order. View Order History.
5. Implement pagination and sorting for book listings.
6. Add a ratings and reviews system for books.
7.Implement user roles (e.g., admin, regular user) with different permissions.
8. Implement JWT-based authentication for user login. And Swagger Docs.

## Using Stack
<ul>
<li>Express JS</li>
<li>No SQL (MongoDB) with mongoose</li>
<li>Docker for Containerize, jwt, swagger</li>
</ul>

### Prerequisites

 Add first Create a .env file , i provide env_example.txt file you can modified it with your mongodb connection. PORT etc

* create .env file
* Must be coonect mondoDB connection String. if run in docker container the must be : mongodb://host.docker.internal:27017/bookstore
### Installation (Docker Build)

A step by step guide that will tell you how to get the development environment up and running.

```
docker image build
$ docker build . -t jobyer/bookstore:v1

check image
$ docker images

Run container
$ docker run -d -p 8081:8080 -v ${pwd}:/bookstore --env-file ./.env jobyer/bookstore:v1

you can change the container name according to your choice

other command:
stop container
$docker stop containerID

remove container
$docker rm containerID

remove image
$docker rmi imageID
```

## All REST APIs Endpoints Documentation In Swagger Docs

you can find all APIs documentation in : http://localhost:8081/api-docs/ 
 Here 8081 is your port of docker conatainer or app running.
