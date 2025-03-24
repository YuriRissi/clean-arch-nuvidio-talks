import Call from "../../domain/entities/Call";
import CallRepository from "../../domain/repositories/CallRepository";

export default class ListWaitingCallsUseCase {
  constructor(private readonly callRepository: CallRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.callRepository.listWaitingCalls(
      input.page,
      input.take,
      input.companyId
    );
  }
}

type Input = {
  page: number;
  take: number;
  companyId: string;
};

type Output = Array<Call>;
