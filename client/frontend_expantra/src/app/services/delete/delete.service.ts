import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PositiveResponseModel} from "../../models/PositiveResponse.model";

@Injectable({
  providedIn: 'root'
})

export class DeleteService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public deleteUser(
    idToDelete : number
  ) : Observable<PositiveResponseModel> {
    let deleteApiUrl : string = "http://localhost:8080/expantra/delete/"+idToDelete;
    return this.httpClient.delete<PositiveResponseModel>(deleteApiUrl);
  }

}
