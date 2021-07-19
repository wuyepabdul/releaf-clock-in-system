const request = require("supertest");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
let server = require("../app");
const newStaff = require("./newStaff");
const Staff = require("../models/staffModel");

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
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body[0].email).toBe(newStaff.email);
            expect(response.body[0].name).toBe(newStaff.name);
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
    } catch (error) {
      console.log("PUT Request error", error.message);
    }
  });
});
