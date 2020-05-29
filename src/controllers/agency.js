/*
 * Import external packages here;
 */
const uniqid = require("uniqid");
var jwt = require("jsonwebtoken");

/*
 * Import project packages here
 */
const { Agency } = require("../models/agency");
const { Client } = require("../models/client");

const createAgencyAndClient = (request, response) => {
  const childLogger = request.logger.child({
    controllerName: "createAgency",
    traceId: uniqid(),
  });
  childLogger.info({ req: request });
  const { agency, client } = request.body;
  const agencyData = new Agency(agency);
  agencyData
    .save()
    .then((agencyEntry) => {
      const clientData = new Client(client);
      clientData.agencyId = agencyEntry._id;
      clientData
        .save()
        .then((clientEntry) => {
          response.status(201).json({
            status: true,
            data: { agencyEntry, clientEntry },
          });
        })
        .catch((fetchError) => {
          response.status(500).json({
            status: false,
            error: {
              error: fetchError.name,
              message: fetchError.message,
            },
          });
        });
    })
    .catch((fetchError) => {
      response.status(500).json({
        status: false,
        error: {
          error: fetchError.name,
          message: fetchError.message,
        },
      });
    });
};

const getAgencyClient = (request, response) => {
  const childLogger = request.logger.child({
    controllerName: "createAgency",
    traceId: uniqid(),
  });
  childLogger.info({ req: request });

  Agency.aggregate([
    {
      $lookup: {
        from: "clients",
        localField: "_id",
        foreignField: "agencyId",
        as: "clientDetails",
      },
    },
    {
      $unwind: "$clientDetails",
    },
    {
      $project: {
        _id: false,
        name: 1,
        clientDetails: {
          name: 1,
          totalBill: 1,
        },
      },
    },
  ])
    .then((fetchData) => {
      response.status(200).json({
        status: true,
        data: fetchData,
      });
    })
    .catch((fetchError) => {
      response.status(500).json({
        status: false,
        error: {
          error: fetchError.name,
          message: fetchError.message,
        },
      });
    });
};

const generateToken = (request, response) => {
  var token = jwt.sign(
    { userId: "5ecfb579d501791f8ec3f50e", role: "admin" },
    process.env.JWT_SECRET
  );
  response.status(200).json({
    status: true,
    token: token,
  });
};

module.exports = {
  createAgencyAndClient,
  getAgencyClient,
  generateToken,
};
