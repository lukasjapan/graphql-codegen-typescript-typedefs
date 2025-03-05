import { CodegenPlugin, PluginFunction } from "@graphql-codegen/plugin-helpers";
import { printSchemaWithDirectives } from "@graphql-tools/utils";
import { DocumentNode, stripIgnoredCharacters } from "graphql";
import gql from "graphql-tag";

export type QraphQLCodegenTypescriptTypeDefsDocumentNode = DocumentNode;

export const plugin: PluginFunction = (schema, _documents, config) => {
  const prefix = config.typesPrefix || "";
  const schemaString = stripIgnoredCharacters(
    printSchemaWithDirectives(schema)
  );
  const jsonString = JSON.stringify(schemaString);
  return {
    prepend: config.parseSchema
      ? [
          `import ${
            config.useNamedImport ? "{ gql }" : "gql"
          } from 'graphql-tag'`,
        ]
      : [
          `import { QraphQLCodegenTypescriptTypeDefsDocumentNode } from 'graphql-codegen-typescript-typedefs'`,
        ],
    content:
      [
        `export const ${prefix}Schema: string = ${jsonString};`,
        `export const ${prefix}TypeDefs = ${
          config.parseSchema
            ? `gql(${prefix}Schema)`
            : `${JSON.stringify(
                gql(schemaString)
              )} as unknown as QraphQLCodegenTypescriptTypeDefsDocumentNode`
        };`,
      ].join("\n") + "\n",
  };
};

const codegenPlugin: CodegenPlugin = { plugin };

export default codegenPlugin;
