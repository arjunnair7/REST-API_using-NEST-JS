import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service'; // Ensure this is the correct path

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let employeesService: EmployeesService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, DatabaseService], // Add DatabaseService
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    employeesService = module.get<EmployeesService>(EmployeesService);
    databaseService = module.get<DatabaseService>(DatabaseService); // Get the DatabaseService instance
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
