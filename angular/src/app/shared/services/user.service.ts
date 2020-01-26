import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Boss } from '../models/boss';
import { JobParameters } from '../models/JobParameters';
import { Observable, Subject } from 'rxjs';
import { ResponseContentType } from '@angular/http/public_api';
import { AppComponent } from 'src/app/app.component';
// import { ResponseContentType } from '@angular/http';
@Injectable()
export class UserService {

    isUser: boolean = false;
    user: User = new User();
    boss: Boss = new Boss();
    apiURL: string = 'http://localhost:53790/api/users';
    httpClient: any;
    userObs: Subject<User> = new Subject();
    httpOptions;
    constructor(public http: HttpClient) {
        var id = localStorage.getItem("UserId");
        var password = localStorage.getItem("token");
        if (id != null) {
            if (!localStorage.getItem("isBoss"))

                this.getByUserIdPassword(parseInt(id), password).subscribe(res => {
                    debugger
                    this.setUser(res);

                    this.user = res;
                    this.boss = null;

                })
            else {
                this.getByBossIdPassword(parseInt(id), password).subscribe(res => {
                    this.setBoss(res);
                    this.boss = res;
                    this.user = null;

                })

            }
        }
        // this.getHttpOptions();
        // this.getCurrentUser();
        //    var idBoss=localStorage.getItem("BossId");
        //    if(idBoss!=null)
        //   this.GetBossById(Number(idBoss)).subscribe((res:Boss)=>{
        //       this.boss=res;
        //       if(this.user!=null)
        //       this.user=null;
        //   })

    }
     getByBossIdPassword(id, password): Observable<Boss> {
        if (!id || !password)
            return null;
        return this.http.get<Boss>(this.apiURL + `/GetBossDetails/` + id + '/' + password);
    }

    // getCurrentUser() {
    //     this.getLoggedUser().subscribe((res: any) => {
    //         this.user = res;
    //     })

    // }
    getByUserIdPassword(id, password): Observable<User> {
        if (!id || !password)
        return null;
        return this.http.get<User>(this.apiURL + `/GetUserDetails/` + id + '/' + password);

    }

    // getLoggedUser() {
    //     return this.http.get(this.apiURL + '/getLoggedUser', this.httpOptions)
    // }
    // getHttpOptions() {

    //     this.resetToken();
    //     var token = localStorage.token;
    //     if (token)
    //         this.changeToken(token);
    // }

    changeToken(token: string) {
        this.httpOptions.headers =
            new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + token });

    }

    resetToken() {
        this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '' }) };
    }



    setUser(data) {
        this.user = data;
        this.userObs.next(data);
    }

    setBoss(data) {
        this.boss = data;
        // this.userObs.next(data);
    }

    sendFile(file): any {
        return this.http.post(`${this.apiURL}/file`, file);
    }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }
    login(user: User) {
        return this.http.post<User>(`${this.apiURL}/login`, user)

        this.isUser = true;

    }
    loginBoss(boss: Boss) {

        return this.http.post<Boss>(`${this.apiURL}/loginBoss`, boss);
        this.isUser = true;
    }
    loginAdmin() {
       
        return this.http.get(`${this.apiURL}/loginAdmin`);
        debugger;
      }
    

    getById(id: number) {
        return this.http.get<User>(`${this.apiURL}/GetUser/` + id);
    }
    GetBossById(id: number) {
        this.user = null;
        return this.http.get<Boss>(`${this.apiURL}/GetBossById/` + id);

    }

    register(user: User) {
        return this.http.post<User>(`${this.apiURL}/registerUser`, user);
        this.isUser = true;
    }

    registerBoss(boss: Boss, password) {
        boss.BossPassword = password;
        return this.http.post<Boss>(`${this.apiURL}/registerBoss`, boss);
        this.isUser = true;
    }
    updateUser(user: User) {
        return this.http.post<User>(`${this.apiURL}/EditUser`, user);
    }
    updateBoss(user: Boss) {
        return this.http.post<Boss>(`${this.apiURL}/EditUser`, user);
    }
    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

    keepBoss(currentBoss: Boss): any {
        this.boss = currentBoss;

    }
    getUserName(mail: string) {
        return this.http.get<string>(`${this.apiURL}/getUserName` + '/' + mail);
    }

    connect(name: string, details: string, mail: string, phone: string, subject: string) {
        return this.http.get(`${this.apiURL}/connect/` + mail + '/' + phone + '/' + name + '/' + details + '/' + subject);
    }

    registerToJob(idJob: number, userId: number): any {
        return this.http.get(`${this.apiURL}/registerToJob` + '/' + idJob + '/' + userId);
    }
    getCV(userId: number): Observable<string> {
        return this.http.get<string>(`${this.apiURL}/getCv` + '/' + userId);

    }

    countEnterUser(){
        return this.http.get(`${this.apiURL}/countEnterUser`);
      }

    //   downloadPDF(url): any {
    //     const options = { responseType: ResponseContentType.Blob  };
    //     return this.http.get(url, options).map(
    //     (res) => {
    //         return new Blob([res.blob()], { type: 'application/pdf' });
    //     });
    //   }


    resetPassword(mail: string, password: string): Observable<User> 
    {
        return this.http.get<User>(`${this.apiURL}/changePassword` + '/' + mail + '/' + password);
    }
u:User=new User();
    resetMail(mail:string)
    {
        this.u.UserMail=mail;
        return this.http.post<Boolean>(`${this.apiURL}/resetMail` , this.u);
    }
}




