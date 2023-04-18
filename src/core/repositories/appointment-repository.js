import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Datetime } from "../lib/Datetime";

const _STORE_KEY = "@appointments";

export class AppointmentRepository {
  async save(
    appointment = {
      local_id: "",
      date_id: "",
      speciality: {
        aq_foto: "",
        id: "",
        ie_tipo: "",
        nm_especialidade: "",
        slug: "",
      },
    }
  ) {
    const appointments = await this.list();

    // If there is no id, create a new appointment
    if (!appointment.id) {
      appointment.id = uuid.v4();
      const createdAt = Datetime().unix();
      appointment.createdAt = createdAt;

      appointments.push(appointment);
      await AsyncStorage.setItem(_STORE_KEY, JSON.stringify(appointments));

      return appointment;
    }

    const apIndex = appointments.findIndex((ap) => ap.id === appointment.id);
    if (apIndex < 0) {
      throw new Error("appointment not found to update");
    }

    // Here should exist a validation to update just allowed fields, going to do this way for simplicity
    const updatedAt = Datetime().unix();
    const updatedAppointment = {
      ...appointments[apIndex],
      ...appointment,
      updatedAt,
    };

    appointments[apIndex] = updatedAppointment;
    await AsyncStorage.setItem(_STORE_KEY, JSON.stringify(appointments));
    return updatedAppointment;
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
