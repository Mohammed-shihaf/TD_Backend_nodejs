import { Body, Controller, Get, Post } from "@nestjs/common";
import { WidgetsService, Widget } from "./widgets.service";

@Controller()
export class AppController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get("health")
  health() {
    return { status: "ok" };
  }

  @Get("api/widgets")
  findAll(): Widget[] {
    return this.widgetsService.findAll();
  }

  @Post("api/widgets")
  create(@Body("label") label: string): Widget {
    return this.widgetsService.create(label);
  }
}
