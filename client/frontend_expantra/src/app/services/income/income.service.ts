import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IncomeCreateRequestModel} from "../../models/IncomeCreateRequest.model";
import {Observable} from "rxjs";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {IncomeReadRequestModel} from "../../models/IncomeReadRequest.model";
import {IncomeReadResponseModel} from "../../models/IncomeReadResponse.model";
import {IncomeUpdateRequestModel} from "../../models/IncomeUpdateRequest.model";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private incomeCreateApiUrl : string = "http://localhost:8080/expantra/income/create";
  private incomeReadApiUrl : string = "http://localhost:8080/expantra/income/read";
  private incomeUpdateApiUrl : string = "http://localhost:8080/expantra/income/update";
  private incomeDeleteApiUrl : string = "http://localhost:8080/expantra/income/delete/";

  public incomeCreate(
    incomesCreateRequest : IncomeCreateRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.incomeCreateApiUrl, incomesCreateRequest);
  }

  public getIncome(
    incomesReadRequest : IncomeReadRequestModel
  ) : Observable<IncomeReadResponseModel[]> {
    return this.httpClient.post<IncomeReadResponseModel[]>(this.incomeReadApiUrl, incomesReadRequest);
  }

  public incomeUpdate(
    incomesUpdateRequest : IncomeUpdateRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.incomeUpdateApiUrl, incomesUpdateRequest);
  }

  public incomeDelete(
    incomeIdToDelete : number
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.delete<PositiveResponseModel>(this.incomeDeleteApiUrl+incomeIdToDelete);
  }

}
