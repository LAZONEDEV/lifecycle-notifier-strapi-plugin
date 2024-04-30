import { RecipientType } from "../../../../../common/enums";
import { RecipientOptionType } from "../../../../../common/types";
import { CollectionSchema, InterceptorOptionType } from "../../../../types";

export const planetCollection = {
  uid: "api::planet.planet",
  info: {
    name: "Planet",
    singularName: "planet",
    pluralName: "planets",
    displayName: "Planet",
    description: "",
  },
  attributes: {
    email: {
      type: "email",
    },
    image: {
      type: "media",
      multiple: true,
      required: false,
      allowedTypes: ["images", "files", "videos", "audios"],
    },
    by: {
      type: "relation",
      relation: "oneToOne",
      target: "plugin::users-permissions.user",
      inversedBy: "planet",
      targetModel: "plugin::users-permissions.user",
      relationType: "oneToOne",
    },
  },
} as Partial<CollectionSchema>;

export const collections = [planetCollection];

export const recipients = [
  {
    type: RecipientType.ENV,
    value: "env1",
  },
] as RecipientOptionType[];

export const interceptors: InterceptorOptionType[] = [
  {
    name: "interceptor 1",
    value: "interceptor 1",
  },
];
