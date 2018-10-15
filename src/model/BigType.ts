// 大类数据结构（用于规定级联下拉框选项格式）
interface BigType {
  label: string;
  value: string;
  children?: BigType[];
}

export default BigType;