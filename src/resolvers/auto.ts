import { Query, Resolver } from "type-graphql";

@Resolver()
export class AutoResolver {
  @Query(() => String)
  getAuto() {
    return "Getting Auto";
  }
}
