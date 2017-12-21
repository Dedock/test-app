# wp-react-rr4
Test Task, Using WebPack, React, React router create a simple CMS like application.

## Project Setup

1. Clone the GitHub Repo
2. Run `npm install`
3. Production build `npm run build`
4. Run production  build `npm run serve:prod`
4. Dev server run `npm run start:dev`

### Configuration
Both production and development,
Code splitting, dynamic chunk loading (on demand)
For dev environment provided Hot reload/HMR,
For prod optimization to reduce bundles and chunk size,
also included BundleAnalyzerPlugin pretty nice to observe the modules, uncomment in webpack conf file.
No eslint, no test covered.

### Notes
Production build use simple http server, so those no history fallback, or route handling (Change URL causes 404).
It's preferable to set up proper server to handle routes gracefully (Client and Server side)
Despite, Dev server has an option to fallback history so URL changes, handled properly.



## Тестовое задание (orig)

Используя React, React Router и Webpack написать небольшое клиентское приложение, работающее по типу простейшей CMS (content management system).
Приложение, при старте загружает, по заранее известному пути, json файл с описанием табов/закладок, которые необходимо отрисовать в приложении.
Описание таба состоит из идентификатора, заголовка, порядкового номера закладки и пути к javascript файлу, который в себе содержит React компонент необходимый для отрисовки содержимого закладки.

tabs.json
[
  {id: 'dummyTable', title: 'Dummy Table', order: 1, path: 'tabs/dummyTable.js'},
  {id: 'dummyChart', title: 'Dummy Chart', order: 2, path: 'tabs/dummyChart.js'},
  {id: 'dummyList', title: 'Dummy List', order: 0, path: 'tabs/dummyList.js'}
];

dummyTable.js
import React from ‘react’

const DummyTable = () => (
  <table><tr><td>Dummy</td><td>Table</td></tr></table>
)

export default DummyTable

Общие требования:
При навигации между закладками, текущая закладка должна находить отображение в url приложения.
Например 'localhost/dummyTable' или 'localhost/dummyChart'
По умолчанию должна открыться первая закладка.
 Если в момент старта приложения, в url указана конкретная закладка необходимо сразу ее открыть.
 Файл модуль закладки должен быть подгружен только когда необходим