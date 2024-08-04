import { HttpResponse, http } from "msw";
import type { Pokemon } from "../src/schemas";

const mockPokemon: Pokemon = {
  id: 1,
  height: 10,
  weight: 10,
  order: 1,
  name: "myname",
};

export const handlers = [
  http.get("http://localhost:3000/api/v2/pokemon/garchomp/", () => {
    return HttpResponse.json(mockPokemon);
  }),
];
