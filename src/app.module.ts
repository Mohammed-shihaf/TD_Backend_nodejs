import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { WidgetsService } from "./widgets.service";

@Module({
  controllers: [AppController],
  providers: [WidgetsService],
})
export class AppModule {}
