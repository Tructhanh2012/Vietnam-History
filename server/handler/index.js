export function successHandler(success) {
  console.log(success);

  return {
    status: 200,
    message: success.message,
    data: success.data,
  };
}

export function errorHandler(error) {
  return {
    status: 400,
    message: error.sqlMessage,
  };
}
