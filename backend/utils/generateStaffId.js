const generateStaffId = (name) => {
  const staffId = `${name}_` + Math.floor(Math.random() * 10000) + `_RF`;
  return staffId;
};

module.exports = generateStaffId;
