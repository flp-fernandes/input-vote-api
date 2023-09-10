import joi, { AnySchema } from 'joi';
import { InvalidProperties } from '../../../util/error';

export const validateProperties = (
  { schema, params, errorMsg }: { schema: AnySchema; params: object, errorMsg: string },
) => {
  const validation = schema.validate(params, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
  });

  if (validation.error) {
    throw new InvalidProperties(errorMsg, validation.error.details)
  }
}