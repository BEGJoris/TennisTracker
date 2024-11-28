import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchEditPage } from './match-edit.page';

describe('MatchEditPage', () => {
  let component: MatchEditPage;
  let fixture: ComponentFixture<MatchEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
