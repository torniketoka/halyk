import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "prettyIban"})
export class PrettyIbanPipe implements PipeTransform {
  transform(inputIban) {
    return inputIban.replace(/[^\dA-Z]/g, "").replace(/(.{4})/g, "$1 ").trim();
  }
}