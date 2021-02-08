# exchange-api

#### technologies & features
- express.js
- mikroorm
- postgres as a DB
- prettier + eslint

## how to build and run
```
npm i
npm run build
npm run start
```

## how to dev
```
npm run watch
npm run dev
```

## db
```
docker-compose up -d
```

### api
To log in:
```
/api/auth/login

{
    username: "test",
    password: "test"
}
```

To get quote by date:
```
/api/quotes?date=2021.02.05
```

To receive all quotes:
```
/api/quotes
```

