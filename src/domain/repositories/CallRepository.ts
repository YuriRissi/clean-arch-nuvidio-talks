import Call from "../entities/Call";

export default interface CallRepository {
  findById(id: string): Promise<Call>;
  listWaitingCalls(
    page: number,
    take: number,
    companyId: string
  ): Promise<Call[]>;
  save(call: Call): Promise<void>;
}
