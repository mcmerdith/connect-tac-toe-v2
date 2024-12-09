import { z } from "zod";
import { CTOBoard } from "./game";

export const Player = z.enum(["X", "O"]);
export type Player = z.infer<typeof Player>;

export const Game = z.object({
  id: z.string(),
  game: z.unknown(),
  turn: Player.default("X"),
});
export type Game = z.infer<typeof Game>;
