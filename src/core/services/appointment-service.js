export class AppointmentService {
  constructor(appointmentRepository) {
    this._appointmentRepository = appointmentRepository;
  }
  async save(appointment) {
    await this._appointmentRepository.save(appointment);
  }

  async list() {
    return await this._appointmentRepository.list();
  }

  async delete(id) {
    return await this._appointmentRepository.delete(id);
  }
}
