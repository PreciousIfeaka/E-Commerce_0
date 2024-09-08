"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound =
  exports.errorHandler =
  exports.Unauthorized =
  exports.ServerError =
  exports.ResourceNotFound =
  exports.InvalidInput =
  exports.HttpError =
  exports.Forbidden =
  exports.Conflict =
  exports.BadRequest =
    void 0;
class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.success = false;
    this.name = this.constructor.name;
    this.status_code = statusCode;
  }
}
exports.HttpError = HttpError;
class BadRequest extends HttpError {
  constructor(message) {
    super(400, message);
  }
}
exports.BadRequest = BadRequest;
class ResourceNotFound extends HttpError {
  constructor(message) {
    super(404, message);
  }
}
exports.ResourceNotFound = ResourceNotFound;
class Unauthorized extends HttpError {
  constructor(message) {
    super(401, message);
  }
}
exports.Unauthorized = Unauthorized;
class Forbidden extends HttpError {
  constructor(message) {
    super(403, message);
  }
}
exports.Forbidden = Forbidden;
class Conflict extends HttpError {
  constructor(message) {
    super(409, message);
  }
}
exports.Conflict = Conflict;
class InvalidInput extends HttpError {
  constructor(message) {
    super(422, message);
  }
}
exports.InvalidInput = InvalidInput;
class ServerError extends HttpError {
  constructor(message) {
    super(500, message);
  }
}
exports.ServerError = ServerError;
const routeNotFound = (req, res, next) => {
  const message = `Route not found: ${req.originalUrl}`;
  res.status(404).json({ success: false, status: 404, message });
};
exports.routeNotFound = routeNotFound;
const errorHandler = (err, _req, res, _next) => {
  const { success, status_code, message } = err;
  const cleanedMessage = message.replace(/"/g, "");
  res.status(status_code).json({
    success: success || false,
    status_code,
    message: cleanedMessage,
  });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map
