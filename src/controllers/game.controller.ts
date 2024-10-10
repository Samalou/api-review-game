import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { gameService } from "../services/game.service";
import { GameDTO } from "../dto/game.dto";

import { notFound } from "../error/NotFoundError";


@Route("games")
@Tags("Games")
export class GameController extends Controller {

  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGamesById(@Path() id: number): Promise<GameDTO | null> {
    const request = await gameService.getGameById(id);
    if (!request) {
      return notFound("Game"); 
    }
    return request;
  }

  @Post("/")
  public async createGames(@Body() requestBody: GameDTO): Promise<GameDTO | null> {
    const { title, console } = requestBody;
    if (!title || !console?.id) {
      return notFound("title or console_id");
    }
    this.setStatus(201);
    return gameService.createGame(title, console.id);;
  }


}