import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Countries, Taxons } from '../lib/countries'
import { result } from '../models/Observation'

const client = axios.create({
  baseURL: 'https://api.inaturalist.org/v1',
});

//const url = "https://www.inaturalist.org/observations?place_id=7147&subview=map&taxon_id=630955"

const taxon_id = Taxons.get("Anthophila");
const place_id = Countries.get("Serbia");

(async () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
    } as RawAxiosRequestHeaders,
  };
  const queryString: string = `place_id=${place_id}&taxon_id=${taxon_id}&order=desc&order_by=created_at`;
  try {
    //console.log(queryString)
    const searchResponse: AxiosResponse = await client.get(`/observations/?${queryString}`, config);

    console.log(searchResponse.data)

    const obs: result = searchResponse.data
    console.log(obs.results)

    //console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)
  } catch(err) {
    console.log(err);
  }
})();