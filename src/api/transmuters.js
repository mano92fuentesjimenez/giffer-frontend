
const getData = ({ data }) => data;

export const giffsTransmuter = async (req, text) => {
  const { data, pagination } = getData(await req);
  return {
    data: data.map(gif => ({
      id: gif.id,
      smallUrl: gif.images.fixed_width_downsampled.url,
      largeUrl: gif.images.downsized.url,
      isFavorite: gif.isFavorite,
      metaData: {
        title: gif.title,
        creationTime: gif.create_datetime,
        trendingTime: gif.trending_datetime,
        userName: gif.username,
        rating: gif.rating,
      }
      // largeUrl: gif.images.original.webp,
    })),
    pagination,
    text
  };
};

export const userTransmuter = async (req) => {
  return getData(await req);
}

export const keyTransmuter = async (req) => {
  return getData(await req);
}