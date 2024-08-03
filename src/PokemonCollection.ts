import { Context, Layer, type Array } from "effect";

export class PokemonCollection extends Context.Tag("PokemonCollection")<
  PokemonCollection,
  Array.NonEmptyArray<string>
>() {
  static readonly Live = Layer.succeed(this, [
    "staryu",
    "perrserker",
    "flaaffy",
  ]);
}
