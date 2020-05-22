import {PostsComponent} from './posts.component';
import {PostsService} from './posts.service';
import {EMPTY, of, throwError} from 'rxjs';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let service: PostsService;

  beforeEach(() => {
    service = new PostsService(null);
    component = new PostsComponent(service);
  });

  it('should call fetch when ngOnInit', () => {
    let spy = spyOn(service, 'fetch').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should update post length after ngOnInit', () => {
    const post = [1, 2, 3, 4];
    spyOn(service, 'fetch').and.returnValue(of(post));

    component.ngOnInit();

    expect(component.posts.length).toBe(post.length);
  });

  it('should add new post', () => {
    const post = {title: 'Test'};
    const spy = spyOn(service, 'create').and.returnValue(of(post));
    component.add(post.title);

    expect(spy).toHaveBeenCalled();
    expect(component.posts.includes(post)).toBeTruthy();
  });

  it('should  set message to error message', () => {
    const error = 'Error message';
    spyOn(service, 'create').and.returnValue(throwError(error));

    component.add('Post title');

    expect(component.message).toBe(error);

  });

  it('should remove post if user confirms', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(true);

    component.delete(10);
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should NOT remove post if user doesnt confirms', () => {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(false);

    component.delete(10);
    expect(spy).not.toHaveBeenCalled();
  });

});
