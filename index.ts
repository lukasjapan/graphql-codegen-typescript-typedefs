import { CodegenPlugin, PluginFunction } from "@graphql-codegen/plugin-helpers";
import { printSchemaWithDirectives } from "@graphql-tools/utils";
import { stripIgnoredCharacters } from "graphql";

export const plugin: PluginFunction = (schema, _documents, config) => {
  const prefix = config.typesPrefix || "";
  const schemaString = stripIgnoredCharacters(
    printSchemaWithDirectives(schema)
  );
  return {
    prepend: ["import { gql } from 'graphql-tag'"],
    content:
      [
        `export const ${prefix}Schema = ${JSON.stringify(schemaString)};`,
        `export const ${prefix}TypeDefs = gql(${prefix}Schema);`,
      ].join("\n") + "\n",
  };
};

const codegenPlugin: CodegenPlugin = { plugin };

export default codegenPlugin;
