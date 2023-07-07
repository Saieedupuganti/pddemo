import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { OtpPage } from './otp.page';

describe('OtpPage', () => {
  let component: OtpPage;
  let fixture: ComponentFixture<OtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
