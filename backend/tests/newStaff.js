const slugify = require("slugify");
const generateStaffId = require("../utils/generateStaffId");

let staffName = "John Doe";
let newStaff = {
  name: staffName,
  slug: slugify(staffName),
  email: "johndoe@gmail.com",
  password: "123456",
  staffId: generateStaffId(staffName.split(" ")[0]),
  department: "software",
  isAdmin: false,
};

module.exports = newStaff;
