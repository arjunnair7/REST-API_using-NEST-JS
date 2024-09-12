import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service'; // Ensure this is the correct path

describe('EmployeesService', () => {
  let service: EmployeesService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService, DatabaseService], // Add DatabaseService
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    databaseService = module.get<DatabaseService>(DatabaseService); // Get the DatabaseService instance
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
