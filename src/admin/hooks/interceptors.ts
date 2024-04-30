import { useEffect, useState } from "react";
import { InterceptorService } from "../services/Interceptor";
import { InterceptorOptionType } from "../types";

export const useInterceptorsOptions = () => {
  const [options, setOptions] = useState<InterceptorOptionType[]>([]);

  const loadInterceptors = () => {
    let ignore = false;

    const fetchInterceptors = async () => {
      try {
        const existingInterceptors = await InterceptorService.getInterceptors();
        if (!ignore) {
          const interceptorsOptions = existingInterceptors.map((item) => ({
            name: item,
            value: item,
          }));
          setOptions(interceptorsOptions);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterceptors();

    return () => {
      ignore = true;
    };
  };

  useEffect(loadInterceptors, []);

  return options;
};
