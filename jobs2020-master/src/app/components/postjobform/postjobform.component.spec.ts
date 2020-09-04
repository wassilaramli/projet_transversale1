import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostjobformComponent } from './postjobform.component';

describe('PostjobformComponent', () => {
  let component: PostjobformComponent;
  let fixture: ComponentFixture<PostjobformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostjobformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostjobformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
