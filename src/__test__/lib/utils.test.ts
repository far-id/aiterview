import { cn, normalizeConversationText, formatSecondsToMMSS } from '@/lib/utils';

describe('normalizeConversationText', () => {
  test('should trim whitespace at start and end', () => {
    const input = '   hello world   ';
    const result = normalizeConversationText(input);

    expect(result).toBe('hello world');
  });

  test(String.raw`should replace escaped newline (\n) with actual newline`, () => {
    const input = String.raw`hello\\n world`;
    const result = normalizeConversationText(input);

    expect(result).toBe('hello\\\nworld');
  });

  test('should remove wrapping quotes', () => {
    const input = '"hello world"';
    const result = normalizeConversationText(input);

    expect(result).toBe('hello world');
  });

  test('should merge concatenated string patterns', () => {
    const input = '"hello" + "world"';
    const result = normalizeConversationText(input);

    expect(result).toBe('helloworld');
  });

  test('should handle mixed normalization correctly', () => {
    const input = `
      "Saya pernah memimpin tim" +
      " di proyek besar" \\n
    `;
    const result = normalizeConversationText(input);

    expect(result).toBe('"Saya pernah memimpin tim di proyek besar"');
  });

  test('should return empty string when input is empty', () => {
    const result = normalizeConversationText('');
    expect(result).toBe('');
  });
});

describe('formatSecondsToMMSS', () => {
  test('Should format 0 seconds as 00:00', () => {
    expect(formatSecondsToMMSS(0)).toBe('00:00');
  });

  test('Should format seconds less than 10 correctly', () => {
    expect(formatSecondsToMMSS(5)).toBe('00:05');
  });

  test('Should format seconds less than a minute', () => {
    expect(formatSecondsToMMSS(59)).toBe('00:59');
  });

  test('Should format exactly 60 seconds as 01:00', () => {
    expect(formatSecondsToMMSS(60)).toBe('01:00');
  });

  test('Should format seconds above a minute', () => {
    expect(formatSecondsToMMSS(61)).toBe('01:01');
  });

  test('Should format seconds greater than 60 correctly', () => {
    expect(formatSecondsToMMSS(125)).toBe('02:05');
  });

  test('Should format double digit minutes', () => {
    expect(formatSecondsToMMSS(600)).toBe('10:00');
  });

  test('Should format maximum under one hour', () => {
    expect(formatSecondsToMMSS(3599)).toBe('59:59');
  });
});

describe('cn (class name merge utility)', () => {
  test('Should merge simple class strings', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  test('Should ignore false conditional classes', () => {
    expect(cn('text-sm', false && 'hidden')).toBe('text-sm');
  });

  test('Should include true conditional classes', () => {
    expect(cn('text-sm', true && 'font-bold')).toBe('text-sm font-bold');
  });

  test('Should handle array input', () => {
    expect(cn(['text-sm', 'font-bold'])).toBe('text-sm font-bold');
  });

  test('Should handle object input', () => {
    expect(cn({ hidden: false, block: true })).toBe('block');
  });

  test('Should resolve tailwind class conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  test('Should keep non-conflicting tailwind classes', () => {
    expect(cn('p-2', 'px-4')).toBe('p-2 px-4');
  });

  test('Should handle empty or falsy inputs', () => {
    expect(cn(undefined, null, false)).toBe('');
  });
});
