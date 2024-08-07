import { Effect } from "effect";
import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { program } from ".";
import { server } from "../test/node";
import { PokeApi } from "./PokeApi";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mainTest = program.pipe(Effect.provide(PokeApi.Test));

it("returns a valid pokemon", async () => {
  const response = await Effect.runPromise(mainTest);
  expect(response).toEqual({
    id: 1,
    height: 10,
    weight: 10,
    order: 1,
    name: "my-name",
  });
});
