import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Datetime } from "../lib/Datetime";

const _STORE_KEY = "@appointments";

export class AppointmentRepository {
  async save(
    appointment = {
      local_id: "",
      nm_bairro: "",
      nm_local: "",
      phone: "",
      price: "",
      specialist: "",
      stars: "",
      day: "",
      dayName: "",
      month: "",
      speciality: {
        aq_foto: "",
        id: "",
        ie_tipo: "",
        nm_especialidade: "",
        slug: "",
      },
    }
  ) {
    appointment.id = uuid.v4();
    const createdAt = Datetime().unix();
    appointment.createdAt = createdAt;

    const appointments = await this.list();
    appointments.push(appointment);
    await AsyncStorage.setItem(_STORE_KEY, JSON.stringify(appointments));
  }

  async list() {
    const item = await AsyncStorage.getItem(_STORE_KEY);
    if (!item) {
      return [];
    }

    return JSON.parse(item);
  }

  async delete(id) {
    const appointments = await this.list();
    const filtered = appointments.filter((item) => item.id !== id);
    await AsyncStorage.setItem(_STORE_KEY, JSON.stringify(filtered));
  }

  async get(id) {
    const item = await AsyncStorage.getItem(_STORE_KEY);
    if (!item) {
      return null;
    }
    return JSON.parse(item.find((item) => item.id === id));
  }
}
