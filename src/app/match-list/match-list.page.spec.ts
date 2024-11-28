import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchListPage } from './match-list.page';

describe('MatchListPage', () => {
  let component: MatchListPage;
  let fixture: ComponentFixture<MatchListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
