GET
curl -X POST http://localhost:3000/api/proxy -H "Content-Type: application/json" -d '{"url": "https://jsonplaceholder.typicode.com/todos/1", "method": "GET"}'

POST
curl -X POST http://localhost:3000/api/proxy -H "Content-Type: application/json" -d '{"url": "https://jsonplaceholder.typicode.com/posts", "method": "POST", "body": {"title": "foo", "body": "bar", "userId": 1}}'

PUT
curl -X POST http://localhost:3000/api/proxy -H "Content-Type: application/json" -d '{"url": "https://jsonplaceholder.typicode.com/posts/1", "method": "PUT", "body": {"id": 1, "title": "foo", "body": "bar", "userId": 1}}'

DELETE
curl -X POST http://localhost:3000/api/proxy -H "Content-Type: application/json" -d '{"url": "https://jsonplaceholder.typicode.com/posts/1", "method": "DELETE"}'



docker-compose build
docker-compose up -d
docker-compose down

aws configure
--> IAM for id and secret
--> Create ECR repository

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/s4r5j5i1
docker build -t api_serverless .
docker tag api_serverless:latest public.ecr.aws/s4r5j5i1/api_serverless:latest
docker push public.ecr.aws/s4r5j5i1/api_serverless:latest
