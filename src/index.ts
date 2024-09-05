import { Effect, Layer, ManagedRuntime } from "effect";
import { PokeApi } from "./PokeApi";

const MainLayer = Layer.mergeAll(PokeApi.Live);

const PokemonRuntime = ManagedRuntime.make(MainLayer);

const program = Effect.gen(function* () {
  const pokeApi = yield* PokeApi;
  return yield* pokeApi.getPokemon;
});

const main = program.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
    ParseError: () => Effect.succeed("Parse error"),
  })
);

PokemonRuntime.runPromise(main).then(console.log);
