export default class Call {
  id: string;
  companyId: string;
  callType: string;
  status: string;
  attendantId: string;
  duration: number;
  createdAt: Date;

  constructor(
    id: string,
    companyId: string,
    callType: string,
    status: string,
    attendantId: string,
    duration: number,
    createdAt: Date
  ) {
    this.id = id;
    this.companyId = companyId;
    this.callType = callType;
    this.status = status;
    this.attendantId = attendantId;
    this.duration = duration;
    this.createdAt = createdAt;

    this.validate();
  }

  private validate(): void {
    if (
      this.status !== "waiting" &&
      this.status !== "ongoing" &&
      this.status !== "answered" &&
      this.status !== "finished" &&
      this.status !== "missed"
    ) {
      throw new Error("Invalid status.");
    }
  }

  answerCall(attendantId: string): void {
    if (this.status === "waiting") {
      this.status = "ongoing";
      this.attendantId = attendantId;
    }
  }

  finishCall(): void {
    this.status = "finished";
  }

  isFinished(): boolean {
    return this.status === "finished";
  }

  isMissed(): boolean {
    return this.status === "missed";
  }

  isAnswered(): boolean {
    return this.status === "answered";
  }

  isWaiting(): boolean {
    return this.status === "waiting";
  }

  isOngoing(): boolean {
    return this.status === "ongoing";
  }
}
