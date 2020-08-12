import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  repos: any;
  constructor(private http: HttpClient) { }


  // To get details
  getDetails(data) {
    return this.http.get('https://restcountries.eu/rest/v2/region/' + data);
  }

  // get all users api
  getAllUsers(){
    return this.http.get('https://api.github.com/users');
  }

  // search api
  searchUser(userName){
    return this.http.get('https://api.github.com/search/users?q='+ userName);
  }

// get all repostories
  getRepos(repo_url){
    return this.http.get(repo_url);
  }

  // set data
  setUserRepos(data) {
    this.repos = data;
  }

  // get data
  getUserRepos() {
    return this.repos;
  }
}
