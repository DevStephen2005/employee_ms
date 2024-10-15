const bcrypt = require('bcrypt');
const User = require('./models/usermodel'); 
const connectDB = require('./db/db')


// Data to seed
const userRegister = async () => {
    try {
      // CONNECT MONGO DB 
      connectDB()

      const hashPassword = await bcrypt.hash("admin", 10); // Hashing the password
  
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
      });
  
      await newUser.save(); // Saving the new user to the database
      console.log('Admin user created successfully');
    } catch (error) {
      console.log(error);
    }
  };
  
  userRegister();


