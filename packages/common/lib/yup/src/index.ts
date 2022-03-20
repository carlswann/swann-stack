import * as yup from 'yup';

export { yup };

//prettier-ignore
export type TypeOf<T extends yup.Schema<unknown>> =
  T extends yup.Schema<infer P> ?
  P :
  never

export function validateSync<T>(schema: yup.Schema<T>, value: unknown): T {
  return schema.validateSync(value, {
    /**
     * Remove unspecified properties.
     * For example, sensitive information or implementation details.
     */
    stripUnknown: true,
  });
}

/**
 * A safer version of `yup.Schema.validateSync`
 */
export function validateExpectedSync<T>(schema: yup.Schema<T>, value: T): T {
  return validateSync(schema, value);
}

export function validateUnionSync<U extends readonly yup.Schema<unknown>[]>(...schemas: U): (value: unknown) => TypeOf<U[number]> {
  return (value): TypeOf<U[number]> => {
    const errors: string[] = [];
    for (const schema of schemas) {
      try {
        return validateExpectedSync(schema, value) as TypeOf<U[number]>;
      } catch (err) {
        errors.push(err.message);
      }
    }
    throw new yup.ValidationError(errors.join(' | '), value, '');
  };
}
