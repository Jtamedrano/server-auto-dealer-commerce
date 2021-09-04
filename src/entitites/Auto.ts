import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Auto {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => Int)
  @Property({ type: "text" })
  year!: number;

  @Field()
  @Property({ type: "text" })
  make!: string;

  @Field()
  @Property({ type: "text" })
  model!: string;

  [key: string]: any;
}
