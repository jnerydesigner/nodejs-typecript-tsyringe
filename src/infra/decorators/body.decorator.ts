export const BODY_KEY = "custom:body";

export const Body = () => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    Reflect.defineMetadata(BODY_KEY, parameterIndex, target, propertyKey);
  };
};

export const getBodyParam = (target: any, key: string | symbol) => {
  return Reflect.getMetadata(BODY_KEY, target, key);
};
