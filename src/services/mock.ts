export function getPeriod(): any[] {
  return [
    `十五`,
    `十一五`,
    `十二五（第一轮）`,
    `十二五（第二轮）`
  ];
}

export function getYear(): any[] {
  return [
    `2015年`,
    `2016年`,
    `2017年`,
  ];
}

export function getCities(): any[] {
  return [
    `南京市`,
    `无锡市`,
    `徐州市`,
    `常州市`,
    `苏州市`,
    `南通市`,
    `连云港市`,
    `淮安市`,
    `盐城市`,
    `扬州市`,
    `镇江市`,
    `泰州市`,
    `宿迁市`,
  ];
}

export function getFolderPath(): any[] {
  let options = [
    {
      value: `1`,
      label: `基础测绘`,
      children: [], 
    },
    {
      value: `2`,
      label: `地理国情`,
      children: [],
    }
  ];

  // 插入时期
  for (let i = 0; i < options.length; ++i) {
    for (let j = 0; j < getPeriod().length; ++j) {
      options[i].children.push({
        value: `${i+1}-${j+1}`,
        label: `${getPeriod()[j]}`,
        children: []
      });
    }
  }

  // 插入城市
  let cities = [`南京市`, `无锡市`, `徐州市`,`常州市`,`苏州市`,`南通市`,`连云港市`,`淮安市`,`盐城市`,`扬州市`,`镇江市`,`泰州市`,`宿迁市`,];  
  for (let i = 0; i < options.length; ++i) {
    for (let j = 0; j < options[i].children.length; ++j) {
      for (let k = 0; k < cities.length; ++k) {
        options[i].children[j].children.push({
          value: `${i+1}-${j+1}-${k+1}`,
          label: `${cities[k]}`
        });
      }
    }
  }

  return options;
}

