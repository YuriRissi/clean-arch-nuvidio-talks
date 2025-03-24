import Attendant from "../entities/Attendant";

export default interface AttendantRepository {
    findById(id: string): Promise<Attendant>;
    listAvailableAttendants(companyId: string): Promise<Attendant[]>;
    save(attendant: Attendant): Promise<void>;
}