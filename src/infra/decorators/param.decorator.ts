export const PARAM_KEY = "custom:param";

export const Param = (paramName: string) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const existsParameters =
      Reflect.getMetadata(PARAM_KEY, target, propertyKey) || [];
    existsParameters.push({ index: parameterIndex, name: paramName });

    Reflect.defineMetadata(PARAM_KEY, existsParameters, target, propertyKey);
  };
};

export const getRouteParam = (
  target: any,
  propertyKey: string | symbol
): {
  index: number;
  name: string;
}[] => {
  return Reflect.getMetadata(PARAM_KEY, target, propertyKey) || [];
};
