/*
 *  Import external packages here;
 */
const Joi = require("@hapi/joi");

/*
 *  Import project packages here;
 */
const { updateClient } = require("../controllers/client");

const updateClientValidator = (request, response, next) => {
  const createOrderSchema = Joi.object({
    name: Joi.string().label("Client Name"),
    email: Joi.string().email().label("Client Email"),
    phoneNumber: Joi.string().max(12).label("Client PhoneNumber"),
    totalBill: Joi.number().integer().label("Client TotalBill"),
    agencyId: Joi.string().hex().max(24).min(24).label("Client AgencyId"),
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

const clientValidatorFor = (methodType) => (request, response, next) => {
  switch (methodType) {
    case updateClient.name:
      updateClientValidator(request, response, next);
      break;
    default:
      throw new Error(`Unknown method type '${methodType}' used for validator`);
  }
};

module.exports = {
  clientValidatorFor,
};
