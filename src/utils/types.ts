export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredientTab = {
  value: TIngredientType;
  title: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & {
  uniqueId: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TUpdateUserForm = {
  name: string;
  email: string;
  password: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TRequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export type TServerResponse<T> = { success: boolean } & T;

export type TAuthResponse = TServerResponse<TTokens & { user: TUser }>;

export type TUserResponse = TServerResponse<{ user: TUser }>;

export type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

export type TOrderResponse = TServerResponse<{
  name: string;
  order: { number: number };
}>;

export type TOrderStatus = 'created' | 'pending' | 'done';

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrderByIdResponse = TServerResponse<{ order: TOrder }>;

export type TCountedIngredient = {
  ingredient: TIngredient;
  count: number;
};
