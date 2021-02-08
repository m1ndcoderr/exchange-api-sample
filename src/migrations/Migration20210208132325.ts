import { Migration } from '@mikro-orm/migrations'

export class Migration20210208132325 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "username" varchar not null, "pass" varchar not null);'
    )

    this.addSql(
      'create table "currency" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "alpha3" varchar not null);'
    )
    this.addSql('alter table "currency" add constraint "currency_alpha3_unique" unique ("alpha3");')

    this.addSql(
      'create table "quote" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "quote_date" date not null, "value" numeric(1000, 4) not null, "main_currency_id" int4 not null, "related_currency_id" int4 not null);'
    )

    this.addSql(
      'alter table "quote" add constraint "quote_main_currency_id_foreign" foreign key ("main_currency_id") references "currency" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "quote" add constraint "quote_related_currency_id_foreign" foreign key ("related_currency_id") references "currency" ("id") on update cascade;'
    )

    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");')

    this.addSql(
      'alter table "quote" add constraint "quote_quote_date_main_currency_id_related_currency_id_unique" unique ("quote_date", "main_currency_id", "related_currency_id");'
    )
  }
}
