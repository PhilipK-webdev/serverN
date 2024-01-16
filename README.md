Prerequisites:
Node.js and npm installed
MySQL
Instructions:
npm install
Configure your database connection in the config/config.json file.
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
