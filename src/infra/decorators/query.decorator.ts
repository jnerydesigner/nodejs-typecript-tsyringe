export const PARAM_KEY = "custom:query";

export const Query = () => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    Reflect.defineMetadata(PARAM_KEY, parameterIndex, target, propertyKey);
  };
};

export const getQueryParam = (target: any, propertyKey: string | symbol) => {
  return Reflect.getMetadata(PARAM_KEY, target, propertyKey) || [];
};
