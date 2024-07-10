import { Effect } from "effect";

const fetchRequest = Effect.tryPromise(() =>
  fetch("https://pokeapi.co/api/v2/psadokemon/garchomp/")
);

const jsonResponse = (response: Response) =>
  Effect.tryPromise(() => response.json());

const main = fetchRequest.pipe(
  Effect.flatMap(jsonResponse),
  Effect.catchTag("UnknownException", () =>
    Effect.succeed("There was an error")
  )
);

Effect.runPromise(main).then(console.log);
