const request = require("supertest");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
let server = require("../app");
const newStaff = require("./newStaff");
const Staff = require("../models/staffModel");
const slugify = require("slugify");
const generateStaffId = require("../utils/generateStaffId");

describe("RELEAF CLOCKIN API", function () {
  beforeEach(async () => {
    await Staff.deleteOne({ email: newStaff.email });
  });
  afterEach(async () => {
    await Staff.deleteOne({ email: newStaff.email });
  });

  describe("GET REQUESTS", function () {
    let token;

    try {
      test("/api/staff/list => should get list of all staff", async () => {
        const staff = await Staff.create(newStaff);

        if (staff) token = generateToken(newStaff._id);

        await request(server)
          .get("/api/staff/list")
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .then((response) => {
            expect(response.body[0].email).toBe(newStaff.email);
            expect(response.body[0].name).toBe(newStaff.name);
          });
      });

      test("/api/staff/list => should return 'Access Denied: No token' ", async () => {
        await request(server)
          .get("/api/staff/list")
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Access Denied: No token");
          });
      });

      test("/api/staff/profile => should get staff profile", async () => {
        const staff = await Staff.create(newStaff);
        token = generateToken(staff._id);
        await request(server)
          .get("/api/staff/profile")
          .set("Authorization", `Bearer ${token}`)
          .send(staff)
          .expect(200)
          .then((response) => {
            expect(response.body.email).toBe(newStaff.email);
            expect(response.body.name).toBe(newStaff.name);
          });
      });

      test("/api/staff/profile => should return 'Server Error, try again later' ", async () => {
        token = generateToken("60cf44f4d4260f8bcc6c00aa");
        await request(server)
          .get("/api/staff/profile")
          .set("Authorization", `Bearer ${token}`)
          .expect(500)
          .then((response) => {
            expect(response.body.message).toBe("Server Error, try again later");
          });
      });

      test("/api/staff/profile => should return 'Access Denied: No token' ", async () => {
        await request(server)
          .get("/api/staff/profile")
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Access Denied: No token");
          });
      });
    } catch (error) {
      console.log("get request error", error.message);
    }
  });

  describe("POST REQUESTS", function () {
    try {
      test("/api/auth/register => Should Create a Staff", async () => {
        await request(server)
          .post("/api/auth/register")
          .send(newStaff)
          .expect(201)
          .then((response) => {
            expect(response.body.email).toBe(newStaff.email);
            expect(response.body.name).toBe(newStaff.name);
          });
      });

      test("/api/auth/register => Should return 'Please provide a valid Email'", async () => {
        let staffName = "John Doe";
        let staff = {
          name: staffName,
          slug: slugify(staffName),
          password: "123456",
          staffId: generateStaffId(staffName.split(" ")[0]),
          department: "software",
          isAdmin: false,
        };
        await request(server)
          .post("/api/auth/register")
          .send(staff)
          .expect(400)
          .then((response) => {
            expect(response.body.errorMessage).toBe(
              "Please provide a valid Email"
            );
          });
      });

      test("/api/auth/login => Should Login a Staff", async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newStaff.password, salt);
        const staffDetails = { ...newStaff, password: hashedPassword };
        const staff = await Staff.create(staffDetails);

        const data = {
          email: newStaff.email,
          password: newStaff.password,
        };

        await request(server)
          .post("/api/auth/login")
          .send(data)
          .expect(200)
          .then((response) => {
            expect(response.body.email).toBe(staff.email);
            expect(response.body.name).toBe(staff.name);
          });
      });

      test("/api/auth/login => Should return 401 -'Invalid Email or Password'", async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newStaff.password, salt);
        const staffDetails = { ...newStaff, password: hashedPassword };
        const staff = await Staff.create(staffDetails);

        const data = {
          email: "wrong_email@gmail.com",
          password: newStaff.password,
        };

        await request(server)
          .post("/api/auth/login")
          .send(data)
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Invalid Email or Password");
          });
      });
    } catch (error) {
      console.log("Post Requests error", error.message);
    }
  });

  describe("PUT REQUESTS", function () {
    let token;
    try {
      test("/api/staff/profile => should update staff profile", async () => {
        const staff = await Staff.create(newStaff);

        if (staff) token = generateToken(staff._id);

        const updated = {
          name: "John Doe Updated",
        };

        await request(server)
          .put("/api/staff/profile")
          .set("Authorization", `Bearer ${token}`)
          .send(updated)
          .expect(201)
          .then((response) => {
            expect(response.body.email).toBe(newStaff.email);
            expect(response.body.name).toBe(updated.name);
          });
      });

      test("/api/staff/profile => should return 'Access Denied: No token' ", async () => {
        await request(server)
          .put("/api/staff/profile")
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Access Denied: No token");
          });
      });

      test("/api/staff/clockin => should clockin staff ", async () => {
        const staff = await Staff.create(newStaff);

        if (staff) token = generateToken(staff._id);

        const clockinID = {
          staffId: staff.staffId,
        };

        await request(server)
          .put("/api/staff/clockin")
          .set("Authorization", `Bearer ${token}`)
          .send(clockinID)
          .expect(201)
          .then((response) => {
            expect(response.body.email).toBe(newStaff.email);
            expect(response.body.name).toBe(newStaff.name);
            expect(response.body.clockIns.length).toBe(1);
          });
      });

      test("/api/staff/clockin => should return 'Access Denied: No token' ", async () => {
        await request(server)
          .put("/api/staff/clockin")
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Access Denied: No token");
          });
      });

      test("/api/staff/clockout => should clockout staff ", async () => {
        const staff = await Staff.create(newStaff);

        if (staff) token = generateToken(staff._id);

        const clockinID = {
          staffId: staff.staffId,
        };

        await request(server)
          .put("/api/staff/clockout")
          .set("Authorization", `Bearer ${token}`)
          .send(clockinID)
          .expect(201)
          .then((response) => {
            expect(response.body.email).toBe(newStaff.email);
            expect(response.body.name).toBe(newStaff.name);
            expect(response.body.clockOuts.length).toBe(1);
          });
      });

      test("/api/staff/clockout => should return 'Access Denied: No token' ", async () => {
        await request(server)
          .put("/api/staff/clockout")
          .expect(401)
          .then((response) => {
            expect(response.body.message).toBe("Access Denied: No token");
          });
      });
    } catch (error) {
      console.log("PUT Request error", error.message);
    }
  });
});
