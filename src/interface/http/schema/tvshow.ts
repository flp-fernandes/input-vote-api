import joi from 'joi';
import { TVShowStatus } from '../../../types/tvshow';

export const addTVShowSchema = joi.object({
  body: joi.object({
    name: joi.string().required(),
    status: joi.string().valid(...Object.keys(TVShowStatus)).required()
  }).required(),
});