import AnswerCallUseCase from "../../application/use-cases/AnswerCallUseCase";
import ListWaitingCallsUseCase from "../../application/use-cases/ListWaitingCallsUseCase";
import AnswerCallUseInputCaseDTO from "../dto/input/AnswerCallUseCaseInputDTO";
import ListWaitingCallsUseCaseInputDTO from "../dto/input/ListWaitingCallsUseCaseInputDTO";
import HttpServer from "../interfaces/HttpServer";

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly answerCallUseCase: AnswerCallUseCase,
    readonly listWaitingCallsUseCase: ListWaitingCallsUseCase
  ) {}

  setAllRoutes(): void {
    this.httpServer.addRoute({
      method: "patch",
      url: "call/answer/:callId",
      auth: "company",
      handle: async (request) => {
        const input = new AnswerCallUseInputCaseDTO();
        input.callId = request.params.callId as string;
        input.attendantId = request.body.attendantId as string;
        input.validate();

        await this.answerCallUseCase.execute(input);

        return {
          statusCode: 204,
        };
      },
    });

    this.httpServer.addRoute({
      method: "get",
      url: "call/list/waiting",
      auth: "company",
      handle: async (request) => {
        const input = new ListWaitingCallsUseCaseInputDTO();
        input.companyId = request.body.companyId as string;
        input.page = Number(request.query.page ?? 1);
        input.take = Number(request.query.take ?? 10);
        input.validate();

        const output = await this.listWaitingCallsUseCase.execute(input);

        return {
          statusCode: 200,
          body: { total: output.length, hooks: output },
        };
      },
    });
  }
}
