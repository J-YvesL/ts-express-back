export class EnvController {
  public static get envName(): string {
    return process.env.NODE_ENV || 'development';
  }
}
