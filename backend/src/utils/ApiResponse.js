class ApiResponse {
  constructor(success, statusCode, message, data = null, error = null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

export { ApiResponse };
