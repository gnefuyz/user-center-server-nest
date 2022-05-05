// 应用程序入口文件
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any;

/**
 * 引导程序
 * 调用NestFactory工厂函数初始化nest实例，从传入根模块中构建依赖图
 * 启动node服务监听对应端口
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // 开启模块热替换
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
