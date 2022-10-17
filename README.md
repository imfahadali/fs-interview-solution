# Introduction

- This is an example repository built with type-graphql and typeorm
- There is an API-gateway which all requests are made to and an admin portal bootstrapped with react-admin
- Currently we have a location entity which references a city entity
- You can add and delete these location entities by using the admin-portal frontend

# Challenge

- Your challenge is to add functionality so that we can:
  - Read
  - Update
  - Create
  - Delete
    the city entity from the admin-portal.
- Here are some general guidelines of what is required in each app:
  - Admin portal
    - Follow the format for the countries resource but create a new resource for the city entity
  - Api-gateway
    - Create resolvers for these actions
    - Create services for these resolvers to call

# Setup

1. Clone repo
2. Run yarn install
3. Check package.json for commands used to start each app
4. You can use SQLite which should not require any setup (unless you want a GUI - I recommend “Db browser for SQLite”) but if you wan’t to use MySQL then you can find the docker compose file in the api-gateway repo - you will also need to edit the dataSource.ts file
