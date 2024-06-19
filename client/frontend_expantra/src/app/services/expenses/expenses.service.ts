import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExpensesCreateRequestModel} from "../../models/ExpensesCreateRequest.model";
import {Observable} from "rxjs";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";
import {ExpensesReadRequestModel} from "../../models/ExpensesReadRequest.model";
import {ExpensesReadResponseModel} from "../../models/ExpensesReadResponse.model";
import {ExpensesUpdateRequestModel} from "../../models/ExpensesUpdateRequest.model";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private expenseCreateApiUrl : string = "http://localhost:8080/expantra/expenses/create";
  private expenseReadApiUrl : string = "http://localhost:8080/expantra/expenses/read";
  private expenseUpdateApiUrl : string = "http://localhost:8080/expantra/expenses/update";
  private expenseDeleteApiUrl : string = "http://localhost:8080/expantra/expenses/delete/";

  public expenseCreate(
    expensesCreateRequest : ExpensesCreateRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.expenseCreateApiUrl, expensesCreateRequest);
  }

  public getExpenses(
    expensesReadRequest : ExpensesReadRequestModel
  ) : Observable<ExpensesReadResponseModel[]> {
    return this.httpClient.post<ExpensesReadResponseModel[]>(this.expenseReadApiUrl, expensesReadRequest);
  }

  public expenseUpdate(
    expensesUpdateRequest : ExpensesUpdateRequestModel
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.post<PositiveResponseModel>(this.expenseUpdateApiUrl, expensesUpdateRequest);
  }

  public expenseDelete(
    expenseIdToDelete : number
  ) : Observable<PositiveResponseModel> {
    return this.httpClient.delete<PositiveResponseModel>(this.expenseDeleteApiUrl+expenseIdToDelete);
  }

}
