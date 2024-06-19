export interface ExpensesCreateRequestModel {

  userId : number;

  email : string;

  expenseName : string;

  expenseDescription : string;

  expenseCategory : string;

  expenseAmount : number;

  expenseCreatedBy : string;

}
