import dotenv from "dotenv";
import staffs from "./data/staffs.js";
import Staff from "./models/staffModel.js";
import dbConnection from "./config/connection.js";

dotenv.config();
dbConnection();

const importData = async () => {
  try {
    await Staff.deleteMany();

    const createdStaffs = await Staff.insertMany(staffs);
    const adminUser = createdStaffs[0]._id;

    console.log("DataImported:".green.inverse);

    // set admin user in staffs
    //return {  staff: adminUser };

    process.exit();
  } catch (error) {
    console.log(`Data Import error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Staff.deleteMany();
    console.log("Data Destroyed:".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`Data Destroyed error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
