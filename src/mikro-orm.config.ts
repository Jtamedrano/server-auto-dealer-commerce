import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Auto } from "./entitites/Auto";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Auto],
  dbName: "auto",
  type: "postgresql",
  user: "postgres",
  password: "password",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
