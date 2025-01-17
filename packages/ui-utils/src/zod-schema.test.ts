import { z } from 'zod';
import { zodSchema } from './zod-schema';

describe('zodSchema', () => {
  describe('json schema conversion', () => {
    it('should create a schema with simple types', () => {
      const schema = zodSchema(
        z.object({
          text: z.string(),
          number: z.number(),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should support optional fields in object', () => {
      const schema = zodSchema(
        z.object({
          required: z.string(),
          optional: z.string().optional(),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should support optional fields with descriptions in object', () => {
      const schema = zodSchema(
        z.object({
          required: z.string().describe('Required description'),
          optional: z.string().optional().describe('Optional description'),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should support arrays', () => {
      const schema = zodSchema(
        z.object({
          items: z.array(z.string()),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should support optional arrays', () => {
      const schema = zodSchema(
        z.object({
          items: z.array(z.string()).optional(),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should support required enums', () => {
      const schema = zodSchema(
        z.object({
          type: z.enum(['a', 'b', 'c']),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should support optional enums', () => {
      const schema = zodSchema(
        z.object({
          type: z.enum(['a', 'b', 'c']).optional(),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });

    it('should duplicate referenced schemas (and not use references)', () => {
      const Inner = z.object({
        text: z.string(),
        number: z.number(),
      });

      const schema = zodSchema(
        z.object({
          group1: z.array(Inner),
          group2: z.array(Inner),
        }),
      );

      expect(schema.jsonSchema).toMatchSnapshot();
    });
  });
});