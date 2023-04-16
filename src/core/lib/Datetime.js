import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("pt-br");
const tz = "America/Sao_Paulo";
dayjs.tz.setDefault(tz);

export const Datetime = dayjs;
