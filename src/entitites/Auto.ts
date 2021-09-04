import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Auto {
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "text" })
  year!: number;

  @Property({ type: "text" })
  make!: string;

  @Property({ type: "text" })
  model!: string;
}
