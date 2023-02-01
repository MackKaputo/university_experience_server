import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Activate the use of global decorator for validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true //only allow fields defined in the dto
  }))

  await app.listen(8000);
}
bootstrap();
