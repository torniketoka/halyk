import { NgModule } from "@angular/core";
import {CountDownPipe} from './pipe/countDown.pipe';
import {PrettyIbanPipe} from './pipe/prettyIban.pipe';

@NgModule({
  declarations: [CountDownPipe, PrettyIbanPipe],
  imports: [],
  exports: [CountDownPipe, PrettyIbanPipe]
})
export class PipesModule {}