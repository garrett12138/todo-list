export default {
  'PUT /item': (req, res) => {
    const result = {
      code: 0,
      message: '操作成功',
      body: true,
    };
    res.send(result);
  },
  'POST /item': (req, res) => {
    const result = {
      code: 0,
      message: '操作成功',
      body: true,
    };
    res.send(result);
  },
  'GET /items': (req, res) => {
    const result = {
      code: 0,
      message: '操作成功',
      body: [
        {
          id: 8,
          title: '完成Antd-Pro-Generator手动添加接口并生成代码',
          status: 0,
        },
        {
          id: 7,
          title: '修改Antd-Pro-Generator UI',
          status: 0,
        },
        {
          id: 6,
          title: '完善Antd-Pro-Generator数据类型定义',
          status: 0,
        },
        {
          id: 5,
          title: '文章使用Antd-Pro-Generator生成代码',
          status: 1,
        },
        {
          id: 4,
          title: 'Antd-Pro-Generator支持TypeScript',
          status: 2,
        },
        {
          id: 3,
          title: '发布Antd-Pro-Generator vscode 插件',
          status: 1,
        },
        {
          id: 2,
          title: '文章Ant Design Pro 快速入门',
          status: 1,
        },
        {
          id: 1,
          title: '文章React快速入门',
          status: 1,
        },
      ],
    };
    res.send(result);
  },
};
