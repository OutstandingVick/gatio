/** Read a single string value from Next's searchParams. */
export function firstParam(value: string | string[] | undefined): string | null {
  const v = Array.isArray(value) ? value[0] : value;
  return v && /^[a-z0-9-]{1,96}$/.test(v) ? v : null;
}
