export interface ILanguage {
  key: string;
  name: string;
}

export type GetTranslationValue = (
  key: string,
  options?: Record<string, any>,
) => string;
