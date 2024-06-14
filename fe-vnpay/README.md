1. remove .example in .env.example and add value in .env
2. Build docker image: `docker build --tag vn-pay-fe:local .`
3. Run docker image: `docker run -p 3000:3000 --name vn-pay-fe vn-pay-fe:local`