# GraphQL Codegen Typescript TypeDefs plugin

Adds the combined graphql schema (string) and type definitions (DocumentNode) to the generated typescript file.

Useful whenever you need the type definitions as a DocumentNode.

## Usage

### Install Plugin

```bash
yarn add --dev graphql-codegen-typescript-typedefs
```

```bash
npm install --save-dev graphql-codegen-typescript-typedefs
```

### Setup Codegen Config

Add the `typescript-typedefs` plugin to your codegen config.

Ex.

```yaml
generates:
  generated-types.ts:
    schema: "**/*.graphqls"
    plugins:
      - typescript
      - typescript-typedef
```

The following variables will be exported by the generated file:

| Variable Name | Type         | Content                                         |
| ------------- | ------------ | ----------------------------------------------- |
| Schema        | string       | The combined GraphQl schema in a compact string |
| TypeDefs      | DocumentNode | The type definitions of the combined schema     |

### Options

#### typesPrefix

Prefix the variables with this string.
