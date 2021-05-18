const { Sequelize, Model, DataTypes } = require ('sequelize');

const sequelize = new Sequelize('Database-test', 'username', 'password', {
    dialect:'sqlite',
    host:'./DB.sqlite'
});

class User extends Model{}

User.init({
    Username: {type:DataTypes.STRING},
    email: {type:DataTypes.STRING},
    age: {type:DataTypes.INTEGER}
}, {sequelize, modelName:'MY-TABLE',timestamps:false, tableName:"my-table"})

module.exports = {sequelize, User };

