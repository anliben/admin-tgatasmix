import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  count: number = 1;

  constructor(private db: AngularFirestore) { }

  getAll(collection: string) {
    return this.db.collection(collection)
  }

  getWhere(collection: string, field: string, operator: any, value: any) {
    return this.db.collection(collection, ref => ref.where(field, operator, value));
  }
  
  deleteEstado(data:any) {
    return this.db.collection("pais").doc(data).delete();
  }

  deleteCidade(data:any) {
    return this.db.collection("estados").doc(data).delete();
  }

  deletePlanos(data:any) {
    return this.db.collection("planos").doc(data).delete();
  }

  update(data:any){
    if(this.count === 1){
      console.log(this.count);
      const dataObject = {...data};
      this.db.doc('anunciantes/'+ data.id).update(dataObject);
      this.count++;
    }
  }

}
