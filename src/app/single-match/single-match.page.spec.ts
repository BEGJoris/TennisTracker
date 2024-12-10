import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleMatchPage } from './single-match.page';

describe('SingleMatchPage', () => {
  let component: SingleMatchPage;
  let fixture: ComponentFixture<SingleMatchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
