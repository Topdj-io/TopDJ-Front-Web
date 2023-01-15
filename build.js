const shell = require('child_process').execSync
const outputRoot = process.env.npm_config_outputRoot || '../topdj-release/'
// const apptype = process.env.npm_config_apptype
const branch = 'master' //process.env.npm_config_branch
// const env = process.env.npm_config_env
// if (!env) {
//   console.error('请配置项目环境env，如：npm config set env=test')
//   return
// }

// if (!branch) {
//   console.error(
//     '请配置发布目录的分支名称branch，如：npm config set branch=BRANCH_V1.0_FEATURE_20201106_HUISHAN'
//   )
//   return
// }
if (!outputRoot) {
  console.log(`未配置h5导出目录outputRoot,会使用默认导出相对路径，如：npm config set outputRoot=${outputRoot}`)
}
try {
  // 更新分支
  // console.log('---1 更新项目代码 git pull start---')
  // shell(`git pull`)
  // console.log('---git pull success---')
  // console.log('---2 更新依赖：npm i')
  // console.log(shell(`npm i`).toString())
  // console.log(`---3 切分支 git checkout -q ${branch}`)
  shell(`cd ${outputRoot} && git checkout -q ${branch}`)
  // console.log(`---4 更新发布目录代码 git pull ${outputRoot}---`)
  shell(`cd ${outputRoot}&&git pull`)
  console.log(`---git pull success ${outputRoot}---`)
  console.log(`--- 开始编译`)
  console.log(shell(`npm run build`).toString())
  console.log('---npm run build success---')
  console.log(`---6 提交代码---`)
  shell(`cd ${outputRoot} && git add .`)
  shell(`cd ${outputRoot} && git commit -m "feat: 编译发布  ${new Date()}"`)
  shell(`cd ${outputRoot} && git push origin ${branch}:${branch}`)
  // console.log(`---7 提交代码成功！---`)
  // console.log(
  //   `---发布正式测试环境请点击：https://jenkins-dev.yzone01.com/jenkins/job/saas-deploy-dtest-pageframework/build?delay=0sec`
  // )
  // console.log(
  //   `---发布备用测试环境请点击：http://172.20.208.10:29010/jenkins/job/saas-dtest-deploy/build?delay=0sec`
  // )
  // console.log(
  //   `---发布远程测试环境请点击：https://jenkins-dev.yzone01.com/jenkins/job/saas-deploy-devweb/build?delay=0sec`
  // )
} catch (e) {
  console.log('build error ---', e)
}
