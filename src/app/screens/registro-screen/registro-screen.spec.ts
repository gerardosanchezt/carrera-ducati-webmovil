import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroScreen } from './registro-screen';

describe('RegistroScreen', () => {
  let component: RegistroScreen;
  let fixture: ComponentFixture<RegistroScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
