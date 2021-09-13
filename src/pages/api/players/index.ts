import { PlayersController } from '../../../server/controllers';
import { BadRequestError } from '../../../server/errors';
import { createApiHandler } from '../../../server/routes';

const controller = new PlayersController();

const handler = createApiHandler(async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const result = await controller.getAll(req.query);
      return res.status(200).json(result);
    }
    case 'POST': {
      const player = await controller.create(req.body);
      res.setHeader('Location', `${req.url}/${player.id}`);
      return res.status(201).json(player);
    }
    default:
      throw new BadRequestError();
  }
});

export default handler;
