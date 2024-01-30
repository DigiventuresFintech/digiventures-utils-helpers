import express from 'express';

export function handleError(res: express.Response, err: any) {
  const statusCode = err.internalCode || 400;
  return res.status(statusCode).json({
    errors: [
      {
        code: err.code,
        error: err.message,
      },
    ],
  });
}
