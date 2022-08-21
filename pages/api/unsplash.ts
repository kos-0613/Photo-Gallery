// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const endpoint = "https://api.unsplash.com/";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

// const nextFunction = () => {
//   fetch(
//     `https://api.unsplash.com/search/photos?query=${router.query.q}&client_id=${process.env.NEXT_PUBLIC_API_KEY}&per_page=24&order_by=popular&page=${page}`
//   )
//     .then((data) => data.json())
//     .then((imgData: ISearchResponse) => {
//       images?.results?.push(...imgData.results);
//       setPage(page + 1);
//     })
//     .catch((err) => console.log(err));
// };
