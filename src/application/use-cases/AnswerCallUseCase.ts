import AttendantRepository from "../../domain/repositories/AttendantRepository";
import CallRepository from "../../domain/repositories/CallRepository";
import NotificationService from "../interfaces/NotificationService";

export default class AnswerCallUseCase {
  constructor(
    private readonly attendantRepository: AttendantRepository,
    private readonly callRepository: CallRepository,
    private readonly notificationService: NotificationService
  ) {}

  async execute(input: Input): Promise<void> {
    const attendant = await this.attendantRepository.findById(input.attendantId);

    if (!attendant.isAvailable()) {
        throw new Error("Attendant is not available.");
    }

    const call = await this.callRepository.findById(input.callId);
    
    if (!call.isWaiting()) {
        throw new Error("Call is not waiting.");
    }

    call.answerCall(input.attendantId);
    attendant.setAsBusy();

    await this.attendantRepository.save(attendant);
    await this.callRepository.save(call)
    await this.notificationService.callAnswered(call);
  }
}

type Input = {
  attendantId: string;
  callId: string;
};
