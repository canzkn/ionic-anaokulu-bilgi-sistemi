import { Injectable } from '@angular/core';
import { SQLService } from '../../services/sql/sql.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantService } from '../../services/constant/constant.service'
import { Observable, BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  activeStudent = new BehaviorSubject(null)

  student = {}

  constructor(
    private constantService: ConstantService,
    private http: HttpClient,
    private sqlService: SQLService
  ) { }

  // Insert student to SQLite DB
  addStudentDB(post_data)
  {
    return this.sqlService.db.executeSql('INSERT INTO students (StudentID, StudentName, StudentBirthday, StudentSize, StudentKilo, StudentPicture, StudentClass) VALUES ("' + post_data.StudentID + '", "'+post_data.StudentName+'", "'+post_data.StudentBirthday+'", "'+post_data.StudentSize+'", "'+post_data.StudentKilo+'", "'+post_data.StudentPicture+'", "'+post_data.StudentClass+'")', [])
            .then(() => {
              console.log('Student Inserted!');
              this.loadStudent()
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });
  }

  // update student to SQLiteDB
  updateStudentDB(post_data)
  {
    return this.sqlService.db.executeSql('UPDATE students SET StudentBirthday = "'+post_data.StudentBirthday+'", StudentSize = "'+post_data.StudentSize+'", StudentKilo = "'+post_data.StudentKilo+'", StudentPicture = "'+post_data.StudentPicture+'", StudentClass = "'+post_data.StudentClass+'" WHERE StudentID = "' + post_data.StudentID + '"', [])
            .then(() => {
              console.log('Student Updated!');
              this.loadStudent()
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });
  }

  // update student on cloud
  updateStudentOnCloud(res, post_data): Observable<any>
  {
    return this.http.post(this.constantService.API_URL + 'student/update', post_data , {
      headers: {'Authorization': 'StudentID='+ res.username +';  UserID='+ res.user_id +'; token='+ res.token +';'}
    })
  }

  // isStudentInDB
  isStudentInDB(id) : Promise<any>
  {
    return this.sqlService.db.executeSql('SELECT COUNT(*) as result FROM students WHERE StudentID = "'+id+'"', [])
            .then((data) => {
              console.log('Select works!');
              return {
                result: data.rows.item(0).result
              }
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });

  }

  // Get student from api
  getStudent(res): Observable<any>
  {
    return this.http.get(this.constantService.API_URL + 'student', {
        headers: {'Authorization': 'StudentID='+ res.username +';  UserID='+ res.user_id +'; token='+ res.token +';'}
      })
  }

  // get student from sqlite
  getStudentFromDB()
  {
    return this.sqlService.db.executeSql('SELECT * FROM students', []).then(
      data => {
        if(data.rows.length > 0){
          return {
            StudentID : data.rows.item(0).StudentID,
            StudentName : data.rows.item(0).StudentName,
            StudentBirthday : data.rows.item(0).StudentBirthday,
            StudentSize : data.rows.item(0).StudentSize,
            StudentKilo : data.rows.item(0).StudentKilo,
            StudentPicture : data.rows.item(0).StudentPicture,
            StudentClass : data.rows.item(0).StudentClass
          }
        }
      }
    )
  }

  // load Student
  loadStudent()
  {
    return this.sqlService.db.executeSql('SELECT * FROM students', []).then(
      data => {
        if(data.rows.length > 0){
          this.student = data.rows.item(0)
          this.activeStudent.next(data.rows.item(0))
        }
      }
    )
  }
}
