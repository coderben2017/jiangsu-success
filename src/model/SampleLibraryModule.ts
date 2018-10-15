import BigType from "./BigType";

/**
 * 样本查询模块（原样例库管理模块）
 */

class SampleLibraryModule {

  constructor(
    private _base_type = '',   // 基础测绘or地理国情
    private _period = '',      // 时期
    private _zero = '',        // 区域
    private _type = '',        // 类别
    private _video_type = 0,   // 影像类型
    private _ratio = '',       // 分辨率
    private _format_1 = false, // 单像素是否被选中
    private _format_2 = false, // 多像素是否被选中
    private _format_3 = false, // 切片图形是否被选中
  ) {}


  // 树形组件：基础类型、时期、市
  setTreeData(base_type: string, period: string): void {
    this._base_type = base_type;
    this._period = period;
  }

  getBaseType(): string {
    return this._base_type;
  }

  getPeriod(): string {
    return this._period;
  }
  
  // 区域：市 / 县区
  setZero(arr: string[]): void {
    if (arr.length === 1) {
      this._zero = arr[0];
    } else {
      this._zero = `${arr[0]}-${arr[1]}`;
    }
  }

  getZero(): string {
    return this._zero;
  }

  // 类型：大类 / 一类-二类
  setType(arr: string[]): void {
    if (arr.length === 1) {
      this._type = arr[0];
    } else {
      this._type = `${arr[0]}-${arr[1]}`;
    }
  }

  getType(): string {
    return this._type;
  }

  // 影像类型：航片 / 卫片
  setVideoType(value: number): void {
    this._video_type = value;
  }

  getVideoType(): number {
    return this._video_type;
  }

  // 空间分辨率：0.3米、0.5米、1米
  setRadio(value: string): void {
    this._ratio = value;
  }

  getRadio(): string {
    return this._ratio;
  }


  // 样例格式：1-单像素, 2-多像素，3-切片图形
  setFormat1(flag: boolean): void {
    this._format_1 = flag;
  }

  getFormat1(): boolean {
    return this._format_1;
  }

  setFormat2(flag: boolean): void {
    this._format_2 = flag;
  }

  getFormat2(): boolean {
    return this._format_2;
  }

  setFormat3(flag: boolean): void {
    this._format_3 = flag;
  }

  getFormat3(): boolean {
    return this._format_3;
  }

}

export default new SampleLibraryModule();