# Mongo-cache implementation
* A simple mongo cache module written in Node.js and mongoose using latest es6 syntax.

### HOW TO INITIATE 
```
npm install

```
```
run BE  - npm run start
```
```
Update env and add your mongo details (pushed .env so it can be reused)
```
#### Implementation details.
 * ttl,random string(value) is attached to every new entry in mongo.
 * ttl is updated for a particular key for every get cache Api hit (cache hit)
 * new random string (value) is created if cache's ttl is expired while hitting get cache Api (cache hit) and its saved along with new ttl.
 * if the cache limit is exceeded , code picks the oldest mongo cache entry and updates its key, value, ttl in order to avoid new entry.


#### Cache count exceeded implementation.
 * When an individual tries to create a new cache entry and the cache count (set to 5 for now) has already exceeded , the code picks the oldest cached entry from mongo and updates its key, value, ttl and no new entry is created.


 ### FOLDER STRUCTURE
 ## BE
 * server.js - being the entry point
 * routes -> contains the API routes.
 * controller - contains the main implementation of cache-mongo API's
 * util - contains the utility funcs such as  loggers etc.

### POSTMAN
[link to Postman Collection](https://www.getpostman.com/collections/c7c6081684d88c6e046d)

## Authors
* **Vikrant Sandal** 


