import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UpdateRequestModel} from "../../models/UpdateRequestModel";
import {UpdateResponseModel} from "../../models/UpdateResponseModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private updateApiUrl : string = "http://localhost:8080/expantra/update";

  public updateUser(
    updateRequest :  UpdateRequestModel
  ) : Observable<UpdateResponseModel> {
    return this.httpClient.post<UpdateResponseModel>(this.updateApiUrl,updateRequest);
  }

}
