import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { SQLService } from '../../services/sql/sql.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantService } from '../../services/constant/constant.service'

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  parent = new BehaviorSubject(null)

  constructor(
    private constantService: ConstantService,
    private http: HttpClient,
    private sqlService: SQLService
  ) { }

  // Insert student to SQLite DB
  addParentDB(post_data)
  {
    return this.sqlService.db.executeSql('INSERT INTO parents (ParentID, ParentName, ParentPhoneNumber, ParentEmail, ParentJob, StudentID) VALUES ("'+post_data.ParentID+'", "'+post_data.ParentName+'", "'+post_data.ParentPhoneNumber+'", "'+post_data.ParentEmail+'", "'+post_data.ParentJob+'", "'+post_data.StudentID+'")', [])
            .then(() => {
              console.log('Parent Inserted!');
              this.loadParent()
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });
  }

  // update student to SQLiteDB
  updateParentDB(post_data)
  {
    return this.sqlService.db.executeSql('UPDATE parents SET ParentName = "'+post_data.ParentName+'", ParentPhoneNumber = "'+post_data.ParentPhoneNumber+'", ParentEmail = "'+post_data.ParentEmail+'", ParentJob = "'+post_data.ParentJob+'" WHERE StudentID = "' + post_data.StudentID + '"', [])
            .then(() => {
              console.log('Parent Updated!');
              this.loadParent()
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });
  }

  // update student on cloud
  updateParentOnCloud(res, post_data): Observable<any>
  {
    return this.http.post(this.constantService.API_URL + 'parent/update', post_data , {
      headers: {'Authorization': 'StudentID='+ res.username +';  UserID='+ res.user_id +'; token='+ res.token +';'}
    })
  }

  // load parent
  loadParent()
  {
    return this.sqlService.db.executeSql('SELECT * FROM parents', []).then(
      data => {
        if(data.rows.length > 0){
          this.parent.next(data.rows.item(0))
        }
      }
    )
  }

  // Get student from api
  getParent(res): Observable<any>
  {
    return this.http.get(this.constantService.API_URL + 'parent', {
        headers: {'Authorization': 'StudentID='+ res.username +';  UserID='+ res.user_id +'; token='+ res.token +';'}
      })
  }

  // is parent in db?
  isParentInDB(id) : Promise<any>
  {
    return this.sqlService.db.executeSql('SELECT COUNT(*) as result FROM parents WHERE StudentID = "'+id+'"', [])
            .then((data) => {
              return {
                result: data.rows.item(0).result
              }
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });

  }
}
