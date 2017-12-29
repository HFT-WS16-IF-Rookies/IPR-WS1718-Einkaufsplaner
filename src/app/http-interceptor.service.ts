import { Injectable } from '@angular/core';
import
{
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Headers,
    Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService extends Http
{
    private router: Router;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router)
    {
        super (backend, defaultOptions);
        this.router = router;
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response>
    {
        return super.get(url, this.getRequestOptionArgs(options));
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>
    {
        return super.post(url, body, this.getRequestOptionArgs(options))
            .catch(res =>
            {
                if (res.status === 403)
                {
                    console.log("Access denied, move to login page now");
                    this.router.navigateByUrl('/login');
                }
                return Observable.throw(res);
            });
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>
    {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response>
    {
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs
    {
        if (options == null)
        {
            options = new RequestOptions();
        }
        if (options.headers == null)
        {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');

        return options;
    }

}
