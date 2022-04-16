# back-end-task
# Blogging

### Requirements:

1. RESTfull web service working with JSON data in node.js using express and postgresql
2. two types of **users**: **bloggers** and **admins**
3. authentication with name/email and password, with sign-up and sign-in for **bloggers**, but only sign-in for **admins**
4. **bloggers** can create **posts**
5. **bloggers** can update and remove their **posts**
6. **bloggers** can publish and hide their **posts**
7. **bloggers** can see their **posts** whether they're public or hidden
8. **bloggers** can see **posts** of other **bloggers** as long as they're public
9. **admins** can do everything **bloggers** can do
10. **admins** can remove any public **post**

Install Node.js (last stable version) https://nodejs.org/en/ 

From the IDE terminal:

1)npm install 

2)to run local : npm run local

http://localhost:8000/

3)Database - PostgreSQL 
   
4)Postman collection and environment is located in docs/postman. Import files in Postman.

5)Docker - (for Windows users - install Docker Desktop https://www.docker.com/products/docker-desktop)

a)to build use command: docker build --tag node-docker .

b)to Run in detached mode use command: docker run -d -p 8000:8000 node-docker ( read more about detached mode https://docs.docker.com/language/nodejs/run-containers/)
to see logs use Docker Desktop

c)to delete containers use command: docker rm $(docker ps -a -q)

d)to delete all images use command: docker rmi $(docker images -q)

