/**
 * 模型管理模块
 */
class ModelManagementModule {

  constructor(
    private _model_data_type = '',        // 模型数据类型
    private _model_picture_type = '',     // 模型影像类型
    private _model_distinguish_type = '', // 模型识别类型
  ) {}


  // 模型数据类型：基础测绘 / 地理国情
  setModelDataType(value: string) {
    this._model_data_type = value;
  }

  getModelDataType(): string {
    return this._model_data_type;
  }

  // 模型影像类型：航片(0.3) / 航片(0.5) / 卫片(1)
  setModelPictureType(value: string) {
    this._model_picture_type = value;
  }

  getModelPictureType(): string {
    return this._model_picture_type;
  }

  // 模型识别类型：单像素 / 多像素 / 切片图形
  setModelDistinguishType(value: string) {
    this._model_distinguish_type = value;
  }

  getModelDistinguishType(): string {
    return this._model_distinguish_type;
  }

}

export default new ModelManagementModule();