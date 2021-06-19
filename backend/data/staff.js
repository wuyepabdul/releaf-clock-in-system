import bcrypt from "bcryptjs";
import slug from "slug";
const staffs = [
  {
    staffId: "12425wfsa",
    name: "Admin User",
    slug: slugify("Admin User"),
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "Software Development",
    isAdmin: true,
  },
  {
    staffId: "12325weqe",
    name: "wuyep",
    slug: slugify("wuyep"),
    email: "wuyep@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    department: "Business Admin",
    isAdmin: true,
  },
  {
    staffId: "12343wtqe",
    name: "abdul",
    slug: slugify("abdul"),
    email: "abdul@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    department: "Works",
    isAdmin: true,
  },
];

export default staffs;
