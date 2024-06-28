import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const jwtToken : string = sessionStorage.getItem('jwtToken')!;

  const cloneRequest = req.clone(
    {
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  return next(cloneRequest);
};
