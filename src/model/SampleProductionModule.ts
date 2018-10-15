/**
 * 样本生产模块
 */
class SampleProductionModule {

  constructor(
    private _period = '', // 时期名称
    private _code = ''    // 要素代码
  ) {}
  
  // 时期名称
  setPeriod(period: string): void {
    this._period = period;
  }

  getPeriod(): string {
    return this._period;
  }

  // 要素代码
  setCode(code: string): void {
    this._code = code;
  }

  getCode(): string {
    return this._code;
  }
}

export default new SampleProductionModule();