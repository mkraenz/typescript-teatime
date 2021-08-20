# Back-up MongoDB

## Usage

Make sure mongodb is running (locally or in docker with forwarding of port 27017:27017 )
copy and paste the scripts into the terminal from any directory.

## Dump

```sh
DATABASE_NAME="teatime"
DATE=$(date +%F)
FILENAME="./teawars.${DATE}.db.archive"
# forceTableScan to avoid snapshot error on older mongodump version https://dba.stackexchange.com/a/226541
mongodump -h localhost:27017 --db ${DATABASE_NAME} --forceTableScan --gzip --archive=${FILENAME}

# Output: archive file in the current working directory
```

## Restore

Run this from where your archive file is located.

```sh
DATE="2021-08-20" # change this to the date of the backup you want to restore
FILENAME="./teawars.${DATE}.db.archive"
# possibly add --drop to force restore while losing all existing data
mongorestore -vvvvvv -h localhost:27017 --gzip --archive=${FILENAME}

# Output: in the logs you find "Finished restoring teatime.<collection name here> (12 documents)"
```
