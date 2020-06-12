/*
 * Import external packages here;
 */
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");

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
  // agencyData;
  // const agencyData = new Agency(agency);

  // db.userDetails
  //   .insert({
  //     userName: "Asha",
  //     email: "asha@yopmail.com",
  //     password: "asha@679",
  //     houses: [
  //       {
  //         name: "Asha Geeth",
  //         neighborhood: "sindhu",
  //       },
  //       {
  //         name: "Prana",
  //         neighborhood: "pushpa",
  //       },
  //     ],
  //   })
  agencyData
    .insert()
    .then((agencyEntry) => {
      const clientData = new Client(client);
      clientData.agencyId = agencyEntry._id;
      clientData
        .insert()
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
    // {
    //   $project: {
    //     _id: false,
    //     name: 1,
    //     clientDetails: {
    //       name: 1,
    //       totalBill: 1,
    //     },
    //   },
    // },
    {
      $sort: { "clientDetails.totalBill": -1 },
    },
    {
      $group: {
        _id: null,
        data: { $first: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: false,
        name: "$data.name",
        clientDetails: {
          name: "$data.clientDetails.name",
          totalBill: "$data.clientDetails.totalBill",
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
  const token = jwt.sign(
    { userId: "5ecfb579d501791f8ec3f50e", role: "admin" },
    process.env.JWT_SECRET
  );
  response.status(200).json({
    status: true,
    token,
  });
};

// const neighborhoodNames = (request, response) => {
//   UserDetails.aggregate([
//     {
//       $unwind: "$houses",
//     },
//     {
//       $match: { "houses.neighborhood": "Rabia" },
//     },
//   ]);
// };

module.exports = {
  createAgencyAndClient,
  getAgencyClient,
  generateToken,
};
