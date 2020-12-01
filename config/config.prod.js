/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1606640769704_481";

	// add your middleware config here
	config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};
	config.security = {
		csrf: false,
	}
	// mysql config
	config.mysql = {
		// 单数据库信息配置
		client: {
			// host
			host: "182.254.220.243",
			// 端口号
			port: "3306",
			// 用户名
			user: "superfrontend",
			// 密码
			password: "Wang0203",
			// 数据库名
			database: "superfrontend"
		},
		// 是否加载到 app 上，默认开启
		app: true,
		// 是否加载到 agent 上，默认关闭
		agent: false
	};
	return {
		...config,
		...userConfig
	};
};
