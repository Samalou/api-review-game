import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";

export class GameService {



  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }


   public async getGameById(id: number): Promise<GameDTO | null> {
    return Game.findByPk(id);
  }


  public async createGame(
    title: string,
    consoleId: number
  ): Promise<Game> {
    return Game.create({ title, console_id: consoleId });
  }
  

  
}

export const gameService = new GameService();
