import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env-vonfig.interface';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getApiPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
