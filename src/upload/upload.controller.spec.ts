import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from 'client/client.service';
import { ClientEntity } from 'entities/client.entity';
import { FarmerEntity } from 'entities/farmer.entity';
import { FruitEntity } from 'entities/fruit.entity';
import { HarvestEntity } from 'entities/harvest.entity';
import { FarmerService } from 'farmer/farmer.service';
import { FruitService } from 'fruit/fruit.service';
import { HarvestService } from 'harvest/harvest.service';
import { Multer } from 'multer';
import { NewRowCSVDto } from 'schemas/update.data.dto';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

vi.mock('./upload.service');
vi.mock('fruit/fruit.service');
vi.mock('client/client.service');
vi.mock('farmer/farmer.service');
vi.mock('harvest/harvest.service');

describe('UploadController', () => {
  let controller: UploadController;
  let uploadService: UploadService;
  let fruitService: FruitService;
  let clientService: ClientService;
  let farmerService: FarmerService;
  let harvestService: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        UploadService,
        FruitService,
        ClientService,
        FarmerService,
        HarvestService,
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
    uploadService = module.get<UploadService>(UploadService);
    fruitService = module.get<FruitService>(FruitService);
    clientService = module.get<ClientService>(ClientService);
    farmerService = module.get<FarmerService>(FarmerService);
    harvestService = module.get<HarvestService>(HarvestService);
  });

  describe('uploadFile', () => {
    it('should process a valid CSV file and return inserted data', async () => {
      const mockFile: Multer.File = {
        buffer: Buffer.from(
          'Mail Agricultor;Nombre Agricultor;Apellido Agricultor;Mail Cliente;Nombre Cliente;Apellido Cliente;Nombre Campo;Ubicación de Campo;Fruta Cosechada;Variedad Cosechada\nmtreutel@email.com;Madison;Treutel;lcummerata@email.com;Lea;Cummerata;voluptatem ;139 Lucio Tunnel;brocoli;large',
        ),
        fieldname: 'file',
        originalname: 'mock.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        size: 1024,
        stream: null,
        destination: '',
        filename: '',
        path: '',
      } as Multer.File;

      const mockParsedData: NewRowCSVDto[] = [
        {
          fruitName: 'Apple',
          fruitVariety: 'Granny Smith',
          clientName: 'John Doe',
          clientMail: 'john@example.com',
          clientLastName: 'Doe',
          farmerName: 'Jane Smith',
          farmerMail: 'jane@example.com',
          farmerLastName: 'Smith',
          landLocation: 'Location 1',
          landName: 'Farm 1',
        },
      ];

      const mockValidatedData = {
        rows: mockParsedData,
        errors: [],
      };

      const mockFruit: FruitEntity = {
        id: 1,
        name: 'apple',
        varieties: [{ id: 1, name: 'Granny Smith', fruitId: 1 }],
      };
      const mockClient: ClientEntity = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        lastName: 'Doe',
      };
      const mockFarmer: FarmerEntity = {
        id: 1,
        name: 'Jane Smith',
        email: 'jane@example.com',
        lastName: 'Smith',
        lands: [{ id: 1, location: 'Location 1', name: 'Farm 1' }],
      };
      const mockHarvest: HarvestEntity = {
        id: 1,
        varietyId: 1,
        clientId: 1,
        landId: 1,
      };

      vi.spyOn(uploadService, 'parseCSV').mockResolvedValue(mockParsedData);
      vi.spyOn(uploadService, 'validateFile').mockResolvedValue(
        mockValidatedData,
      );
      vi.spyOn(fruitService, 'create').mockResolvedValue(mockFruit);
      vi.spyOn(clientService, 'create').mockResolvedValue(mockClient);
      vi.spyOn(farmerService, 'create').mockResolvedValue(mockFarmer);
      vi.spyOn(harvestService, 'create').mockResolvedValue(mockHarvest);

      const result = await controller.uploadFile(mockFile);

      expect(result).toEqual({
        inserteds: {
          data: [mockHarvest],
          count: 1,
        },
        errors: {
          data: [],
          count: 0,
        },
      });
    });

    it('should throw BadRequestException if file type is invalid', async () => {
      const mockFile: Multer.File = {
        buffer: Buffer.from('invalid file data'),
        fieldname: 'file',
        originalname: 'mock.txt',
        encoding: '7bit',
        mimetype: 'text/plain',
        size: 1024,
        stream: null,
        destination: '',
        filename: '',
        path: '',
      } as Multer.File;

      try {
        await controller.uploadFile(mockFile);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toEqual(
          "Unable to parse file",
        );
      }
    });

    it('should throw BadRequestException if any error occurs during processing', async () => {
      const mockFile: Multer.File = {
        buffer: Buffer.from('mock csv data'),
        fieldname: 'file',
        originalname: 'mock.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        size: 1024,
        stream: null,
        destination: '',
        filename: '',
        path: '',
      } as Multer.File;

      vi.spyOn(uploadService, 'parseCSV').mockRejectedValue(
        new Error('Parsing error'),
      );

      try {
        await controller.uploadFile(mockFile);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toEqual('Parsing error');
      }
    });
  });
});
