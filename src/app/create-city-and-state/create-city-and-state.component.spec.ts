import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCityAndStateComponent } from './create-city-and-state.component';

describe('CreateCityAndStateComponent', () => {
  let component: CreateCityAndStateComponent;
  let fixture: ComponentFixture<CreateCityAndStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCityAndStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCityAndStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
