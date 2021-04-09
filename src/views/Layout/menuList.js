export default [
  {
    path: '/home',
    name: '首页',
    icon: 'home'
  },
  {
    name: '图表示例',
    icon: 'bar-chart',
    path: '/echartsDemo'
  },
  {
    path: '/ChatRoom',
    name: '聊天室',
    icon: 'team'
  },
  {
    name: '更多',
    icon: 'appstore',
    children: [
      {
        path: '/directive',
        name: '自定义指令',
        icon: 'tool'
      },
      {
        path: '/ToDoList',
        name: 'ToDoList',
        icon: 'snippets'
      }
    ]
  }
];
