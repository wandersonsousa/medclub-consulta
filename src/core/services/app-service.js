import { SPECIALITIES } from "../mocks/specialities";
import { LOCALS } from "../mocks/locals";
import { DISPONIBLE_DATE } from "../mocks/disponible_date";

export class AppService {
  getConstants() {
    return {
      SPECIALITIES,
      LOCALS,
      DISPONIBLE_DATE,
    };
  }
}
