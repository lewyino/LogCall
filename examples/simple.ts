import {LogCall} from "../log-call.decorator";
import {LogTypes} from "../log-types.enum";

class MyClass {

    @LogCall()
    public foo(...args: any[]) {
    }

    @LogCall(LogTypes.INFO, '=== CALL === %method_name%(%method_arguments%)')
    public bar(...args: any[]) {
    }

    @LogCall('test')
    public baz(...args: any[]) {
    }
}

const impl = new MyClass();
impl.foo();
impl.foo("test");
impl.bar();
impl.bar("test", 1, true);
impl.baz()

/* console output
[error] no function "test" in "Console"
[log] CALLED: MyClass.foo()
[log] CALLED: MyClass.foo(test)
[info] === CALL === bar()
[info] === CALL === bar(test, 1, true)
 */
