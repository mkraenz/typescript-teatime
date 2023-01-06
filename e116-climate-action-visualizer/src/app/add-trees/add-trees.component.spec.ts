import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreesComponent } from './add-trees.component';

describe('AddTreesComponent', () => {
  let component: AddTreesComponent;
  let fixture: ComponentFixture<AddTreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTreesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
