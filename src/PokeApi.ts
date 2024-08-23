import { Schema } from "@effect/schema";
import { Context, Effect, Layer } from "effect";
import { BuildPokeApiUrl } from "./BuildPokeApiUrl";
import { FetchError, JsonError } from "./errors";
import { PokemonCollection } from "./PokemonCollection";
import { Pokemon } from "./schemas";

const make = Effect.gen(function* () {
  const pokemonCollection = yield* PokemonCollection;
  const buildPokeApiUrl = yield* BuildPokeApiUrl;

  return {
    getPokemon: Effect.gen(function* () {
      const requestUrl = buildPokeApiUrl({ name: pokemonCollection[0] });

      const response = yield* Effect.tryPromise({
        try: () => fetch(requestUrl),
        catch: () => new FetchError(),
      });

      if (!response.ok) {
        return yield* new FetchError();
      }

      const json = yield* Effect.tryPromise({
        try: () => response.json(),
        catch: () => new JsonError(),
      });

      return yield* Schema.decodeUnknown(Pokemon)(json);
    }),
  };
});

export class PokeApi extends Context.Tag("PokeApi")<
  PokeApi,
  Effect.Effect.Success<typeof make>
>() {
  static readonly Live = Layer.effect(this, make).pipe(
    Layer.provide(Layer.mergeAll(PokemonCollection.Live, BuildPokeApiUrl.Live))
  );

  static readonly Test = Layer.succeed(
    this,
    PokeApi.of({
      getPokemon: Effect.succeed({
        id: 1,
        height: 10,
        weight: 10,
        name: "my-name",
        order: 1,
      }),
    })
  );
}
