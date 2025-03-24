export default class Attendant {
  id: string;
  companyId: string;
  name: string;
  status: string;

  constructor(id: string, companyId: string, name: string, status: string) {
    this.id = id;
    this.companyId = companyId;
    this.name = name;
    this.status = status;

    this.validate();
  }

  private validate() : void {
    if (this.status !== "available" && this.status !== "busy") {
      throw new Error("Invalid status.");
    }
  }

  setAsBusy(): void {
    this.status = "busy";
  }

  setAsAvailable(): void {
    this.status = "available";
  }

  isAvailable(): boolean {
    return this.status === "available";
  }
}
