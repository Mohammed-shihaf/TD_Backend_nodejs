import { Injectable } from "@nestjs/common";

export interface Widget {
  id: number;
  label: string;
}

@Injectable()
export class WidgetsService {
  private widgets: Widget[] = [{ id: 1, label: "Standalone backend widget" }];

  findAll(): Widget[] {
    return this.widgets;
  }

  create(label: string): Widget {
    const widget = { id: this.widgets.length + 1, label };
    this.widgets.push(widget);
    return widget;
  }
}
