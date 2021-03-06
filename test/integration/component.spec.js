import {
  Component,
  View,
  Input,
  Attribute
} from '@angular/core';
import { TestBed } from '@angular/core/testing'

describe('component', () => {
  it('works with class/prop/param decorators and type annotations', () => {
    class Greeter {
      say(greeting, name) {
        return `${greeting}, ${name}!`;
      }
    }

    @Component({
      selector: 'hello-world',
      template: '<p>{{message}}</p>'
    })
    class HelloWorld {
      @Input() greeting;

      constructor(@Attribute('name') name, greeter: Greeter) {
        this.name = name;
        this.greeter = greeter;
      }

      ngOnInit() {
        this.message = this.greeter.say(this.greeting, this.name);
      }
    }

    @Component({
      selector: 'my-comp',
      directives: [HelloWorld],
      viewProviders: [Greeter],
      template: '<hello-world [greeting]="greeting" name="Babel"></hello-world>'
    })
    class MyComp {}

    TestBed.configureTestingModule({ declarations: [MyComp, HelloWorld] });
    const fixture = TestBed.createComponent(MyComp);
    fixture.debugElement.componentInstance.greeting = 'Hello';

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toEqual('Hello, Babel!');
  });
});
