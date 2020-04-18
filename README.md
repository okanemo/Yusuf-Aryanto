### GETTING STARTED

- `clone this-project`
- `cd this-project`
- `yarn install`

### SETUP .ENV

``
APP_HOST=localhost
APP_PORT=3001
DB_HOST=localhost
DB_NAME=oauth_test
DB_USER=root
DB_PASS=

JWT_SECRET_KEY=ANYSECRETKEY

ALLOWED_ORIGIN=*
``

### SETUP DATABASE

- Install MySQL Server / XAMPP
- Create database oauth_test
- `yarn db-migrate up`

### RUN SERVER

- `yarn start-dev`
