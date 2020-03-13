# midway

kitchen

## Badges

<!--
[![Build status][build-status-image]][aone-ci-url]
[![Line coverage][line-coverage-image]][aone-ci-url]
[![Branch coverage][branch-coverage-image]][aone-ci-url]

[aone-ci-url]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/link?repo=
[build-status-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=&type=%E6%9E%84%E5%BB%BA%E7%8A%B6%E6%80%81
[line-coverage-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=&type=%E5%8D%95%E6%B5%8B%E8%A1%8C%E8%A6%86%E7%9B%96%E7%8E%87
[branch-coverage-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=&type=%E5%8D%95%E6%B5%8B%E5%88%86%E6%94%AF%E8%A6%86%E7%9B%96%E7%8E%87 -->

---

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm install
$ npm run dev
$ open http://localhost:6001/
```

**Notice**: if `npm install` throw an error that shows `postinstall: cannot run in wd xxxx@xxx`. try `npm install --unsafe-perm`.

### Deploy

```bash
$ npm start
$ npm stop
```

### tnpm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.tnpmjs.com/package/autod) for more detail.
