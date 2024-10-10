import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { ConsoleDTO } from "../dto/console.dto";

import { notFound } from "../error/NotFoundError";

@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {


  // Récupère toutes les consoles
  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }
  

  // Récupère une console par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO | null> {
    const request = await consoleService.getConsoleById(id);
    if(!request){
      return notFound("Console");
    }
    return request;
  }

  
  
  

  // Crée une nouvelle console
  @Post("/")
  public async createConsole(
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO> {
    const { name, manufacturer } = requestBody;
    if (!name || !manufacturer) {
      return notFound("Nom ou fabricant");
    }

    this.setStatus(201);
    return consoleService.createConsole(name, manufacturer);
  }
  

  // Supprime une console par ID
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    await consoleService.deleteConsole(id);
  }

  // Met à jour une console par ID
  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO | null> {
    const { name, manufacturer } = requestBody;
    const request = await consoleService.getConsoleById(id);
    if(!request){
      return notFound("Console");
    }
    return consoleService.updateConsole(id, name, manufacturer);
  }
}