import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tgatasmix';
  
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this._initTranslate();
  }

  private _initTranslate(): void {
    this.translate.setDefaultLang('pt');
    if (this.translate.getBrowserLang() !== undefined) {
      let tr: any = this.translate.getBrowserLang()?.toString();
      this.translate.use(tr);
    } else {
      this.translate.use('pt');
    }
  }
}
