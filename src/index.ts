import { Effect } from "effect";

interface FetchError {
  readonly _tag: "FetchError";
}

interface JsonError {
  readonly _tag: "JsonError";
}

const fetchRequest = Effect.tryPromise({
  try: () => fetch("https://pokeapi.co/api/v2/psadokemon/garchomp/"),
  catch: (): FetchError => ({ _tag: "FetchError" }),
});

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: (): JsonError => ({ _tag: "JsonError" }),
  });

const main = fetchRequest.pipe(
  Effect.flatMap(jsonResponse),
  Effect.catchTag("FetchError", () => Effect.succeed("Fetch error")),
  Effect.catchTag("JsonError", () => Effect.succeed("Json error"))
);

Effect.runPromise(main).then(console.log);
