import ByteBuffer from "../util/ByteBuffer.js";
declare class TokenInfoDictionary {
    dictionary: ByteBuffer;
    target_map: {
        [key: string]: number[];
    };
    pos_buffer: ByteBuffer;
    /**
     * TokenInfoDictionary
     * @constructor
     */
    constructor();
    buildDictionary(entries: string[][]): {
        [key: number]: string;
    };
    put(left_id: number, right_id: number, word_cost: number, surface_form: string, feature: string): number;
    addMapping(source: number, target: number): void;
    targetMapToBuffer(): Uint8Array<ArrayBufferLike>;
    loadDictionary(array_buffer: Uint8Array): this;
    loadPosVector(array_buffer: Uint8Array): this;
    loadTargetMap(array_buffer: Uint8Array): this;
    /**
     * Look up features in the dictionary
     * @param {string} token_info_id_str Word ID to look up
     * @returns {string} Features string concatenated by ","
     */
    getFeatures(token_info_id_str: string): string;
}
export default TokenInfoDictionary;
