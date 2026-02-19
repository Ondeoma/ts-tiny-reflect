import { TypeMeta } from "./types";

export type TypedObjectType<T = unknown> = {
  kind: "object";
  name?: string;
  members: {
    [K in keyof T]: ObjectMember<K>;
  }[keyof T][];
};
export type ObjectMember<K extends PropertyKey> = {
  name: K;
  type: TypeMeta;
  optional: boolean;
  readonly: boolean;
};
