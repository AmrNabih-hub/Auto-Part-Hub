require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model'); // Adjust path if necessary

const adminUser = {
  email: "amrnabih8@gmail.com",
  plainPassword: "amr2#3$0",
  name: "Default Admin",
  role: "admin"
};

async function seedAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding.');

    const existingAdmin = await User.findOne({ email: adminUser.email });

    if (existingAdmin) {
      console.log(`Admin user ${adminUser.email} already exists. No action taken.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminUser.plainPassword, 10);

    const newAdmin = new User({
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      role: adminUser.role,
    });

    await newAdmin.save();
    console.log('Default admin user created successfully!');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

seedAdminUser();
