import fs from 'fs-extra';
import path from 'path';
import got from 'got';
import { getComponentVersion, getComponentDownloadUrl, execComponentDownload } from './utils';
import { IComponentParams } from '../../interface';
import { Logger } from '../../logger/index';

const { spawnSync } = require('child_process');

export interface IComponentPath {
  componentVersion: string;
  componentPath: string;
  lockPath: string;
}

export type Registry = 'https://tool.serverlessfans.com/api' | 'https://api.github.com/repos';

export enum RegistryEnum {
  github = 'https://api.github.com/repos',
  serverless = 'https://tool.serverlessfans.com/api',
}

/**
 * @description 获取组件路径
 * @param name
 * @param provider
 * @param componentPathRoot 组件根目录
 */
export const generateComponentPath = async (
  { name, provider, version }: IComponentParams,
  componentPathRoot: string,
): Promise<IComponentPath> => {
  if (!version) {
    const Response = await getComponentVersion({ name, provider });
    version = Response.Version;
  }
  const rootPath = `./serverlessfans.com/${provider}/${name}@${version}`;
  return {
    componentPath: path.resolve(componentPathRoot, rootPath),
    componentVersion: version,
    lockPath: path.resolve(componentPathRoot, rootPath, '.s.lock'),
  };
};

export const installDependency = async (
  name: string,
  { componentPath, componentVersion, lockPath }: IComponentPath,
) => {
  const existPackageJson = fs.existsSync(path.join(componentPath, 'package.json'));
  if (existPackageJson) {
    Logger.log('Installing dependencies in serverless-devs core ...');
    const result = await spawnSync(
      'npm install --production --registry=https://registry.npm.taobao.org',
      [],
      {
        cwd: componentPath,
        stdio: 'inherit',
        shell: true,
      },
    );
    if (result && result.status !== 0) {
      throw Error('> Execute Error');
    }
  }

  await fs.writeFileSync(lockPath, `${name}-${componentVersion}`);
};

export const downloadComponent = async (
  outputDir: string,
  { name, provider }: IComponentParams,
) => {
  await fs.ensureDirSync(outputDir);
  const Response = await getComponentDownloadUrl({ name, provider });
  await execComponentDownload(Response.Url, outputDir);
};

export const buildComponentInstance = async (componentPath: string) => {
  const requiredComponentPath =
    componentPath.lastIndexOf('index') > -1 ? componentPath : path.join(componentPath, 'index');
  const baseChildComponent = await require(requiredComponentPath);
  const ChildComponent = baseChildComponent.default
    ? baseChildComponent.default
    : baseChildComponent;
  return ChildComponent;
};

export const getGithubReleases = async (user: string, name: string) => {
  const result: any = await got(`${RegistryEnum.github}/${user}/${name}/releases`);
  return JSON.parse(result.body);
};

export const getGithubReleasesLatest = async (user: string, name: string) => {
  const result: any = await got(`${RegistryEnum.github}/${user}/${name}/releases/latest`);
  return JSON.parse(result.body);
};
