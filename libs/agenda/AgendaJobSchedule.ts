
export class AgendaJobSchedule {
  name: string; // Name of the type to create the instance from
  interval: string; // Interval in which job should be invoked (human-interval, can also be a date string for 'once')
  data: {
    // (optional) default: {}
    headers?: object; // Http headers, e.g. { Authorization: '<token>' }
    params?: string; // An object i.e. { param1: 'value1' } used to replace path parameters `http://mydommain.com:3333/test/:param1` => `http://mydommain.com:3333/test/value1` notations in the job definition's url.
    query?: string; // An object i.e. { foo: 'bar', baz: 'qux' } used to create query parameters (http://mydommain.com:3333/test/value1?foo=bar&baz=qux)
    body?: object; // Accompanying data sent along the request
  };
  options?: {
    // (optional) Enables passing options to the `every` method in agenda as documented [here](https://github.com/agenda/agenda#repeateveryinterval-options)
    timezone?: string; // Specify the job execution timezone.
    skipImmediate?: boolean; // Don't execute job immidiatly default is `false`.
  };
}
