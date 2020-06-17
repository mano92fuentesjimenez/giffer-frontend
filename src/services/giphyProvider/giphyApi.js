import axios from 'axios';

export default function () {
  const client = axios.create({
    baseURL: `https://api.giphy.com/v1`,
    headers: { 'Content-Type': 'application/json' },
  });

  const getParams = (params = {}) =>{
    return {
        params: {
          ...params,
          api_key: 'y3k0H5r7SQWkLWyJs9Z7JfH0xcv3Yafq',
      }
    }
  };

  const transmuter = async (req) => {
    const { data: { data } } = await req;
    return data.map(gif => ({
        id: gif.id,
        smallUrl: gif.images.downsized_medium.url ,
        largeUrl: gif.images.original.webp,
      })
    );
  };

  const searchGifs = (text, offset = 0, limit = 72) => {
    return transmuter(client.get('gifs/search', getParams({ q: text, offset, limit })));
  };

  return {
    searchGifs,
  }
}
