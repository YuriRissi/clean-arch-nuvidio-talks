export default interface HttpServer {
  addRoute(config: RouteConfig): void;
}

export type RouteConfig = {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  auth: 'company' | 'microservice' | 'none';
  fileFields?: string[];
  handle: (request: HttpRequest) => Promise<HttpResponse>;
};

export type HttpResponse = {
  statusCode: number;
  body?: Record<string, unknown>;
};

export type HttpRequest = {
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
};
