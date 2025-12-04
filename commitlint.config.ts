export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复
        'docs', // 文档
        'style', // 代码格式（不影响功能，例如空格、分号等）
        'refactor', // 代码重构（既不是新增功能，也不是修复bug）
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 构建相关的更改
        'ci', // 持续集成相关的更改
      ],
    ],
    'subject-case': [0], // 不限制提交说明的大小写
    'header-max-length': [2, 'always', 100], // 提交头最大长度为100
    'body-max-line-length': [2, 'always', 120], // 提交正文每行最大长度为120
  },
};
