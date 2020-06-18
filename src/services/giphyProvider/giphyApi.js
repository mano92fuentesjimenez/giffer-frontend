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

  const transmuter = async (req, text) => {
    const { data: { data, pagination } } = await req;
    return {
      data: data.map(gif => ({
        id: gif.id,
        smallUrl: gif.images.fixed_width_downsampled.url ,
        largeUrl: gif.images.original.webp,
      })),
      pagination,
      text
    };
  };

  const searchGifs = (text, offset = 0, limit = 72) => {
    return transmuter(
      client.get('gifs/search', getParams({ q: text, offset, limit })),
      text,
    );
  };

  const searchTrendingGifs = (offset = 0, limit = 72) => {
    return transmuter(client.get('gifs/trending', getParams({ offset, limit })));
  };

  return {
    searchGifs,
    searchTrendingGifs,
  }
}
