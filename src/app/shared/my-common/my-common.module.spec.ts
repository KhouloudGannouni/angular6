import { MyCommonModule } from './my-common.module';

describe('MyCommonModule', () => {
  let myCommonModule: MyCommonModule;

  beforeEach(() => {
    myCommonModule = new MyCommonModule();
  });

  it('should create an instance', () => {
    expect(myCommonModule).toBeTruthy();
  });
});
