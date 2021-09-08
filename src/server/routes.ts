import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { BadRequestError, CustomError, InternalServerError } from './errors';

export function createApiHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof BadRequestError) {
        const { status, reason, message } = e;
        if (e.reason) {
          return res.status(status).json({ reason });
        } else {
          res.status(status).send(message);
        }
      } else if (e instanceof CustomError) {
        res.status(e.status).send(e.message);
      } else {
        const error = new InternalServerError();
        res.status(error.status).send(error.message);
      }
    }
  };
}
