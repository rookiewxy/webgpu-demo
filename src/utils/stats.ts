import Stats from "three/addons/libs/stats.module.js";

// 创建性能监视器
const stats: Stats = new Stats();

// 将监视器添加到页面中
document.body.appendChild(stats.dom);

export default stats;
