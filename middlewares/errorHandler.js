module.exports = (err, req, res, next) => {
  let status = 500;
  let errObj = {
    message: "Internal Server Error",
    errors: ["Check Your Connection"],
  };

  if (err.name === "SequelizeValidationError") {
    status = 400;
    let messageErrors = [];
    err.errors.forEach((error) => {
      messageErrors.push(error.message);
    });
    errObj = {
      message: "BAD REQUEST",
      errors: messageErrors,
    };
  } else if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    let messageErrors = [];
    err.errors.forEach((error) => {
      messageErrors.push(error.message);
    });
    errObj = {
      message: "BAD REQUEST",
      errors: messageErrors,
    };
  } else if (err.name === "Email is not verified") {
    status = 400;
    errObj = {
      message: "BAD REQUEST",
      errors: [err.name],
    };
  } else if (err.name === "not found user to be verified") {
    status = 401;
    errObj = {
      message: "BAD REQUEST",
      errors: [err.name],
    };
  } else if (err.name === "Invalid Email/Password") {
    status = 400;
    errObj = {
      message: "BAD REQUEST",
      errors: [err.name],
    };
  } else if (err.name === "Invalid Token Error") {
    status = 401;
    errObj = {
      message: "Authentication",
      errors: [err.name],
    };
  } else if (err.name === "Failed Send Email") {
    status = 400;
    errObj = {
      message: "BAD REQUEST",
      errors: [err.name],
    };
  } else if (err.name === "Invalid Email") {
    status = 400;
    errObj = {
      message: "BAD REQUEST",
      errors: [err.name],
    };
  } else if (err.name === "Please Login First") {
    status = 401;
    errObj = {
      message: "Authentication",
      errors: [err.name],
    };
  }

  // errObj.status = false;
  res.status(status).json(errObj);
};
