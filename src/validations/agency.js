/*
 *  Import external packages here;
 */
const Joi = require("@hapi/joi");

/*
 *  Import project packages here;
 */
const { agency } = require("../models/agency");
const { createAgencyAndClient, getAgencyClient } = require("../controllers/agency");

const createAgencyAndClientValidator = (request, response, next) => {
  const createOrderSchema = Joi.object({
    agency: Joi.object({
      name: Joi.string().required().label("Agency Name"),
      Address1: Joi.string().required().label("Agency Address1"),
      state: Joi.string().required().label("Agency State"),
      city: Joi.string().required().label("Agency City"),
      phoneNumber: Joi.string().max(12).required().label("Agency PhoneNumber"),
    }),
    client: Joi.object({
      name: Joi.string().required().label("Client Name"),
      email: Joi.string().email().required().label("Client Email"),
      phoneNumber: Joi.string().max(12).required().label("Client PhoneNumber"),
      totalBill: Joi.number().integer().required().label("Client TotalBill"),
    }),
  });
  const { error } = createOrderSchema.validate(request.body, { abortEarly: false });
  if (error) {
    return response.status(400).json({
      status: false,
      error: {
        error: "BadRequestError",
        message: "Request doesn't contain all the required fields.",
        errors: error.details.map((detail) => detail.message),
      },
    });
  }
  next();
};

const agencyValidatorFor = (methodType) => (request, response, next) => {
  switch (methodType) {
    case createAgencyAndClient.name:
      createAgencyAndClientValidator(request, response, next);
      break;
    default:
      throw new Error(`Unknown method type '${methodType}' used for validator`);
  }
};

module.exports = {
  agencyValidatorFor,
};
