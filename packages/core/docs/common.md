## request

#### 用于统一 HTTP 网络请求。加上 loading 效果

```typescript
const { request } = require('@serverless-devs/core');

function test_request_hint() {
  request('https://api.github.com/users/octocat', {
    method: 'get',
    data: {
      tag: 'fc',
      error: 'error',
    },
    hint: {
      loading: '数据请求中...',
      success: '数据请求成功',
      error: '数据请求失败',
    },
  });
}
```

![Demo](https://img.alicdn.com/imgextra/i1/O1CN01KZM5eM22LDuoZY3ZB_!!6000000007103-1-tps-1312-73.gif)

## downloadRequest

#### 用于统一下载的方法，会自动带上下载进度条

```typescript
/**
 * url: 远程下载的链接
 * outDir: 下载存放的路径
 * {
 *  extract: true // 是否执行解压操作
 *  strip: 1 // 文件提取目录级别
 * }
 */
downloadRequest(url, outDir, { extract: true, strip: 1 });
```

![Demo](https://img.alicdn.com/imgextra/i1/O1CN01LukqOH1bJr6l77VGk_!!6000000003445-1-tps-1312-200.gif)

## report

#### 组件上报

```typescript
const { report, HLogger, ILogger } = require('@serverless-devs/core');

class ReportDemo {
  @HLogger('S-CORE') logger: ILogger;
  async component() {
    await report('组件数据上报', {
      type: 'component',
      context: 'fc',
      params: {
        action: 'deploy',
        account: '123435',
      },
    });
    this.logger.info('成功上报');
  }
}
```

![Demo](https://img.alicdn.com/imgextra/i3/O1CN01OW9lSg1SEyLJ2TXxo_!!6000000002216-1-tps-1312-73.gif)

#### 错误上报

```typescript
const { report, HLogger, ILogger } = require('@serverless-devs/core');

class ReportDemo {
  @HLogger('S-CORE') logger: ILogger;
  async error() {
    await report('错误上报', {
      type: 'error',
      context: 'fc',
    });
    this.logger.error('错误上报');
  }
}
```

![Demo](https://img.alicdn.com/imgextra/i2/O1CN01XJzCmp1qJb7ZUvFEi_!!6000000005475-1-tps-1312-73.gif)

## load

- 用于加载组件,组件会下载到 ~/.s/components 目录下面。

```typescript
const { load } = require('@serverless-devs/core');
load('fc', 'alibaba');
```

![Demo](https://img.alicdn.com/imgextra/i1/O1CN01LukqOH1bJr6l77VGk_!!6000000003445-1-tps-1312-200.gif)

- 支持下载特定版本的组件使用方式为

```typescript
const { load } = require('@serverless-devs/core');
load('fc@0.1.2', 'alibaba');
```

![Demo](https://img.alicdn.com/imgextra/i1/O1CN01LukqOH1bJr6l77VGk_!!6000000003445-1-tps-1312-200.gif)

## spinner

#### 状态展示

```typescript
const { spinner } = require('@serverless-devs/core');

function sleep(timer: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timer);
  });
}

async start() {
  const vm = spinner('开始执行');
  await sleep(1000);
  vm.text = 'hhh';
  vm.color = 'red';
  await sleep(1000);
  vm.succeed('执行成功');
}

```

![Demo](https://img.alicdn.com/imgextra/i2/O1CN01L81nr81ZfimlgCPpp_!!6000000003222-1-tps-1312-73.gif)

## zip

#### 用于压缩文件

```typescript
/**
 * codeUri: 打包的路径
 * include: 额外包括的文件（list）
 * exclude: 不包括的文件（list）
 * outputFileName: 打包后的文件名称，默认值demo.zip
 * outputFilePath: 输出的路径
 */
zip({ codeUri, include, exclude, outputFileName, outputFilePath });
```

![Demo](https://img.alicdn.com/imgextra/i1/O1CN01YOb4ij1dRImEsBk1i_!!6000000003732-1-tps-1312-103.gif)

## unzip

#### 用于解压文件，具体使用请查看[文档](https://github.com/kevva/decompress)

## help

显示文档帮助信息，具体使用请查看[文档](https://github.com/75lb/command-line-usage)

```typescript
const { help } = require('@serverless-devs/core');

function test() {
  const sections = [
    {
      header: 'A typical app',
      content: 'Generates something {italic very} important.',
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'input',
          typeLabel: '{underline file}',
          description: 'The input to process.',
        },
        {
          name: 'help',
          description: 'Print this usage guide.',
        },
      ],
    },
    {
      header: 'Examples',
      content: [
        {
          desc: '1. A concise example. ',
          example: '$ example -t 100 lib/*.js',
        },
        {
          desc: '2. A long example. ',
          example: '$ example --timeout 100 --src lib/*.js',
        },
        {
          desc:
            '3. This example will scan space for unknown things. Take cure when scanning space, it could take some time. ',
          example:
            '$ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts',
        },
      ],
    },
  ];
  help(sections);
}
```

![Demo](https://img.alicdn.com/imgextra/i2/O1CN0105D6t51lUWUKlSt3g_!!6000000004822-1-tps-1312-326.gif)

输出数据

```

A typical app

  Generates something very important.

Options

  --input file    The input to process.
  --help string   Print this usage guide.

Examples

  1. A concise example.                                                                                          $ example -t 100 lib/*.js
  2. A long example.                                                                                             $ example --timeout 100 --src lib/*.js
  3. This example will scan space for unknown things. Take cure when scanning space, it could take some time.    $ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts

```

## i18n

用于国际化，具体使用请查看[文档](https://github.com/75lb/command-line-usage)

- 当前语言默认读取 ~/.s/set-config.yml 文件的 locale 属性

## commandParse

命令行参数解析工具，用于解析命令行参数。格式为 commandParse(Input, options)
解析工具采用 [minimist](https://github.com/substack/minimist) 详细使用查看[文档](https://github.com/substack/minimist)

```typescript
const { commandParse } = require('@serverless-devs/core');

function test() {
  const c = commandParse({
    args: '-x 3 -y 4 -n5 -abc --beep=boop foo bar baz',
  });
  console.log(c);
}
```

![Demo](https://img.alicdn.com/imgextra/i1/O1CN01dsAaDX1ayKUcjHVcU_!!6000000003398-1-tps-1312-273.gif)

输出数据

```js
{
  rawData: '-x 3 -y 4 -n5 -abc --beep=boop foo bar baz',
  data: {
    _: [ 'foo', 'bar', 'baz' ],
    x: 3,
    y: 4,
    n: 5,
    a: true,
    b: true,
    c: true,
    beep: 'boop'
  }
}
```

## getCredential

#### 用于获取密钥信息, 该方法接收两个参数，第一个参数是 provider，该参数必传，目前 provider 支持 [alibaba/aws/azure/baidu/google/huawei/tencent/custom]，第二个参数是 accessAlias，该参数选填

- provider 为 alibaba

```typescript
const { getCredential } = require('@serverless-devs/core');
async function get() {
  const c = await getCredential('alibaba');
  console.log('c', c);
}
```

![demo](https://img.alicdn.com/imgextra/i3/O1CN01OOJ9sV1sbZtp1370z_!!6000000005785-1-tps-1215-409.gif)

## setCredential

#### 用于设置密钥信息, 该方法接收一个参数 provider, 目前 provider 支持 [alibaba/aws/azure/baidu/google/huawei/tencent/custom]

```typescript
const { setCredential } = require('@serverless-devs/core');

async function set() {
  const c = await setCredential();
  console.log('c', c);
}
```

- Provider 为空的 case

![demo](https://img.alicdn.com/imgextra/i2/O1CN01JBu5EO1Q9oeNdQCzr_!!6000000001934-1-tps-1312-273.gif)

- Provider 为 alibaba 的 case

![demo](https://img.alicdn.com/imgextra/i4/O1CN01EstoE11ltiH06n6rE_!!6000000004877-1-tps-1312-273.gif)

- Provider 为 custom 的 case

![demo](https://img.alicdn.com/imgextra/i2/O1CN013aOETJ1CdfqojG1IH_!!6000000000104-1-tps-1312-337.gif)

## getState

#### 用于获取文件内容， 文件存放于 ~/.s 目录下面。

```typescript
const { getState } = require('@serverless-devs/core');

async function get() {
  const c = await getState('state');
  console.log('c', c);
}
```

![demo](https://img.alicdn.com/imgextra/i4/O1CN01pXFJUZ1IVKKVKhvny_!!6000000000898-1-tps-1215-97.gif)

## setState

#### 用于设置文件内容， 文件存放于 ~/.s 目录下面。

```typescript
const { setState } = require('@serverless-devs/core');

async function set() {
  const c = await setState('state', { name: '名称', age: 18 });
  console.log('c', c);
}
```

![demo](https://img.alicdn.com/imgextra/i4/O1CN01pXFJUZ1IVKKVKhvny_!!6000000000898-1-tps-1215-97.gif)