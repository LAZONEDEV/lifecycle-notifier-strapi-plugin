import { useEffect, useState } from 'react';
import { RecipientType } from '../common/enums';
import { RecipientOptionType } from '../common/types';
import { ConfigService } from '../services/Config';

export const useRecipients = () => {
  const [envRecipients, setEnvRecipients] = useState<RecipientOptionType[]>([]);

  const loadEnvRecipients = async (envRecipients: string[]) => {
    const recipientOptions = envRecipients.map<RecipientOptionType>((env) => ({
      type: RecipientType.ENV,
      value: env,
    }));

    setEnvRecipients(recipientOptions);
  };

  useEffect(() => {
    let ignore = false;

    ConfigService.getEnvRecipients().then((result) => {
      if (!ignore && result) {
        loadEnvRecipients(result);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return envRecipients;
};
