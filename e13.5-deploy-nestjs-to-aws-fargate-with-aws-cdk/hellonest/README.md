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

## Debug AWS DocumentDB connection

Check [Docs How to Connect to DocDb from outside the VPC](https://docs.aws.amazon.com/documentdb/latest/developerguide/connect-from-outside-a-vpc.html?sc_channel=sm&sc_campaign=Support&sc_publisher=TWITTER&sc_country=Global&sc_geo=GLOBAL&sc_outcome=AWS%20Support&trk=Support_TWITTER&sc_content=Support)

example command

```bash
ssh -i "debug-docdb-ec2.pem" -L 27017:dbecc11111-uww709llll1.cluster-12345678.eu-west-1.docdb.amazonaws.com:27017 ubuntu@ec2-18-201-24-187.eu-west-1.compute.amazonaws.com -N
```
