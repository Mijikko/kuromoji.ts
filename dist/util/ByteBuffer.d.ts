declare class ByteBuffer {
    buffer: Uint8Array;
    position: number;
    /**
     * Utilities to manipulate byte sequence
     * @param {(number|Uint8Array)} arg Initial size of this buffer (number), or buffer to set (Uint8Array)
     * @constructor
     */
    constructor(arg?: number | Uint8Array);
    size(): number;
    reallocate(): void;
    shrink(): Uint8Array<ArrayBufferLike>;
    put(b: number): void;
    get(index?: number): number;
    putShort(num: number): void;
    getShort(index?: number): number;
    putInt(num: number): void;
    getInt(index?: number): number;
    readInt(): number;
    putString(str: string): void;
    getString(index?: number): string;
}
export default ByteBuffer;
