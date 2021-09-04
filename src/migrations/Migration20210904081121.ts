import { Migration } from '@mikro-orm/migrations';

export class Migration20210904081121 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "auto" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "year" text not null, "make" text not null, "model" text not null);');
  }

}
