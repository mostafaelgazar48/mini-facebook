import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:['error','warn']
  });
  const options = new DocumentBuilder()
    .setTitle("mini-facebook")
    .setDescription("mini–Facebook App that allows consumers to register, login, create Post,")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
