import { ConfigKeys } from "../types";
import { getPluginConfig } from "./getPluginConfig";
import { Interceptor } from "../types/index";

type InterceptorsMap = Record<string, Interceptor["callback"]>;

export const getInterceptorsMap = (): InterceptorsMap | undefined => {
  const availableInterceptors: Interceptor[] = getPluginConfig(
    ConfigKeys.INTERCEPTORS
  );
  if (!availableInterceptors || !Array.isArray(availableInterceptors)) {
    return;
  }

  const interceptorsMap = availableInterceptors.reduce((acc, interceptor) => {
    acc[interceptor.name] = interceptor.callback;
    return acc;
  }, {} as InterceptorsMap);

  return interceptorsMap;
};

export const applyInterceptors = async (
  entry: Record<string, any>,
  interceptorNames: string[]
): Promise<Record<string, any>> => {

  const interceptorsMap = getInterceptorsMap();
  if (!interceptorsMap || !interceptorNames.length) {
    return entry;
  }

  let generatedData = { ...entry };

  for (const interceptorName of interceptorNames) {
    if (!interceptorsMap[interceptorName]) {
      new Error(
        `An interceptor that does not exist in your configuration is defined on an subscription. 
        The interceptor name is ${interceptorName}
        `
      );
    }

    try {
      const interceptorOutput = await interceptorsMap[interceptorName](
        generatedData
      );
      if (!interceptorOutput) {
        continue;
      }

      generatedData = { ...generatedData, ...interceptorOutput };
    } catch (error) {
      console.error(
        `The error below occurred while applying the '${interceptorName}' interceptor`
      );
      console.error(error);
      throw error;
    }
  }

  return generatedData;
};
