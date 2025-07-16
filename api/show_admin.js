console.log('Starting show_admin.js');
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('./models/user.model'); // Adjust path if necessary

const adminEmail = "amrnabih8@gmail.com";

async function showAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to retrieve admin data.');

    const adminUser = await User.findOne({ email: adminEmail });

    if (adminUser) {
      console.log('\nAdmin User Data:');
      console.log(`Name: ${adminUser.name}`);
      console.log(`Email: ${adminUser.email}`);
      console.log(`Role: ${adminUser.role}`);
      console.log(`ID: ${adminUser._id}`);
      // Do NOT log the password hash directly for security reasons
    } else {
      console.log(`Admin user with email ${adminEmail} not found.`);
    }

  } catch (error) {
    console.error('Error retrieving admin user data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

showAdminUser();
console.log('Finished show_admin.js');