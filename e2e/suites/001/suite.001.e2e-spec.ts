import { SearchBox } from '../../src/search.po';
import { browser, until, by, $$, $ } from 'protractor';

describe('@senzing/entity-search-webapp: Suite 1 - Owners/Companies DS', () => {
  let search: SearchBox;

  beforeEach(() => {
    search = new SearchBox();
  });

  it('should have search box', () => {
    search.navigateTo();
    expect(search.getSearchComponent().isPresent()).toBeTruthy();
  });

  it('should have SSN in identifier pulldown', () => {
    expect(search.existsSearchIdentifierOptionByValue('SSN_NUMBER')).toBeTruthy();
  });

  it('submit button should be clickable', () => {
    expect(search.getSearchButtonSubmit().isEnabled).toBeTruthy();
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

  it('should NOT have any matches for Name + incorrect DOB search', () => {
    search.clearSearchResults();
    search.setSearchInputName('Jenny Smith');
    search.setSearchDOB('1982-11-02');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    expect(search.getMatches().count()).toBeLessThan(1);
  });

  it('should have possibly related for Name + Phone Number', () => {
    search.clearSearchResults();
    search.setSearchInputName('Jenny Smith');
    search.setSearchPhone('702-111-1111');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    expect(search.getPossibleMatches().count()).toBeGreaterThanOrEqual(1);
  });

  it('should have exact match for Name + Address', () => {
    search.clearSearchResults();
    search.setSearchInputName('Jenny Smith');
    search.setSearchAddress('808 STAR COURT LAS VEGAS NV 89222');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    expect(search.getMatches().count()).toBeGreaterThanOrEqual(1);
  });

  it('should have possibly related for just Address', () => {
    search.clearSearchResults();
    search.setSearchAddress('808 STAR COURT LAS VEGAS NV 89222');
    search.clickSearchButtonSubmit();
    search.waitForSearchResults();
    expect(search.getPossibleMatches().count()).toBeGreaterThanOrEqual(1);
  });

});
