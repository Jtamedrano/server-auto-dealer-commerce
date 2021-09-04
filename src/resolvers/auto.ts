import { Maybe } from "graphql/jsutils/Maybe";
import { ServerContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Auto } from "../entitites/Auto";

@InputType()
class NewAuto {
  @Field(() => Int)
  year!: number;

  @Field()
  make!: string;

  @Field()
  model!: string;
}
@InputType()
class editAuto {
  @Field(() => Int, { nullable: true })
  year: number;

  @Field(() => String, { nullable: true })
  make: string;

  @Field(() => String, { nullable: true })
  model: string;

  [key: string]: any;
}

@Resolver()
export class AutoResolver {
  @Query(() => [Auto])
  getAllAutos(@Ctx() { em }: ServerContext): Promise<Auto[]> {
    return em.find(Auto, {});
  }

  @Query(() => Auto)
  getAutoById(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: ServerContext
  ): Promise<Auto | null> {
    return em.findOne(Auto, { id });
  }
  @Mutation(() => Auto)
  async createAuto(
    @Arg("autoDetail", () => NewAuto) details: NewAuto,
    @Ctx() { em }: ServerContext
  ): Promise<Auto> {
    const newAuto = em.create(Auto, { ...details });
    await em.persistAndFlush(newAuto);
    return newAuto;
  }

  @Mutation(() => Auto)
  async updateAuto(
    @Arg("id", () => Int) id: number,
    @Arg("autoDetail", () => editAuto) details: Maybe<editAuto>,
    @Ctx() { em }: ServerContext
  ): Promise<Auto | null> {
    let foundAuto = await em.findOne(Auto, { id });
    if (!foundAuto) {
      return null;
    }

    for (const key in details) {
      if (Object.prototype.hasOwnProperty.call(details, key)) {
        if (Object.prototype.hasOwnProperty.call(foundAuto, key)) {
          const element = details[key];
          foundAuto[key] = element;
        }
      }
    }

    await em.persistAndFlush(foundAuto);

    return foundAuto;
  }

  @Mutation(() => Boolean)
  async deleteAuto(
    @Arg("id") id: number,
    @Ctx() { em }: ServerContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Auto, { id });
    } catch (error) {
      return false;
    }

    return true;
  }
}
