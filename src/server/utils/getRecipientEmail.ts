import { RecipientType } from "../../common/enums";
import { RecipientOptionType } from "../../common/types";

export const getRecipientEmail = (value: RecipientOptionType, collectionEntry: object) => {
  if(value.type === RecipientType.CUSTOM){
    return value.value
  }

  if(value.type === RecipientType.FROM_MODEL){
    return collectionEntry[value.value]
  }

  return process.env[value.value]
}
