/**
 * 全局统计模块
 */
class StatisticsModule {

  constructor(
    private _selected_base_type = '', // 基础测绘or地理国情
    private _selected_period = '',    // 时期
    private _big_type_count = 0,      // 大类数据
    private _middle_type_count = 0,   // 中类数量
    private _child_type_count = 0,    // 子类数量
    private _single_pixel_count = 0,  // 单像素数量
    private _multi_pixel_count = 0,   // 多像素数量
    private _slicing_image_count = 0, // 切片图形数量
  ) {}

  // 基础类型
  setSelectedBaseType(base_type: string) {
    this._selected_base_type = base_type;
  }

  getSelectedBaseType() {
    return this._selected_base_type;
  }

  // 时期
  setSelectedPeriod(period: string) {
    this._selected_period = period;
  }

  getSelectedPeriod() {
    return this._selected_period;
  }

  // 大类
  setBigTypeCount(count: number) {
    this._big_type_count = count;
  }

  getBigTypeCount() {
    return this._big_type_count;
  }

  // 中类
  setMiddleTypeCount(count: number) {
    this._middle_type_count = count;
  }

  getMiddleTypeCount() {
    return this._middle_type_count;
  }

  // 子类
  setChildTypeCount(count: number) {
    this._child_type_count = count;
  }

  getChildTypeCount() {
    return this._child_type_count;
  }

  // 单像素
  setSinglePixelCount(value: number) {
    this._single_pixel_count = value;
  }

  getSinglePixelCount(): number {
    return this._single_pixel_count;
  }

  // 多像素
  setMultiPixelCount(value: number) {
    this._multi_pixel_count = value;
  }

  getMultiPixelCount(): number {
    return this._multi_pixel_count;
  }

  // 切片图形
  setSlicingImageCount(value: number) {
    this._slicing_image_count = value;
  }

  getSlicingImageCount(): number {
    return this._slicing_image_count;
  }

}

export default new StatisticsModule();