import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NetAmountResponseModel} from "../../models/NetAmountResponseModel";

@Injectable({
  providedIn: 'root'
})
export class NetamountService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  private netAmountApiUrl : string = "http://localhost:8080/expantra/netamount/";

  public getNetAmount(
    userId : number
  ) : Observable<NetAmountResponseModel> {
    return this.httpClient.get<NetAmountResponseModel>(this.netAmountApiUrl+userId);
  }

}
