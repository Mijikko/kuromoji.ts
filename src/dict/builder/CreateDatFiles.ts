import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import IPADic from "mecab-ipadic-seed";
import kuromoji from "../../kuromoji.js";
import DictionaryBuilder from "./DictionaryBuilder.js";
import { pathJoin } from "../../util/PathJoin.js";
import type { ArrayBuffer } from "doublearray.ts/dist/types.js";

const outDir = "dict-uncompressed/";

const createDatFiles = async () => {
  if (!existsSync(outDir)) {
    mkdirSync(outDir);
  }

  const dic = new IPADic();
  const builder = kuromoji.dictionaryBuilder();

  // Build token info dictionary
  const tokenInfo = async () => {
    await dic.readTokenInfo((line) => {
      builder.addTokenInfoDictionary(line);
    });
    console.log("Finishied to read token info dics");
  };

  // Build connection costs matrix
  const matrixDef = async () => {
    await dic.readMatrixDef((line) => {
      builder.putCostMatrixLine(line);
    });
    console.log("Finishied to read matrix.def");
  };

  // Build unknown dictionary
  const unkDef = async () => {
    await dic.readUnkDef((line) => {
      builder.putUnkDefLine(line);
    });
    console.log("Finishied to read unk.def");
  };

  // Build character definition dictionary
  const charDef = async () => {
    await dic.readCharDef((line) => {
      builder.putCharDefLine(line);
    });
    console.log("Finishied to read char.def");
  };

  await buildBinaryDictionaries(
    [tokenInfo(), matrixDef(), unkDef(), charDef()],
    builder
  );
};

/**
 * To node.js Buffer
 * @param typed
 * @returns
 */
const toBuffer = (
  typed?: ArrayBuffer | Uint8Array | Int16Array | Uint32Array
): Buffer => {
  if (!typed) {
    return Buffer.alloc(0);
  }
  // よくわからないのでエラーを握りつぶした
  // @ts-ignore
  var ab = typed.buffer;
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
};

const buildBinaryDictionaries = async (
  promises: Promise<void>[],
  builder: DictionaryBuilder
) => {
  // Build kuromoji.js binary dictionary
  await Promise.all(promises);
  console.log("Finishied to read all seed dictionary files");
  console.log("Building binary dictionary ...");
  const dic = builder.build();

  const base_buffer = toBuffer(dic.trie.bc.getBaseBuffer());
  const check_buffer = toBuffer(dic.trie.bc.getCheckBuffer());
  const token_info_buffer = toBuffer(
    dic.token_info_dictionary.dictionary.buffer
  );
  const tid_pos_buffer = toBuffer(dic.token_info_dictionary.pos_buffer.buffer);
  const tid_map_buffer = toBuffer(
    dic.token_info_dictionary.targetMapToBuffer()
  );
  const connection_costs_buffer = toBuffer(dic.connection_costs.buffer);
  const unk_buffer = toBuffer(dic.unknown_dictionary.dictionary.buffer);
  const unk_pos_buffer = toBuffer(dic.unknown_dictionary.pos_buffer.buffer);
  const unk_map_buffer = toBuffer(dic.unknown_dictionary.targetMapToBuffer());
  const char_map_buffer = toBuffer(
    dic.unknown_dictionary.character_definition?.character_category_map
  );
  const char_compat_map_buffer = toBuffer(
    dic.unknown_dictionary.character_definition?.compatible_category_map
  );
  const invoke_definition_map_buffer = toBuffer(
    dic.unknown_dictionary.character_definition?.invoke_definition_map?.toBuffer()
  );

  writeFileSync(pathJoin([outDir, "base.dat"]), base_buffer);
  writeFileSync(pathJoin([outDir, "check.dat"]), check_buffer);
  writeFileSync(pathJoin([outDir, "tid.dat"]), token_info_buffer);
  writeFileSync(pathJoin([outDir, "tid_pos.dat"]), tid_pos_buffer);
  writeFileSync(pathJoin([outDir, "tid_map.dat"]), tid_map_buffer);
  writeFileSync(pathJoin([outDir, "cc.dat"]), connection_costs_buffer);
  writeFileSync(pathJoin([outDir, "unk.dat"]), unk_buffer);
  writeFileSync(pathJoin([outDir, "unk_pos.dat"]), unk_pos_buffer);
  writeFileSync(pathJoin([outDir, "unk_map.dat"]), unk_map_buffer);
  writeFileSync(pathJoin([outDir, "unk_char.dat"]), char_map_buffer);
  writeFileSync(pathJoin([outDir, "unk_compat.dat"]), char_compat_map_buffer);
  writeFileSync(
    pathJoin([outDir, "unk_invoke.dat"]),
    invoke_definition_map_buffer
  );
};

await createDatFiles();
