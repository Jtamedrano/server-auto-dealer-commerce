import { Connection, IDatabaseDriver, EntityManager } from "@mikro-orm/core";

export type ServerContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
