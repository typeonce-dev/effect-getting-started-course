import { Effect } from "effect";

interface FetchError {
  readonly _tag: "FetchError";
}

interface JsonError {
  readonly _tag: "JsonError";
}

const fetchRequest = Effect.tryPromise({
  try: () => fetch("https://pokeapi.co/api/v2/pokemon/garchomp/"),
  catch: (): FetchError => ({ _tag: "FetchError" }),
});

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: (): JsonError => ({ _tag: "JsonError" }),
  });

const program = Effect.gen(function* () {
  const response = yield* fetchRequest;
  if (!response.ok) {
    return yield* Effect.fail<FetchError>({ _tag: "FetchError" });
  }

  return yield* jsonResponse(response);
});

const main = program.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
  })
);

Effect.runPromise(main).then(console.log);
