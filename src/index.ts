import Heap from './heap/index';
import Stack from './stack/index';

interface ExtendWindow extends Window {
    dataStructor?: any;
}

const dataStructor = {
    ...Heap,
    ...Stack,
};

if (typeof window) {
    const extendWindow: ExtendWindow = window;
    extendWindow.dataStructor = dataStructor;
}
