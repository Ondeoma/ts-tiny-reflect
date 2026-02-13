import ts from "typescript";
import { TransformerExtras } from "ts-patch";
import { RecursivePartial } from "./utils";
import { Options } from "./common"
import { callTransformer } from "./call";

export type ReflectOptions = RecursivePartial<Options>;

export default function reflectTransformer(
  program: ts.Program,
  options: ReflectOptions,
  extra: TransformerExtras,
): ts.TransformerFactory<ts.SourceFile> {
  const defaultOptions = {
  };
  const exactOptions = {
    ...options,
    ...defaultOptions,
  };

  return callTransformer(program, exactOptions, extra);
}
