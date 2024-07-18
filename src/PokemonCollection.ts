import { Context, Layer, type Array } from "effect";

export class PokemonCollection extends Context.Tag("PokemonCollection")<
  PokemonCollection,
  Array.NonEmptyArray<string>
>() {
  addPokemon(name: string) {
    return PokemonCollection.of([...this.Type, name]);
  }
}

export const PokemonCollectionLive = Layer.succeed(
  PokemonCollection,
  PokemonCollection.of(["staryu", "perrserker", "flaaffy"])
);
