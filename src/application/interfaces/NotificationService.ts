import Call from "../../domain/entities/Call";

export default interface NotificationService {
    callAnswered(call: Call): Promise<void>;
}