//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface ITechnicalInspectionRecordsClient {
  createNewInspectionRequest(command: CreateNewInspectionRequestCommand): Observable<void>;
}

@Injectable({
  providedIn: 'root',
})
export class TechnicalInspectionRecordsClient implements ITechnicalInspectionRecordsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? '';
  }

  createNewInspectionRequest(command: CreateNewInspectionRequestCommand): Observable<void> {
    let url_ = this.baseUrl + '/api/TechnicalInspectionRecords/CreateNewInspectionRequest';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(command);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCreateNewInspectionRequest(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCreateNewInspectionRequest(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        })
      );
  }

  protected processCreateNewInspectionRequest(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
          ? (response as any).error
          : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

export class CreateNewInspectionRequestCommand implements ICreateNewInspectionRequestCommand {
  vehicleOwnerName!: string;
  phoneNumber!: string;
  vehicleModel!: string;
  stateRegistrationNumber!: string;
  vehicleVinNumber!: string;
  inspectionTime!: Date;
  additionalInfo!: string;

  constructor(data?: ICreateNewInspectionRequestCommand) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.vehicleOwnerName = _data['vehicleOwnerName'];
      this.phoneNumber = _data['phoneNumber'];
      this.vehicleModel = _data['vehicleModel'];
      this.stateRegistrationNumber = _data['stateRegistrationNumber'];
      this.vehicleVinNumber = _data['vehicleVinNumber'];
      this.inspectionTime = _data['inspectionTime']
        ? new Date(_data['inspectionTime'].toString())
        : <any>undefined;
      this.additionalInfo = _data['additionalInfo'];
    }
  }

  static fromJS(data: any): CreateNewInspectionRequestCommand {
    data = typeof data === 'object' ? data : {};
    let result = new CreateNewInspectionRequestCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['vehicleOwnerName'] = this.vehicleOwnerName;
    data['phoneNumber'] = this.phoneNumber;
    data['vehicleModel'] = this.vehicleModel;
    data['stateRegistrationNumber'] = this.stateRegistrationNumber;
    data['vehicleVinNumber'] = this.vehicleVinNumber;
    data['inspectionTime'] = this.inspectionTime
      ? this.inspectionTime.toISOString()
      : <any>undefined;
    data['additionalInfo'] = this.additionalInfo;
    return data;
  }
}

export interface ICreateNewInspectionRequestCommand {
  vehicleOwnerName: string;
  phoneNumber: string;
  vehicleModel: string;
  stateRegistrationNumber: string;
  vehicleVinNumber: string;
  inspectionTime: Date;
  additionalInfo: string;
}

export class SwaggerException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isSwaggerException = true;

  static isSwaggerException(obj: any): obj is SwaggerException {
    return obj.isSwaggerException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
