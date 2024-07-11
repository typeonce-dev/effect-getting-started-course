import { Schema } from "@effect/schema";
import { Config, Effect } from "effect";

const Pokemon = Schema.Struct({
  id: Schema.Number,
  order: Schema.Number,
  name: Schema.String,
  height: Schema.Number,
  weight: Schema.Number,
});

const config = Config.string("BASE_URL");

interface FetchError {
  readonly _tag: "FetchError";
}

interface JsonError {
  readonly _tag: "JsonError";
}

const fetchRequest = (baseUrl: string) =>
  Effect.tryPromise({
    try: () => fetch(`${baseUrl}/api/v2/pokemon/garchomp/`),
    catch: (): FetchError => ({ _tag: "FetchError" }),
  });

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: (): JsonError => ({ _tag: "JsonError" }),
  });

const decodePokemon = Schema.decodeUnknown(Pokemon);

const program = Effect.gen(function* () {
  const baseUrl = yield* config;
  const response = yield* fetchRequest(baseUrl);
  if (!response.ok) {
    return yield* Effect.fail<FetchError>({ _tag: "FetchError" });
  }

  const json = yield* jsonResponse(response);

  return yield* decodePokemon(json);
});

const main = program.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
    ParseError: () => Effect.succeed("Parse error"),
  })
);

Effect.runPromise(main).then(console.log);
