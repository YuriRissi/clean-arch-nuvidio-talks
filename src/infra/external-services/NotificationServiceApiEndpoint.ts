import NotificationService from "../../application/interfaces/NotificationService";

export default class NotificationServiceApiEndpoint implements NotificationService {
    async callAnswered(call: any): Promise<void> {
        fetch("https://api.example.com/notify", {
            method: "POST",
            body: JSON.stringify({
                callId: call.id,
                message: "Call was answered",
            }),
        });
    }
}