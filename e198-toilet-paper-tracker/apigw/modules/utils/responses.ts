export const BadRequestException = (message: string) => {
  const resBody = JSON.stringify({
    statusCode: 400,
    message: `Bad Request. ${message}`,
  });
  return new Response(resBody, {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
};

export const InternalServerErrorException = () => {
  const resBody = JSON.stringify({
    statusCode: 500,
    message: "Internal Server Error",
  });
  return new Response(resBody, {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
};

export const CreatedResponse = (body: object) => {
  return new Response(JSON.stringify(body), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};

export const ConflictException = (message: string) => {
  const resBody = JSON.stringify({
    statusCode: 409,
    message: `Conflict. ${message}`,
  });
  return new Response(resBody, {
    status: 409,
    headers: { "Content-Type": "application/json" },
  });
};
