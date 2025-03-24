import { IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from 'class-validator';
import DTOsClassValidator from '../DTOsClassValidator';

export default class ListWaitingCallsUseCaseInputDTO extends DTOsClassValidator {
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Max(100)
  @Min(1)
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Max(1000)
  @Min(0)
  take: number;
}
