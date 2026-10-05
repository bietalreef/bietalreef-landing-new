// Runtime boundary for the existing Deno Edge Function, checked separately from Next.
declare namespace Deno {
  const env: { get(name: string): string | undefined };
  function serve(handler: (req: Request) => Promise<Response> | Response): void;
}
