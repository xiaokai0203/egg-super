"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = this.app.mysql.select("users");
	}
}

module.exports = HomeController;
