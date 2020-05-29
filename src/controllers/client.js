/*
 * Import external packages here;
 */
const uniqid = require("uniqid");
const { ObjectId } = require("mongoose").Types;

/*
 * Import project packages here
 */
const { Client } = require("../models/client");

const updateClient = (request, response) => {
  const childLogger = request.logger.child({
    controllerName: "updateClient",
    traceId: uniqid(),
  });
  childLogger.info({ req: request });
  const queryCriteria = {
    _id: ObjectId(request.params.id),
  };
  Client.findOne(queryCriteria)
    .then((client) => {
      if (!client) {
        return response.status(404).json({
          status: false,
          error: {
            error: "NotFoundError",
            message: `Currency with id ${request.params.id} not found.`,
          },
        });
      }
      client.set(request.body);
      client
        .save()
        .then((saveClient) =>
          response.status(200).json({
            status: true,
            data: saveClient,
          })
        )
        .catch((saveError) =>
          response.status(500).json({
            status: false,
            error: {
              error: saveError.name,
              message: saveError.message,
            },
          })
        );
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

module.exports = {
  updateClient,
};
