const apiPathDetails = {
  apiVersion: "v1",
  basePath: "/api",
};

const secret = process.env.JWT_SECRET;

module.exports = {
  apiPathDetails,
  secret,
};
