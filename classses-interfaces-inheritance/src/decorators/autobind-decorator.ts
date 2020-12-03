

export function AutoBind(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log('descriptor', descriptor);
    const originalHandler = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {//executed when we try to access function
            const newHandler = originalHandler.bind(this);
            return newHandler;
        }
    };
    return newDescriptor;
}
    
