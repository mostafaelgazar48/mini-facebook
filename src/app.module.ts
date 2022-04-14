import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from "path";

@Module({
  imports: [PostsModule,
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true
      }, resolvers: [
        { use: QueryResolver,options:["lang"] },
        AcceptLanguageResolver
      ]
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "posts",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      autoLoadEntities: true,
      synchronize: true
    }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
