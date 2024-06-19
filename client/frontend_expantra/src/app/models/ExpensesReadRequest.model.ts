export interface ExpensesReadRequestModel {

  userId : number;

  email : string;

  expenseSearchName : string;

  sortBy : string;

  sortOrder : string;

  past : number;

}
