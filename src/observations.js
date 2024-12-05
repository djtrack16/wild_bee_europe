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
const countries_1 = require("../lib/countries");
const client = axios_1.default.create({
    baseURL: 'https://api.inaturalist.org/v1',
});
//const url = "https://www.inaturalist.org/observations?place_id=7147&subview=map&taxon_id=630955"
const taxon_id = countries_1.Taxons.get("Anthophila");
const place_id = countries_1.Countries.get("Serbia");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            'Accept': 'application/json',
        },
    };
    const queryString = `place_id=${place_id}&taxon_id=${taxon_id}&order=desc&order_by=created_at`;
    try {
        //console.log(queryString)
        const searchResponse = yield client.get(`/observations/?${queryString}`, config);
        //console.log(searchResponse.data)
        //const = searchResponse
        console.log(searchResponse.status);
        console.log(searchResponse.data);
        //return searchResponse.data
        //const username: string = foundUsers[0].login;
        // const userResponse: AxiosResponse = await client.get(`/users/${username}`, config);
        //const user: githubUser = userResponse.data;
        //const followersCount = user.followers;
        const obs = searchResponse.data;
        console.log(obs.results[0].taxon);
        //console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)
    }
    catch (err) {
        console.log(err);
    }
}))();
