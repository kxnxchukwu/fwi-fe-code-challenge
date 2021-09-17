import { nanoid } from '@reduxjs/toolkit';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import Joi, { ObjectSchema } from 'joi';
import { join } from 'path';

import { PaginationOptions, PaginationResponse } from '../appTypes/pagination';
import { BasePlayer, Player, PlayerRecord } from '../appTypes/players';
import initialData from '../assets/initialData.json';
import { COUNTRIES } from '../constants/countries';
import { BadRequestError, NotFoundError } from './errors';

const DATABASE_FILE = join(process.cwd(), 'src', 'assets', 'data.json');
if (!existsSync(DATABASE_FILE)) {
  writeFileSync(DATABASE_FILE, JSON.stringify(initialData), 'utf8');
}

const NEW_PLAYER_SCHEMA = Joi.object<BasePlayer>({
  name: Joi.string().required(),
  country: Joi.string()
    .valid(...Object.keys(COUNTRIES))
    .required(),
  winnings: Joi.number().required(),
  imageUrl: Joi.string().uri().optional(),
});

const PLAYER_PATCH_SCHEMA = Joi.object<Partial<BasePlayer>>({
  name: Joi.string().optional(),
  country: Joi.string()
    .valid(...Object.keys(COUNTRIES))
    .optional(),
  winnings: Joi.number().optional(),
  imageUrl: Joi.string().uri().optional(),
});

const PAGINATION_SCHEMA = Joi.object<Required<PaginationOptions>>({
  sortBy: Joi.string()
    .valid('name', 'country', 'winnings')
    .optional()
    .default(''),
  sortOrder: Joi.string().valid('asc', 'desc').optional().default('asc'),
  from: Joi.number().integer().optional().default(0),
  size: Joi.number().integer().optional().default(-1),
});

export class PlayersController {
  private alphaNumericSort(a: string, b: string): number {
    return a.localeCompare(b, 'en-US', {
      numeric: true,
      caseFirst: 'upper',
    });
  }

  private sort(
    players: readonly Player[],
    sortBy: keyof Player | '',
    sortOrder: 'asc' | 'desc'
  ): readonly Player[] {
    if (!sortBy) {
      return players;
    }

    const isAscending = sortOrder === 'asc';
    const sorted = players.slice();
    sorted.sort((player1, player2) => {
      if (sortBy === 'winnings') {
        const winnings1 = player1.winnings;
        const winnings2 = player2.winnings;

        return isAscending ? winnings1 - winnings2 : winnings2 - winnings1;
      }

      const value1 = player1[sortBy];
      const value2 = player2[sortBy];

      if (isAscending) {
        return this.alphaNumericSort(value1, value2);
      }

      return this.alphaNumericSort(value2, value1);
    });

    return sorted;
  }

  private getPlayers(): PlayerRecord {
    return JSON.parse(readFileSync(DATABASE_FILE, 'utf8'));
  }

  private setPlayers(players: PlayerRecord): void {
    writeFileSync(DATABASE_FILE, JSON.stringify(players));
  }

  private validate<T>(data: unknown, schema: ObjectSchema<T>): T {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      throw new BadRequestError(error.message);
    }

    return value;
  }

  async getAll(options: unknown): Promise<PaginationResponse<Player>> {
    const { sortBy, sortOrder, size, from } = this.validate(
      options,
      PAGINATION_SCHEMA
    );
    const players = this.sort(
      Object.values(this.getPlayers()),
      sortBy,
      sortOrder
    );

    return {
      size,
      from,
      total: players.length,
      items: players.slice(from, size === -1 ? players.length : from + size),
    };
  }

  async getById(playerId: string): Promise<Player> {
    const players = this.getPlayers();
    const player = players[playerId];
    if (!player) {
      throw new NotFoundError();
    }

    return player;
  }

  async create(playerJson: unknown): Promise<Player> {
    const newPlayer = this.validate(playerJson, NEW_PLAYER_SCHEMA);

    const id = nanoid();
    const player: Player = {
      ...newPlayer,
      id,
      imageUrl: newPlayer.imageUrl ?? `http://i.pravatar.cc/40?u=${id}`,
    };

    this.setPlayers({ ...this.getPlayers(), [id]: player });
    return player;
  }

  async update(playerId: string, data: unknown): Promise<Player> {
    const existing = await this.getById(playerId);
    const patch = this.validate(data, PLAYER_PATCH_SCHEMA);
    const player: Player = {
      ...existing,
      ...patch,
    };
    this.setPlayers({
      ...this.getPlayers(),
      [playerId]: player,
    });

    return player;
  }

  async delete(playerId: string): Promise<void> {
    const { [playerId]: player, ...players } = this.getPlayers();
    if (!player) {
      throw new NotFoundError();
    }

    this.setPlayers(players);
  }
}
