import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parse';
import { type Multer } from 'multer';
import { Row, RowDto } from 'schemas/update.csv.dto';
import { NewRowCSVDto } from 'schemas/update.data.dto';

import {
  CLIENT_LAST_NAME,
  CLIENT_MAIL,
  CLIENT_NAME,
  FARMER_LAST_NAME,
  FARMER_MAIL,
  FARMER_NAME,
  FRUIT_NAME,
  FRUIT_VARIETY,
  LAND_LOCATION,
  LAND_NAME,
} from '../constants';

@Injectable()
export class UploadService {
  async parseCSV(file: Multer.File): Promise<RowDto> {
    const parsedData: RowDto = await new Promise((resolve, reject) => {
      csv.parse(
        file.buffer,
        {
          columns: true,
          relax_quotes: true,
          skip_empty_lines: true,
          cast: true,
        },
        (err, records) => {
          if (err) {
            reject(err);
            return { error: true, message: 'Unable to parse file' };
          }
          resolve(records);
        },
      );
    });
    return parsedData;
  }

  async validateFile(
    parsedData,
  ): Promise<{ rows: NewRowCSVDto[]; errors: string[] }> {
    const errors: string[] = [];
    const rows = [];
    for await (const [index, rowData] of parsedData.entries()) {
      const { row, error } = await this.validateFileRow(rowData);

      if (error) {
        errors.push(error);
      } else {
        rows.push(row);
      }
    }
    return { rows, errors };
  }

  private async validateFileRow(
    rowData: RowDto,
  ): Promise<{ row: NewRowCSVDto; error: string }> {
    const result = Row.safeParse(this.transformData(rowData));
    return {
      row: result.success
        ? {
            fruitName: result.data[FRUIT_NAME],
            fruitVariety: result.data[FRUIT_VARIETY],
            clientName: result.data[CLIENT_NAME],
            clientMail: result.data[CLIENT_MAIL],
            clientLastName: result.data[CLIENT_LAST_NAME],
            farmerName: result.data[FARMER_NAME],
            farmerMail: result.data[FARMER_MAIL],
            farmerLastName: result.data[FARMER_LAST_NAME],
            landLocation: result.data[LAND_LOCATION],
            landName: result.data[LAND_NAME],
          }
        : null,
      error: !result.success
        ? `[${result.error.issues[0].path}]: ${result.error.issues[0].message} data: ${Object.values(rowData)}`
        : null,
    };
  }

  private transformData = (item) => {
    // Obtén la clave y el valor separados por ";"
    const [keys, values] = Object.entries(item)[0];
    // Divide las claves y los valores en arrays
    const keysArray = keys.split(';');
    const valuesArray = (values as string).split(';');
    // Crea un nuevo objeto combinando las claves y los valores
    const result = {};
    keysArray.forEach((key, index) => {
      result[key] = valuesArray[index];
    });
    return result;
  };
}
