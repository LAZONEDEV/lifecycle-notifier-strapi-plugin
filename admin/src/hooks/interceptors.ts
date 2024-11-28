import { useEffect, useState } from 'react';
import { InterceptorService } from '../services/Interceptor';
import { InterceptorOptionType } from '../types';
import useUserAuth from './auth';

export const useInterceptorsOptions = () => {
  const authToken = useUserAuth();
  const [options, setOptions] = useState<InterceptorOptionType[]>([]);

  const loadInterceptors = () => {
    let ignore = false;

    const fetchInterceptors = async () => {
      try {
        const existingInterceptors = await InterceptorService.getInterceptors(authToken);
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
