import { Effect } from "effect";

const fetchRequest = Effect.tryPromise(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/garchomp/")
);

const jsonResponse = (response: Response) =>
  Effect.tryPromise(() => response.json());

const main = Effect.flatMap(fetchRequest, jsonResponse);

Effect.runPromise(main);
