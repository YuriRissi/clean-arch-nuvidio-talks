import { IsNotEmpty, IsString } from "class-validator";
import DTOsClassValidator from "../DTOsClassValidator";

export default class AnswerCallUseInputCaseDTO extends DTOsClassValidator {
  @IsString()
  @IsNotEmpty()
  callId: string;

  @IsString()
  @IsNotEmpty()
  attendantId: string;
}
