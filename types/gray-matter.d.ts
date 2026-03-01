declare module 'gray-matter' {
  interface GrayMatterFile<T = Record<string, unknown>> {
    data: T;
    content: string;
    excerpt?: string;
    orig: string;
  }

  interface GrayMatterOptions {
    excerpt?: boolean | ((file: GrayMatterFile, options: GrayMatterOptions) => string);
    excerpt_separator?: string;
    engines?: Record<string, unknown>;
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter(input: string | Buffer, options?: GrayMatterOptions): GrayMatterFile;
  
  export = matter;
}