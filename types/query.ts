export interface WithAuth<T> {
  data: T;
  token?: string;
}

