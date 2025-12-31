import { validateRequest } from '@/lib/validateRequest';
import { NextRequest } from 'next/server';
import { z } from 'zod';

function createRequest(body: any) {
  return new Request('http://localhost/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  }) as unknown as NextRequest;
}


describe('validateRequest', () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  });

  test('should fail when JSON body is invalid', async () => {
    // invalid JSON (string mentah)
    const request = createRequest('{ invalid json');

    const result = await validateRequest(request, schema);

    expect(result.success).toBe(false);

    if (!result.success) {
      const json = await result.response.json();
      expect(result.response.status).toBe(400);
      expect(json.error).toBe('Invalid JSON body');
    }
  });

  test('should fail when payload does not match schema', async () => {
    const request = createRequest({
      name: 'Farid', // age missing
    });

    const result = await validateRequest(request, schema);

    expect(result.success).toBe(false);

    if (!result.success) {
      const json = await result.response.json();

      expect(result.response.status).toBe(400);
      expect(json.error).toBe('Invalid request payload');
      expect(json.details).toBeDefined();
      expect(json.details[0]).toHaveProperty('field');
      expect(json.details[0]).toHaveProperty('message');
    }
  });

  test('should return parsed data when payload is valid', async () => {
    const payload = {
      name: 'Farid',
      age: 23,
    };

    const request = createRequest(payload);

    const result = await validateRequest(request, schema);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(payload);
    }
  });
});
