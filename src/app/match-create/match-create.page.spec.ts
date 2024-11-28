import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchCreatePage } from './match-create.page';

describe('MatchCreatePage', () => {
  let component: MatchCreatePage;
  let fixture: ComponentFixture<MatchCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
