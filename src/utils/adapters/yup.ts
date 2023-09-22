import * as yup from 'yup';

export const yupValidator = <T extends yup.AnyObject>(
    schema: yup.ObjectSchema<T>,
    getFieldsValue: () => T,
  ) => ({
    async validator({ field }: any) {
      await schema.validateSyncAt(field, getFieldsValue());
    },
  });