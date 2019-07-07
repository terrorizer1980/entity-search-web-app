import { SearchBox } from './search.po';
import { browser, until, by, $$, $ } from 'protractor';

describe('@senzing/entity-search-webapp: Suite 1 - Search tests', () => {
  let search: SearchBox;

  beforeEach(() => {
    search = new SearchBox();
  });

  it('should have search box', () => {
    search.navigateTo();
    expect(search.getSearchComponent().isPresent()).toBeTruthy();
  });

  it('should be able to search by name', () => {
    search.setSearchInputName('Jenny Smith');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    expect(search.getSearchResults().count()).toEqual(1);
  });

  it('search for "Jenny Smith"', (done) => {
    search.clearSearchResults();
    search.setSearchInputName('Jenny Smith');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    search.getTopSearchResultName().then((res) => {
          expect(res).toBe('Jenny Smith');
          done();
    });
  });

  it('should have exact match for Name + DOB search', () => {
    search.clearSearchResults();
    search.setSearchInputName('Jenny Smith');
    search.setSearchDOB('1982-02-02');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    expect(search.getMatches().count()).toBeGreaterThan(0);
  });

  it('should NOT have any matches for incorrect Name + DOB search', () => {
    search.clearSearchResults();
    search.setSearchInputName('Jenny Smith');
    search.setSearchDOB('1982-11-02');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    search.getMatches().count().then( (res) => {
      console.log('HOW MANY MATCHES!!! ', res);
    }).catch((err) => {
      console.log('wtf', err);
    });
    expect(search.getMatches().count()).toBeLessThan(1);
  });

  it('should have SSN in identifier pulldown', () => {
    expect(search.existsSearchIdentifierOptionByValue('SSN_NUMBER')).toBeTruthy();
  });

  it('submit button should be clickable', () => {
    expect(search.getSearchButtonSubmit().isEnabled).toBeTruthy();
  });

  /*
  it('should have search results', () => {
    page.clickSearchButtonSubmit();
    browser.sleep(60000);
    expect( $$('sz-search-result-card').count() ).toBeGreaterThan(0);
  });*/


});
