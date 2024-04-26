import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class NodeService {
    constructor(private http: HttpClient) { }

    public get(): Observable<Object> {
        return this.http.get("http://localhost:3000").pipe(map(res => res))
    }
}