import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { DatabaseService } from './database/database.service'; // Update based on your service

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the HTTP adapter to use in the exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Enable CORS with optional origin restrictions (adjust as necessary)
  app.enableCors({
    origin: '*', // Replace '*' with your specific origin(s) if needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Set a global prefix for API routes
  app.setGlobalPrefix('api');

  // Check if the database connection works
  const prismaService = app.get(DatabaseService); // Replace with your DB service
  try {
    await prismaService.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed', error);
  }

  // Use environment variable for the port or default to 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
