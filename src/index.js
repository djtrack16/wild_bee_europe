"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const client = axios_1.default.create({
    baseURL: 'https://api.github.com',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            'Accept': 'application/vnd.github+json',
        },
    };
    const queryString = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
    try {
        const searchResponse = yield client.get(`/search/users?${queryString}`, config);
        const foundUsers = searchResponse.data.items;
        const username = foundUsers[0].login;
        const userResponse = yield client.get(`/users/${username}`, config);
        const user = userResponse.data;
        const followersCount = user.followers;
        console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`);
    }
    catch (err) {
        console.log(err);
    }
}))();
