import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { eldr } from '../index';

describe('eldr', () => {
  test('loads successfully', () => {
    expect(typeof eldr).toBe('object');
  });

  test('uses the medium size ngram file by default', () => {
    expect(eldr.info()).toHaveProperty('Data type', 'M60');
  });

  describe('detect', () => {
    test('detects a test sentence as spanish', () => {
      expect(eldr.detect('Hola, cómo te llamas?')).toHaveProperty('iso639_1', 'es');
    });

    describe('getScores', () => {
      test('returns more than one language result for a test sentence', () => {
        const scores = eldr.detect('Hola, cómo te llamas?').getScores();
        expect(Object.keys(scores).length).toBeGreaterThan(1);
      });
    });

    describe('small text', () => {
      test('detects the word `to` as english', () => {
        expect(eldr.detect('To')).toHaveProperty('iso639_1', 'en');
      });
    });

    describe('isReliable()', () => {
      test('returns true for a known good string', () => {
        expect(eldr.detect('Hola, cómo te llamas?').isReliable()).toBeTruthy();
      });
      test('returns false for a known bad string', () => {
        expect(eldr.detect('zxz zcz zvz zbz znz zmz zlz zsz zdz zkz zjz pelo').isReliable()).toBeFalsy();
      });
    });
  });

  describe('result', () => {
    test('contains the language name', () => {
      const languageResult = eldr.detect('Hola, cómo te llamas?');
      expect(languageResult).toHaveProperty('languageName');
      expect(languageResult.languageName).toBe('Spanish');
    });
  });
});

describe('eldr accuracy', () => {
  let languageTuples: string[][] = [];
  beforeAll(async () => {
    const bigTestFile = await readFile(resolve('benchmarks/big-test.txt'), 'utf8');
    languageTuples = bigTestFile.split('\n').map((lines) => lines.split('\t'));
  });

  test('accuracy is >= 99.4%', () => {
    let successCount = 0;
    let failCount = 0;
    for (const [iso639_1, text] of languageTuples) {
      if (eldr.detect(text).iso639_1 === iso639_1) {
        successCount++;
      } else {
        failCount++;
      }
    }
    expect(successCount + failCount).toBeGreaterThan(60000);
    expect((successCount / (successCount + failCount)) * 100).toBeGreaterThan(99.4);
  });
});
