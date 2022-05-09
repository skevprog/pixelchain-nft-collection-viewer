export interface FetchParams {
   cursor?: string,
 }
export interface Nft {
   id: number,
   name: string,
   image_url: string,
 }
export interface FetchData {
   assets: Nft[],
   next?: string,
   previous?: string,
 }
