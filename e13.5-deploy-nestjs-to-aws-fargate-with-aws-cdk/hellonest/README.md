# Hellonest

Run within Docker + connect to MongoDb inside another docker container

```bash
docker run -d -p 27017:27017 --name mongo mongo
# docker container start mongo
docker build --no-cache --build-arg 'DATABASE_URL=mongodb://172.17.0.1:27017' -t hellonest .
docker run -d --rm -p 3000:3000 --name hellonest hellonest

# sanity-check: should output NO errors + `info: joined #typescriptteatime`
docker logs hellonest

# cleanup
docker stop hellonest
```
