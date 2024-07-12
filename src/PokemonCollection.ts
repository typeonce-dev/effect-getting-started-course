import { Context, Layer, type Array } from "effect";

export type PokemonCollection = Array.NonEmptyArray<string>;

export const PokemonCollection =
  Context.GenericTag<PokemonCollection>("PokemonCollection");

export const PokemonCollectionLive = Layer.succeed(
  PokemonCollection,
  PokemonCollection.of(["staryu", "perrserker", "flaaffy"])
);
