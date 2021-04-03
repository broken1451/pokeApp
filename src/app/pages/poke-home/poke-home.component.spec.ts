import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeHomeComponent } from './poke-home.component';

describe('PokeHomeComponent', () => {
  let component: PokeHomeComponent;
  let fixture: ComponentFixture<PokeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
