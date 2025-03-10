import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const UserMysql = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      lastLogin: {
        type: DataTypes.DATE,
        defaultValue: null, 
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, Infinity], // Minimum password length
        },
      },
      bio: {
        type: DataTypes.TEXT,
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "default-profile.jpg", // Default profile picture
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role: {
        type: DataTypes.ENUM("User", "Admin"),
        defaultValue: "User",
      },
    },
    {
      hooks: {
        // Hash password before creating or updating a user
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );


  return User;
};

export default UserMysql;