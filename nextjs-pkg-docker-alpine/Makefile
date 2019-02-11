build:
	npm run build
	npm run pkg

run:
	npm run start

deploy:
	sudo docker build -t nextjs-pkg-docker-alpine .
	sudo docker run --rm -it \
		-p 3003:3003 \
		-e "PORT=3003" \
		-e "API_URL=https://API_URL.com" \
		nextjs-pkg-docker-alpine
