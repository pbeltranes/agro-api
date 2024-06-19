import { Test, TestingModule } from '@nestjs/testing';
// import * as csv from 'csv-parse';
// import { Multer } from 'multer';
import { RowDto, Row } from 'schemas/update.csv.dto';
// import { NewRowCSVDto } from 'schemas/update.data.dto';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { UploadService } from './upload.service';

vi.mock('csv-parse', () => ({
  parse: vi.fn(),
}));

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  describe('parseCSV', () => {
    // const createMockCsvFile = (): Multer.File => {
    //   const csvContent = `FRUIT_NAME;FRUIT_VARIETY;CLIENT_NAME;CLIENT_MAIL;CLIENT_LAST_NAME;FARMER_NAME;FARMER_MAIL;FARMER_LAST_NAME;LAND_LOCATION;LAND_NAME
    // Apple;Granny Smith;John Doe;john@example.com;Doe;Jane Smith;jane@example.com;Smith;Location 1;Farm 1
    // Banana;Cavendish;Alice Cooper;alice@example.com;Cooper;Bob Brown;bob@example.com;Brown;Location 2;Farm 2`;

    //   return {
    //     buffer: Buffer.from(csvContent),
    //     fieldname: 'file',
    //     originalname: 'mock.csv',
    //     encoding: '7bit',
    //     mimetype: 'text/csv',
    //     size: csvContent.length,
    //     stream: null,
    //     destination: '',
    //     filename: '',
    //     path: '',
    //   } as Multer.File;
    // };
    it.todo('should parse CSV file correctly', async () => {
      // const result = await service.parseCSV(createMockCsvFile);
      // csv.parse((buffer, options, callback) => {
      //   callback(new Error('Unable to parse file'), null);
      // });
      // expect(result).toEqual([]);
      // expect(result).toEqual(mockParsedData);
      // expect(csv.parse).toHaveBeenCalledWith(
      //   mockFile.buffer,
      //   {
      //     columns: true,
      //     relax_quotes: true,
      //     skip_empty_lines: true,
      //     cast: true,
      //   },
      //   expect.any(Function),
      // );
    });

    it.todo('should throw an error if CSV parsing fails', async () => {
      // const mockFile = { buffer: Buffer.from('mock,csv,data') } as Multer.File;
      // csv.parse((buffer, options, callback) => {
      //   callback(new Error('Unable to parse file'), null);
      // });
      // await expect(service.parseCSV(mockFile)).rejects.toThrow(
      //   'Unable to parse file',
      // );
    });
  });

  describe('validateFile', () => {
    it('should validate parsed data correctly', async () => {
      const mockParsedData = [{ some: 'data' }, { some: 'invalid data' }];
      const mockValidatedRow = { row: { valid: 'row' }, error: null };

      vi.spyOn(service, 'validateFileRow').mockImplementation(
        async (rowData) => {
          if (rowData.some === 'data') return mockValidatedRow;
          return { row: null, error: 'Error validating row' };
        },
      );

      const result = await service.validateFile(mockParsedData);

      expect(result.rows).toEqual([{ valid: 'row' }]);
      expect(result.errors).toEqual(['Error validating row']);
    });
  });

  describe('validateFileRow', () => {
    it('should validate a row of data correctly', async () => {
      const mockRowData = { 'key1;key2': 'value1;value2' };
      const transformedData = { key1: 'value1', key2: 'value2' };

      vi.spyOn(service, 'transformData').mockReturnValue(transformedData);
      vi.spyOn(Row, 'safeParse').mockReturnValue({
        success: true,
        data: transformedData,
      } as any);

      const result = await service.validateFileRow(mockRowData as RowDto);

      expect(result.row).toEqual({
        fruitName: undefined,
        fruitVariety: undefined,
        clientName: undefined,
        clientMail: undefined,
        clientLastName: undefined,
        farmerName: undefined,
        farmerMail: undefined,
        farmerLastName: undefined,
        landLocation: undefined,
        landName: undefined,
      });
      expect(result.error).toBeNull();
    });

    it('should return error for invalid data', async () => {
      const mockRowData = { 'key1;key2': 'value1;value2' };

      vi.spyOn(service, 'transformData').mockReturnValue({});
      vi.spyOn(Row, 'safeParse').mockReturnValue({
        success: false,
        error: {
          issues: [{ path: ['key1'], message: 'Invalid key1' }],
        },
      } as any);

      const result = await service.validateFileRow(mockRowData as RowDto);

      expect(result.row).toBeNull();
      expect(result.error).toBe('[key1]: Invalid key1 data: value1;value2');
    });
  });

  describe('transformData', () => {
    it('should transform data correctly', () => {
      const mockItem = { 'key1;key2': 'value1;value2' };
      const result = service.transformData(mockItem);

      expect(result).toEqual({ key1: 'value1', key2: 'value2' });
    });
  });
});
