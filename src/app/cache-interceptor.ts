import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // // const httpRequest = req.clone({
    // //   headers: req.headers.set('cache-control', 'max-age=600')
    // // });

    return next.handle(req);
  }
}