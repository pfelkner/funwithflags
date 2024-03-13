import { PrismaClient, Score, User } from "@prisma/client";
import { Game } from "../src/game";
import countries from "../assets/with-difficulty.json";
import game from "../routers/game";

const prisma = new PrismaClient();
export class GameService {
  private game: Game | null = null;

  public startGame = (): Game => {
    this.game = new Game(countries);
    return this.game;
  };

  createGame = (): Game => {
    return new Game(countries);
  };

  inProgress = (game: Game): boolean => {
    return false;
  };

  updatePlayerScore = async (
    userId: number,
    newScore: number
  ): Promise<Score> => {
    const updatedScore = await prisma.score.update({
      where: { userId: userId },
      data: { highestStreak: newScore },
    });
    return updatedScore;
  };
}
