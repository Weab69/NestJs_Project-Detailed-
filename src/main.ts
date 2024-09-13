import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
//import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /*this is for global use of the logger {
    bufferLogs: true,
  }*/);
  //app.use(app.get(LoggerService));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
