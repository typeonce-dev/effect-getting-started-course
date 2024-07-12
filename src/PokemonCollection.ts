import { Context, type Array } from "effect";

export type PokemonCollection = Array.NonEmptyArray<string>;

export const PokemonCollection =
  Context.GenericTag<PokemonCollection>("PokemonCollection");

export const PokemonCollectionLive = PokemonCollection.of([
  "staryu",
  "perrserker",
  "flaaffy",
]);
