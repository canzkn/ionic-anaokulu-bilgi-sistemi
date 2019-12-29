import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantService } from '../../services/constant/constant.service'
import { Observable, BehaviorSubject } from 'rxjs'
import { SQLService } from '../../services/sql/sql.service';
import { Teacher } from '../../models/teacher.model'

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  teachers = new BehaviorSubject([]);
  favorites = new BehaviorSubject([]);

  constructor(
    private constantService: ConstantService,
    private http: HttpClient,
    private sqlService: SQLService
  ) { }

  // Get Teachers
  getTeachers(): Observable<Teacher[]>
  {
    return this.teachers.asObservable();
  }

  // Get Favorites
  getFavorites(): Observable<Teacher[]>
  {
    return this.favorites.asObservable();
  }

  // Get all teachers from api
  getTeachersCloud(res): Observable<Teacher[]>
  {
    return this.http.get<Teacher[]>(this.constantService.API_URL + 'teachers', {
        headers: {'Authorization': 'StudentID='+ res.username +';  UserID='+ res.user_id +'; token='+ res.token +';'}
      })
  }

  // Add Teacher to DB
  addTeacherToDB(post_data)
  {
    return this.sqlService.db.executeSql('INSERT INTO teachers (TeacherID, TeacherName, TeacherDepartment, TeacherPicture, favorite) VALUES ("'+post_data.TeacherID+'","'+post_data.TeacherName+'","'+post_data.TeacherDepartment+'","'+post_data.TeacherPicture+'","'+post_data.favorite+'")', [])
            .then(() => {
              console.log('Teacher Added!');
              this.loadTeachers();
              this.loadFavorites();
            })
            .catch(e => {
              alert("error " + JSON.stringify(e))
            });
  }

  // clear all teacher in db
  clearTeacherInDB()
  {
    return this.sqlService.db.executeSql('DELETE FROM teachers', []).then(data => {
      console.log("teachers delete")
    })
  }

  // load favorite teachers
  loadFavorites()
  {
    return this.sqlService.db.executeSql('SELECT * FROM teachers WHERE favorite = 1', []).then(data => {
      let teachers: Teacher[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          teachers.push({ 
            TeacherID : data.rows.item(i).TeacherID,
            TeacherName : data.rows.item(i).TeacherName,
            TeacherDepartment : data.rows.item(i).TeacherDepartment,
            TeacherPicture : data.rows.item(i).TeacherPicture,
            favorite : data.rows.item(i).favorite,
           });
        }
      }
      this.favorites.next(teachers);
    });
  }

  // load teachers
  loadTeachers()
  {
    return this.sqlService.db.executeSql('SELECT * FROM teachers', []).then(data => {
      let teachers: Teacher[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          teachers.push({ 
            TeacherID : data.rows.item(i).TeacherID,
            TeacherName : data.rows.item(i).TeacherName,
            TeacherDepartment : data.rows.item(i).TeacherDepartment,
            TeacherPicture : data.rows.item(i).TeacherPicture,
            favorite : data.rows.item(i).favorite,
           });
        }
      }
      this.teachers.next(teachers);
    });
  }

  //add fav
  updateFavoriteCLOUD(res, post_data): Observable<any[]>
  {
    return this.http.post<any[]>(this.constantService.API_URL + 'teachers/update', post_data, {
      headers: {'Authorization': 'StudentID='+ res.username +';  UserID='+ res.user_id +'; token='+ res.token +';'}
    })
  }

  updateTeacherInDB(post_data)
  {
    return this.sqlService.db.executeSql('UPDATE teachers SET TeacherName = "'+post_data.TeacherName+'", TeacherDepartment = "'+post_data.TeacherDepartment+'", TeacherPicture = "'+post_data.TeacherPicture+'", favorite = "'+post_data.favorite+'" WHERE TeacherID = "'+post_data.TeacherID+'"', []).then(data => {
      console.log("favori için güncellendi.")
    })
  }
}
