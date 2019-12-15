/// <reference types="trusted-types" />
import createDOMPurify from 'dompurify';
export declare const sanitize: {
    (source: string | Node): string;
    (source: string | Node, config: createDOMPurify.Config & {
        RETURN_TRUSTED_TYPE: true;
    }): TrustedHTML;
    (source: string | Node, config: createDOMPurify.Config & {
        RETURN_DOM_FRAGMENT?: false | undefined;
        RETURN_DOM?: false | undefined;
    }): string;
    (source: string | Node, config: createDOMPurify.Config & {
        RETURN_DOM_FRAGMENT: true;
    }): DocumentFragment;
    (source: string | Node, config: createDOMPurify.Config & {
        RETURN_DOM: true;
    }): HTMLElement;
    (source: string | Node, config: createDOMPurify.Config): string | DocumentFragment | HTMLElement;
};
//# sourceMappingURL=sanitizer.d.ts.map