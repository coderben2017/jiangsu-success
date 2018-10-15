import axios from 'axios';
import BigType from "../model/BigType";
import SampleLibraryModule from "../model/SampleLibraryModule";
import ModelManagementModule from "../model/ModelManagementModule";
import StatisticsModule from "../model/StatisticsModule";
import SampleProductionModule from "../model/SampleProductionModule";
import logoImg from '../assets/img/logo.png';

// http请求预配置
const httpClient = axios.create({
  baseURL: 'http://jiangsu.gagogroup.cn/api/beta',
  headers: {
    'Content-Type': 'application/json'
  }
});


class HttpClient {

  /******************************
            样本查询模块
   ******************************/

  /**
   * 获取样本列表数据
   * @returns {Promise<any[]>}
   */
  static async getSamplesInSampleLibrary(): Promise<any[]> {
    let format: string = '[';
    if (SampleLibraryModule.getFormat1()) {
      format += '1,';
    }
    if (SampleLibraryModule.getFormat2()) {
      format += '2,';
    }
    if (SampleLibraryModule.getFormat3()) {
      format += '3';
    }
    if (format.charAt(format.length - 1) === ',') {
      format = format.slice(0, format.length -1);
    }
    format += ']';

    const samples = await httpClient
      .get('/sample-library/serach', {
        params: {
          'base_type': SampleLibraryModule.getBaseType(),
          'period': SampleLibraryModule.getPeriod(),
          'type': SampleLibraryModule.getType(),
          'picture_way': SampleLibraryModule.getVideoType(),
          'radio': SampleLibraryModule.getRadio(),
          'format': format,
          'page_no': 1,
          'page_size': 9999999999
        }
      })
      .then(({data}) => {
        const arr = data.data.map((item, index) => {
          return Object.assign({}, item, {key: `${index + 1}`});
        });
        return arr;
      });

    return samples;
  }

  /**
   * 获取类别框下拉数据
   * @returns Promise<any>
   */
  static async getTypeOptions(): Promise<any> {
    const bigTypes = await httpClient
      .get('/sample-library/type-struct', {
        params: {
          'base_type': SampleLibraryModule.getBaseType(),
          'period': SampleLibraryModule.getPeriod(),
        }
      })
      .then(({data}) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });

    return bigTypes;
  }

  /**
   * 上传样本
   * @param {any} vectorFile 矢量文件
   * @param {any} videoFile 影像文件
   * @param {number} format 切割样本格式
   * @param {string} route 存储路径
   * @returns {Promise<any>}
   */
  static async uploadSample(vectorFile: any, videoFile: any, format: number, path: string): Promise<any> {
    const result = await null;
    return result;
  }


  /******************************
            样本生产模块
   ******************************/

  /**
   * 获取全部时期
   * @returns {Promise<any[]>}
   */
  static async getAllPeriods(): Promise<any[]> {
    const periods = await httpClient
      .get('/sample-library/period')
      .then(({data}) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return periods;
  }

  /**
   * 复刻时期
   * @param name 新时期名称
   * @param copyPeriod 被复制时期名称
   * @returns {Promise<any>}
   */
  static async copyPeriod(name: string, copyPeriod: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/copyperiod', {
        params: {
          'newperiod': name,
          'oldperiod': copyPeriod,
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 新增大类
   * @param code 要素代码
   * @param name 大类名称
   * @returns {Promise<any>}
   */
  static async createBigType(code: string, name: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/createbiglei', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'label': name,
          'value': code
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 新增中小类
   * @param code 要素代码
   * @param name 大类名称
   * @returns {Promise<any>}
   */
  static async createSmallType(code: string, name: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/createzhongxiaolei', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'label': name,
          'value': code
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 获取大类详情列表
   * @returns {Promise<any[]>}
   */
  static async getSpecificBigTypes(): Promise<any[]> {
    const bigTypes = await httpClient
      .get('/sample-library/bigleifullinfo', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'code': SampleProductionModule.getCode()
        }
      })
      .then(({ data }) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return bigTypes;
  }

  /**
   * 获取中小类详情列表
   * @returns {Promise<any[]>}
   */
  static async getSpecificSmallTypes(): Promise<any[]> {
    const smallTypes = await httpClient
      .get('/sample-library/zhongxiaoleifullinfo', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'code': SampleProductionModule.getCode()
        }
      })
      .then(({ data }) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return smallTypes;
  }

  /**
   * 获取大类和中小类详情列表
   * @returns {Promise<any[]>}
   */
  static async getSpecificTypes(): Promise<any[]> {
    return Promise.all([
      HttpClient.getSpecificBigTypes(),
      HttpClient.getSpecificSmallTypes()
    ]);
  }

  /**
   * 更新大类信息
   * @param oldCode 原要素代码
   * @param code 新要素代码
   * @param name 新大类名称
   * @returns {Promise<any>}
   */
  static async updateBigType(oldCode: string, code: string, name: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/updatebiglei', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'label': name,          
          'value': code,
          'oldvalue': oldCode
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 更新中小类信息
   * @param oldCode 原要素代码
   * @param code 新要素代码
   * @param name 新大类名称
   * @returns {Promise<any>}
   */
  static async updateSmallType(oldCode: string, code: string, name: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/updatezhongxiaolei', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'label': name,          
          'value': code,
          'oldvalue': oldCode
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 删除大类
   * @param code 要素代码
   * @returns {Promise<any>}
   */
  static async deleteBigType(code: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/deletebiglei', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'value': code,
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 删除中小类
   * @param code 要素代码
   * @returns {Promise<any>}
   */
  static async deleteSmallType(code: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/deletezhongxiaolei', {
        params: {
          'period': SampleProductionModule.getPeriod(),
          'value': code,
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 获取当前时期的大类列表
   * @returns {any[]}
   */
  static async getBigTypes(): Promise<any[]> {
    const bigTypes = await httpClient
      .get('/sample-library/biglei', {
        params: {
          'period': SampleProductionModule.getPeriod()
        }
      })
      .then(({data}) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return bigTypes;
  }

  /**
   * 新增新时期文件夹
   * @param baseType 基础测绘/地理国情
   * @param period 时期名称
   * @param ratio1 卫片分辨率
   * @param ratio2 航片分辨率
   * @param bigType 大类名
   * @returns {Promise<any>}
   */
  static async createFolder(baseType: string, period: string, ratio1: string, ratio2: string, bigType: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/createdir', {
        params: {
          'basetype': baseType,
          'period': period,
          'satellitepic': ratio1,
          'planepic': ratio2,
          'dalei': bigType
        }
      })
      .then(({ data }) => {
        return data.data;
      });
    return status;
  }

  /**
   * 新增旧时期文件夹
   * @param path 新文件夹路径
   * @param name 新文件夹名称
   * @returns {Promise<any>}
   */
  static async createOldPeriodFolder(path: string, name: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/createoldperiodsampledir', {
        params: {
          'parentpath': path,
          'dirname': name
        }
      })
      .then(({data}) => {
        return data.data;
      });
    return status;
  }

  /**
   * 获取影像和矢量文件路径
   * @returns {Promise<any[]>}
   */
  static async getImageDir(): Promise<any[]> {
    const dir = await httpClient
      .get('/image-library/getimagedirtree')
      .then(({data}) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return dir;
  }

  /**
   * 获取样本库目录
   * @returns {Promise<any>}
   */
  static async getSampleDir(): Promise<any[]> {
    const dir = await httpClient
      .get('/sample-library/getsampledirtree')
      .then(({ data }) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return dir;
  }

  /**
   * 获取样本库目录（旧时期）
   * @returns {Promise<any>}
   */
  static async getSampleDirForOldPeriod(): Promise<any[]> {
    const dir = await httpClient
      .get('/sample-library/getSampleDirTreeForOld')
      .then(({ data }) => {
        const arr = (data.data as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    return dir;
  }

  /**
   * 新增样本
   * @param vectorFilePath 矢量文件路径
   * @param imageFilePath 影像文件路径
   * @param format 切割样本格式
   * @param savePath 存储路径
   * @returns {Promise<any>}
   */
  static async createSample(vectorFilePath: string, imageFilePath: string, format: string, savePath: string): Promise<any> {
    const status = await httpClient
      .get('/sample-library/createnewperiodsample', {
        params: {
          'vectorpath': vectorFilePath,
          'imagepath': imageFilePath,
          'format': format,
          'savepath': savePath
        }
      })
      .then(({data}) => {
        return data.data;
      });
    return status;
  }

  /******************************
            模型管理模块
   ******************************/

  /**
   * 获取推荐结果列表
   * @returns {Promise<number[]>}
   */
  static async getRecommendResults(): Promise<any[]> {
    const result = await httpClient
      .get('/model-management/search', {
        params: {
          'base_type': ModelManagementModule.getModelDataType(),
          'picture_way': ModelManagementModule.getModelPictureType(),
          'element_type': ModelManagementModule.getModelDistinguishType(),
          'page_no': 1,
          'page_size': 9999999999999
        }
      })
      .then(({data}) => {
        const arr = (data.data as any[]).map((item, index) => {
          return Object.assign({}, item, {key: `${index + 1}`});
        });
        return arr;
      });

    return result;
  }

  /**
   * 运行模型
   * @param {string} format 切割样本格式
   * @param {string} ratio 分辨率
   * @param {string} path 图像路径
   * @returns {Promise<any>}
   */
  static async runModel(format: string, ratio: string, path: string): Promise<any> {
    const imageSrcs = await httpClient
      .get('/model-management/getdiscerninf', {
        params: {
          resolution: ratio,
          filetype: format,
          tifpath: path
        }
      })
      .then(({data}) => {
        return data.data;
      });
    return imageSrcs;
  }

  /**
   * 获取图片
   * @param {string} name 
   * @returns {Promise<any>}
   */
  static async getImage(name: string): Promise<any> {
    const result = await null;
    return result;
  }

  /**
   * 获取大图
   * @returns {Promise<any>}
   */
  static async getBigImage(): Promise<any> {
    const result = await null;
    return result;
  }


  /******************************
            全局统计模块
   ******************************/

  /**
   * 获取大/中/子类、单像素、多像素、切片图形数量
   * @param {string} period 时期
   * @returns {Promise<any>}
   */
  static async getTypesCount(period: string): Promise<any> {
    const countsObj = await httpClient
      .get(`/statistics/sum/${StatisticsModule.getSelectedPeriod()}`)
      .then(res => {
        const data = res['data']['data'];
        const obj = Object.assign({}, {
            typeCount1: data.typeFirstSum,
            typeCount2: data.typeSecondSum,
            typeCount3: data.typeSonSum,
            singleCount: data.pixelWiseSum,
            multiCount: data.patchWiseSum,
            sectionCount: data.imageWiseSum,
          });
        return obj;
      });
    return countsObj;
  }

  /**
   * 获取各个大类的样本数量
   * @returns {Promise<any[]>}
   */
  static async getBigTypesCount(): Promise<any[]> {
    const typesCount = await httpClient
      .get(`/statistics/sum/${StatisticsModule.getSelectedPeriod()}`)
      .then(({data}) => {
        const arr = (data.data.typeFirstInfo as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });

    return typesCount;
  }

  /**
   * 获取各城市样本数量
   * @returns {Promise<any[]>}
   */
  static async getCitySampleCount(): Promise<any[]> {
    const counts = await httpClient
      .get(`/statistics/sum/${StatisticsModule.getSelectedPeriod()}`)
      .then(({data}) => {
        const arr = (data.data.typeCityInfo as any[]).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });
    
    return counts;
  }

  /**
   * 获取各子类的三种样例数量
   * @returns {Promise<any[]>}
   */
  static async getChildTypesCount(): Promise<any[]> {
    const counts = await httpClient
      .get(`/statistics/sum/${StatisticsModule.getSelectedPeriod()}`)
      .then(({data}) => {
        const arr = (data.data.typeSonInfo as any).map((item, index) => {
          return Object.assign({}, item);
        });
        return arr;
      });

    return counts;
  }
  
}

export default HttpClient;