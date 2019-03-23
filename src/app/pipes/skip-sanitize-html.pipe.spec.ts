import { SkipSanitizeHtmlPipe } from './skip-sanitize-html.pipe';

describe('SkipSanitizeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SkipSanitizeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
