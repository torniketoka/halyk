import {Injectable} from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ToastService {

    constructor(
        private toast: ToastController,
      ) { }
    
      async presentToast(message: string) {
        const toast = await this.toast.create({
          message: message,
          duration: 3000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
      }
}
