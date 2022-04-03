import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})

export class LanguageService {
  private selected = "en"

  constructor(
    private translate: TranslateService,
  ) { }

  setInitialAppLanguage() {
    const language = "en"
    this.translate.setDefaultLang(language);
  }

  setLanguage(lng) {
    this.selected = lng;
    this.translate.use(lng);
  }

  getSelectedLanguage(){
    return this.selected;
  }
}
