import { NextApiRequest } from 'next';

import { PlayersController } from '../../../server/controllers';
import { BadRequestError } from '../../../server/errors';
import { createApiHandler } from '../../../server/routes';

const controller = new PlayersController();

const getPlayerId = (req: NextApiRequest): string => {
  const { playerId = '' } = req.query;
  if (typeof playerId !== 'string') {
    throw new BadRequestError();
  }

  return playerId;
};

const handler = createApiHandler(async (req, res) => {
  const playerId = getPlayerId(req);
  switch (req.method) {
    case 'GET': {
      const player = await controller.getById(playerId);
      return res.status(200).json(player);
    }
    case 'PATCH': {
      const player = await controller.update(playerId, req.body);
      return res.status(200).json(player);
    }
    case 'DELETE':
      return controller.delete(playerId);
    default:
      throw new BadRequestError();
  }
});

export default handler;
