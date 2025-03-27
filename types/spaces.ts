export enum SpaceType {
  INDOOR = "INDOOR",
  OUTDOOR = "OUTDOOR",
  PRIVATE = "PRIVATE",
  ROOFTOP = "ROOFTOP",
  BAR = "BAR",
}

export enum TableShape {
  ROUND = "ROUND",
  SQUARE = "SQUARE",
  RECTANGLE = "RECTANGLE",
  BAR = "BAR",
  BOOTH = "BOOTH",
}

export enum TableStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  RESERVED = "RESERVED",
  MAINTENANCE = "MAINTENANCE",
}

export interface Dimensions {
  radius: number;
  width: number;
  height: number;
  shape: TableShape;
}

export interface EditableTable extends Dimensions {
  status: TableStatus;
  spaceId: string;
  x: number;
  y: number;
}

export interface Table extends EditableTable {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  type: SpaceType;
  isActive?: boolean;
  currentReservationId?: string;
}

export interface Space {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  type: SpaceType;
  capacity: number;
  isActive: boolean;
  tables: Table[];
}
