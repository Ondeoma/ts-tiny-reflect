import { expect, assert } from 'vitest';

import ts from "typescript";
import path from "path";

function loadConfig(configDir: string): ts.ParsedCommandLine {
  const configPath = path.join(configDir, "tsconfig.json");

  const configFileText = ts.sys.readFile(configPath);
  if (!configFileText) {
    throw new Error(`tsconfig.json not found at ${configPath}`);
  }
  const { config } = ts.parseConfigFileTextToJson(configPath, configFileText);

  const parsedConfig = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    configDir,
    undefined,
    configPath,
  );
  return parsedConfig;
}

function createProgramForDirectory(
  configDir: string,
  targetDir: string,
): ts.Program {
  const parsedConfig = loadConfig(configDir);

  const targetFileNames = ts.sys.readDirectory(
    targetDir,
    [".ts"],
    undefined,
    undefined,
    undefined,
  );

  const host = ts.createCompilerHost(parsedConfig.options);

  const program = ts.createProgram(
    targetFileNames, // instead of parsedConfig.fileNames
    parsedConfig.options,
    host,
  );
  return program;
}

export function getSources(
  configDir: string,
  targetDir: string,
): Map<string, ts.SourceFile> {
  const program = createProgramForDirectory(configDir, targetDir);
  const sources = program
    .getSourceFiles()
    .filter(
      (file) =>
        !file.isDeclarationFile &&
        path.resolve(file.fileName).includes(targetDir),
    );
  return new Map(sources.map(s => [path.basename(s.fileName), s]));
}

export function matchSourceAST(
  actual: ts.SourceFile | undefined,
  expected: ts.SourceFile | undefined,
  printer: ts.Printer,
) {
  assert(!!actual);
  assert(!!expected);
  expect(printer.printFile(actual)).equals(printer.printFile(expected));
}