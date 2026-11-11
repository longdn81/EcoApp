export const API_BASE_URL = 'http://localhost:3000/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiRequestBody =
  | BodyInit
  | Record<string, unknown>
  | unknown[]
  | null
  | undefined;

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: ApiRequestBody;
  params?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (!params) {
    return `${API_BASE_URL}${cleanEndpoint}`;
  }

  const search = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  );

  return `${API_BASE_URL}${cleanEndpoint}?${search.toString()}`;
}

async function request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { params, headers, body, ...rest } = options;
  const url = buildUrl(endpoint, params);

  const normalizedBody =
    body === undefined || body === null
      ? undefined
      : typeof body === 'string' || body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob || body instanceof ArrayBuffer || ArrayBuffer.isView(body)
        ? (body as BodyInit)
        : (JSON.stringify(body) as BodyInit);

  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: normalizedBody,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) =>
    request<T>(endpoint, { method: 'GET', params }),
  post: <T>(endpoint: string, body?: ApiRequestBody) => request<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body?: ApiRequestBody) => request<T>(endpoint, { method: 'PUT', body }),
  patch: <T>(endpoint: string, body?: ApiRequestBody) => request<T>(endpoint, { method: 'PATCH', body }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

export type ApiClient = typeof apiClient;
