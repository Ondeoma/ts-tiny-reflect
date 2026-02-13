//! These types shows what the macros should return.

const errorMessage: string = "This function is a macro and should be transformed by ts-tiny-reflect at compile time.";

/// For test porpose.
export function hello(): "hello" {
  throw errorMessage;
}
