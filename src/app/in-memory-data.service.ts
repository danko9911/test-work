import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {table} from "./table-data-interface";

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tables : table[] = [

    ];
    return {tables};
  }

  genId(tables: table[]): number {
    return tables.length > 0 ? Math.max(...tables.map(table => table.id)) + 1 : 11;
  }
}
