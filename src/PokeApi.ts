import { Schema } from "@effect/schema";
import { Context, Effect, Layer } from "effect";
import { BuildPokeApiUrl, BuildPokeApiUrlLive } from "./BuildPokeApiUrl";
import type { FetchError, JsonError } from "./errors";
import { PokemonCollection, PokemonCollectionLive } from "./PokemonCollection";
import { Pokemon } from "./schemas";

const make = Effect.gen(function* () {
  const pokemonCollection = yield* PokemonCollection;
  const buildPokeApiUrl = yield* BuildPokeApiUrl;

  return {
    getPokemon: Effect.gen(function* () {
      const requestUrl = buildPokeApiUrl({ name: pokemonCollection[0] });

      const response = yield* Effect.tryPromise({
        try: () => fetch(requestUrl),
        catch: (): FetchError => ({ _tag: "FetchError" }),
      });

      if (!response.ok) {
        return yield* Effect.fail<FetchError>({ _tag: "FetchError" });
      }

      const json = yield* Effect.tryPromise({
        try: () => response.json(),
        catch: (): JsonError => ({ _tag: "JsonError" }),
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
    Layer.provide(Layer.mergeAll(PokemonCollectionLive, BuildPokeApiUrlLive))
  );

  static readonly Test = Layer.succeed(
    this,
    this.of({
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

export const PokeApiTest = PokeApi.of({
  getPokemon: Effect.gen(function* () {
    const response = yield* Effect.tryPromise({
      try: () => fetch(`http://localhost:3000/api/v2/pokemon/garchomp/`),
      catch: (): FetchError => ({ _tag: "FetchError" }),
    });

    if (!response.ok) {
      return yield* Effect.fail<FetchError>({ _tag: "FetchError" });
    }

    const json = yield* Effect.tryPromise({
      try: () => response.json(),
      catch: (): JsonError => ({ _tag: "JsonError" }),
    });

    return yield* Schema.decodeUnknown(Pokemon)(json);
  }),
});
