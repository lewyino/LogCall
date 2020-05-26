import {LogTypes} from "./log-types.enum";

export function LogCall(
    logType: any = LogTypes.LOG,
    logMessage: string = 'CALLED: %class_name%.%method_name%(%method_arguments%)',
    logger: any = console,
) {
    const fnExist = typeof logger[logType] === 'function';
    if (!fnExist) {
        console.error(`no function "${logType}" in "${logger.constructor.name}"`);
    }
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        if (!fnExist) {
            return method;
        }
        descriptor.value = function() {
            const args = Array.from(arguments).reduce((acc, curr, index) => {
                return '' + acc + (index ? ', ' : '') + curr;
            }, '');
            logger[logType](logMessage
                .replace('%class_name%', target.constructor.name)
                .replace('%method_name%', propertyKey)
                .replace('%method_arguments%', args)
            );
            return method.apply(this, arguments);
        }
    }
}
