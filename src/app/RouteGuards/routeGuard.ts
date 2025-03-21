import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { LogInService } from "../services/log-in.service";

export const canActivate = (
    router : ActivatedRouteSnapshot,
    state : RouterStateSnapshot
) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable< boolean | UrlTree > => {

    const loginService = inject(LogInService);
    const route = inject(Router);

    return loginService.user.pipe(take(1), map((user) => {
        const restrictUser = user ? true : false;

        if(restrictUser){
            return true;
        }else{
            return route.createUrlTree(['/home']);
        }
    }))
}