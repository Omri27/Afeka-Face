import { AfekaFacePage } from './app.po';

describe('afeka-face App', function() {
  let page: AfekaFacePage;

  beforeEach(() => {
    page = new AfekaFacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
