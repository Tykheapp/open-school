
export class AgendaJob {
  name: string;
  url: string;
  method: string;
  callback?: {
    url: string;
    method: string;
    headers: string;
  };
}
