import { Pool } from "pg";
import Call from "../../domain/entities/Call";
import CallRepository from "../../domain/repositories/CallRepository";

export default class CallRepositoryPostgreSQL implements CallRepository {
  constructor(private pool: Pool) {}

  async findById(id: string): Promise<Call> {
    const { rows } = await this.pool.query<CallTable>(
      `SELECT * FROM calls WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`Call with id ${id} not found`);
    }
    const row = rows[0];
    return new Call(
      row.id,
      row.company_id,
      row.call_type,
      row.status,
      row.attendant_id,
      row.duration,
      row.created_at
    );
  }

  async listWaitingCalls(
    page: number,
    take: number,
    companyId: string
  ): Promise<Call[]> {
    const { rows } = await this.pool.query(
      `SELECT * FROM calls WHERE company_id = $1 AND status = 'waiting' ORDER BY created_at LIMIT $2 OFFSET $3`,
      [companyId, take, (page - 1) * take]
    );

    return rows.map(
      (row) =>
        new Call(
          row.id,
          row.company_id,
          row.call_type,
          row.status,
          row.attendant_id,
          row.duration,
          row.created_at
        )
    );
  }

  async save(call: Call): Promise<void> {
    await this.pool.query(
      `INSERT INTO calls (id, company_id, call_type, status, attendant_id, duration, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        call.id,
        call.companyId,
        call.callType,
        call.status,
        call.attendantId,
        call.duration,
        call.createdAt,
      ]
    );
  }
}

type CallTable = {
  id: string;
  company_id: string;
  call_type: string;
  status: string;
  attendant_id: string;
  duration: number;
  created_at: Date;
};
